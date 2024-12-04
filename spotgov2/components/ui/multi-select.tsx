"use client";

import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { Plus, X } from "lucide-react";
import * as React from "react";
import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Command } from "@/components/ui/command";
import { cn } from "@/utils/utils";
import { useVirtualizer } from "@tanstack/react-virtual";

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}
interface GroupOption {
  [key: string]: Option[];
}

interface MultiSelectProps {
  value?: Option[];
  defaultOptions?: Option[];
  /** manually controlled options */
  options?: Option[];
  placeholder?: string;
  /** Loading component. */
  loadingIndicator?: React.ReactNode;
  /** Empty component. */
  emptyIndicator?: React.ReactNode;
  /** Debounce time for async search. Only work with `onSearch`. */
  delay?: number;
  /**
   * Only work with `onSearch` prop. Trigger search when `onFocus`.
   * For example, when user clicks on the input, it will trigger the search to get initial options.
   **/
  triggerSearchOnFocus?: boolean;
  /** async search */
  onSearch?: (value: string) => Promise<Option[]>;
  /**
   * sync search. This search will not show loadingIndicator.
   * The rest props are the same as async search.
   * i.e.: creatable, groupBy, delay.
   **/
  onSearchSync?: (value: string) => Option[];
  onChange?: (options: Option[]) => void;
  /** Limit the maximum number of selected options. */
  maxSelected?: number;
  /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
  onMaxSelected?: (maxLimit: number) => void;
  /** Hide the placeholder when there are options selected. */
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  /** Group the options based on provided key. */
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  /**
   * First item selected is a default behavior by cmdk. That is why the default is true.
   * This is a workaround solution by adding a dummy item.
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean;
  /** Allow user to create option when there is no option matched. */
  creatable?: boolean;
  /** Props of `Command` */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** Props of `CommandInput` */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >;
  /** Hide the clear all button. */
  hideClearAllButton?: boolean;

  variant?: "keywords" | "cpv";
}

export interface MultiSelectRef {
  selectedValue: Option[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      "": options,
    };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption: GroupOption, picked: Option[]) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption;

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked.find((p) => p.value === val.value)
    );
  }
  return cloneOption;
}

function isOptionsExist(groupOption: GroupOption, targetOption: Option[]) {
  for (const [, value] of Object.entries(groupOption)) {
    if (
      value.some((option) => targetOption.find((p) => p.value === option.value))
    ) {
      return true;
    }
  }
  return false;
}

const MultiSelect = React.forwardRef<MultiSelectRef, MultiSelectProps>(
  (
    {
      value,
      onChange,
      placeholder,
      defaultOptions: arrayDefaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      onSearchSync,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
      hideClearAllButton = false,
      variant,
    }: MultiSelectProps,
    ref: React.Ref<MultiSelectRef>
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [onScrollbar, setOnScrollbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const [selected, setSelected] = React.useState<Option[]>(value || []);
    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(arrayDefaultOptions, groupBy)
    );
    const [inputValue, setInputValue] = React.useState("");
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as HTMLInputElement,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected([]),
      }),
      [selected]
    );

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        inputRef.current.blur();
      }
    };

    const handleUnselect = React.useCallback(
      (option: Option) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        setSelected(newOptions);
        onChange?.(newOptions);
      },
      [onChange, selected]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      };
    }, [open]);

    useEffect(() => {
      if (value) {
        setSelected(value);
      }
    }, [value]);

    useEffect(() => {
      /** If `onSearch` is provided, do not trigger options updated. */
      if (!arrayOptions || onSearch) {
        return;
      }
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      /** sync search */

      const doSearchSync = () => {
        const res = onSearchSync?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
      };

      const exec = async () => {
        if (!onSearchSync || !open) return;

        if (triggerSearchOnFocus) {
          doSearchSync();
        }

        if (debouncedSearchTerm) {
          doSearchSync();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;

        if (triggerSearchOnFocus) {
          await doSearch();
        }

        if (debouncedSearchTerm) {
          await doSearch();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    const CreatableItem = () => {
      if (!creatable) return null;

      // If variant is "cpv", check if inputValue is a number or contains dashes (e.g., "123-456")
      const isCPVVariant = variant === "cpv";
      const isNumericOrDash = /^-?\d+(\-\d+)*$/.test(inputValue.trim());

      if (isCPVVariant && (!isNumericOrDash || inputValue.trim() === "")) {
        return null;
      }

      if (
        isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
        selected.find((s) => s.value === inputValue)
      ) {
        return null;
      }

      const Item = (
        <div
          className="flex cursor-pointer items-center justify-start gap-0.5 px-2 py-1 hover:bg-accent"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={() => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue("");
            const newOptions = [
              ...selected,
              { value: inputValue, label: inputValue },
            ];
            setSelected(newOptions);
            onChange?.(newOptions);
          }}
        >
          <Plus size={14} className="mr-1" />
          {`Adicionar "${inputValue}" como ${
            variant === "cpv" ? "novo CPV" : "nova palavra-chave"
          }`}
        </div>
      );

      // For normal creatable
      if (!onSearch && inputValue.length > 0) {
        return Item;
      }

      // For async search creatable. Avoid showing creatable item before loading at first.
      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
        return Item;
      }

      return null;
    };

    const selectables = React.useMemo<GroupOption>(
      () => removePickedOption(options, selected),
      [options, selected]
    );

    // Add this code to create a flat list of options for virtualization and filtering
    const flatOptions = React.useMemo(() => {
      const allOptions: Option[] = [];
      Object.entries(selectables).forEach(([group, options]) => {
        // Filter options based on inputValue
        const filteredOptions = options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );

        if (filteredOptions.length > 0) {
          if (group && group !== "") {
            allOptions.push({
              value: `__group_${group}`,
              label: group,
              disable: true,
            });
          }
          allOptions.push(...filteredOptions);
        }
      });
      return allOptions;
    }, [selectables, inputValue]);

    const parentRef = React.useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
      count: flatOptions.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 35,
      overscan: 5,
    });

    const shouldOpenDropdown =
      variant !== "keywords" ||
      (variant === "keywords" &&
        (flatOptions.length > 0 || inputValue.trim().length > 0));

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
          inputRef.current?.blur();
        }
      },
      []
    );

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pasteData = event.clipboardData.getData("text");
      const delimiter = ","; // You can adjust the delimiter if needed
      const values = pasteData
        .split(delimiter)
        .map((val) => val.trim())
        .filter((val) => val);

      const newOptions: Option[] = values.map((val) => ({
        value: val,
        label: val,
      }));

      // Filter out any options that are already selected
      const optionsToAdd = newOptions.filter(
        (option) => !selected.find((s) => s.value === option.value)
      );

      if (optionsToAdd.length > 0) {
        const updatedSelected = [...selected, ...optionsToAdd];
        setSelected(updatedSelected);
        onChange?.(updatedSelected);
      }

      // Clear the input value
      setInputValue("");
    };

    return (
      <Command
        ref={dropdownRef}
        {...commandProps}
        onKeyDown={(e) => {
          handleKeyDown(e);
          commandProps?.onKeyDown?.(e);
        }}
        className={cn(
          "h-auto overflow-visible bg-transparent",
          commandProps?.className
        )}
        shouldFilter={false}
      >
        <div
          className={cn(
            "border rounded-xl bg-white",
            {
              "px-3 py-2": selected.length !== 0,
              "cursor-text": !disabled && selected.length !== 0,
            },
            className
          )}
          onClick={() => {
            if (disabled || !shouldOpenDropdown) return;
            inputRef?.current?.focus();
            setOpen(true);
          }}
        >
          <div className="relative flex flex-wrap gap-1">
            {selected.map((option) => {
              return (
                <Badge
                  key={option.value}
                  className={cn(
                    "h-[30px] cursor-default rounded-md border border-[#2388FF]/50 bg-[#2388FF]/10 font-medium text-[#2388FF] hover:bg-[#2388FF]/10",
                    badgeClassName
                  )}
                  data-fixed={option.fixed}
                  data-disabled={disabled || undefined}
                >
                  {option.label}
                  <button
                    className={cn(
                      "ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-[#4C74B9] focus:ring-offset-2",
                      (disabled || option.fixed) && "hidden"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(option);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="h-3 w-3 text-[#2388FF]" strokeWidth={2.5} />
                  </button>
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              {...inputProps}
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value);
                inputProps?.onValueChange?.(value);
              }}
              onPaste={handlePaste}
              onBlur={(event) => {
                if (!onScrollbar) {
                  setOpen(false);
                }
                inputProps?.onBlur?.(event);
              }}
              onFocus={(event) => {
                setOpen(true);
                triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
                inputProps?.onFocus?.(event);
              }}
              placeholder={
                hidePlaceholderWhenSelected && selected.length !== 0
                  ? ""
                  : placeholder
              }
              className={cn(
                "flex-1 bg-transparent placeholder-secondary outline-none",
                {
                  "w-full": hidePlaceholderWhenSelected,
                  "px-3 py-2": selected.length === 0,
                  "ml-1": selected.length !== 0,
                },
                inputProps?.className
              )}
            />
            <button
              type="button"
              onClick={() => {
                setSelected(selected.filter((s) => s.fixed));
                onChange?.(selected.filter((s) => s.fixed));
              }}
              className={cn(
                "absolute right-0 h-6 w-6 p-0",
                (hideClearAllButton ||
                  disabled ||
                  selected.length < 1 ||
                  selected.filter((s) => s.fixed).length === selected.length) &&
                  "hidden"
              )}
            >
              <X className="mt-1.5 h-3 w-3 text-black" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div className="relative">
          {open && shouldOpenDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-1 z-10 mt-1 max-h-[310px] w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in"
              onMouseLeave={() => {
                setOnScrollbar(false);
              }}
              onMouseEnter={() => {
                setOnScrollbar(true);
              }}
              onMouseUp={() => {
                inputRef?.current?.focus();
              }}
            >
              {isLoading ? (
                <>{loadingIndicator}</>
              ) : (
                <>
                  {flatOptions.length === 0 && !CreatableItem() && (
                    <div className="p-2 text-center text-sm text-muted-foreground">
                      {emptyIndicator || "Sem resultados."}
                    </div>
                  )}

                  {CreatableItem()}

                  <div
                    ref={parentRef}
                    style={{ maxHeight: "300px", overflow: "auto" }}
                    className="overflow-y-scroll scrollbar-thin"
                  >
                    <div
                      style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const option = flatOptions[virtualRow.index];

                        if (option.value.startsWith("__group_")) {
                          return (
                            <div
                              key={option.value}
                              className="px-2 py-1 text-xs font-semibold text-muted-foreground"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                transform: `translateY(${virtualRow.start}px)`,
                              }}
                            >
                              {option.label}
                            </div>
                          );
                        }

                        return (
                          <CommandPrimitive.Item
                            key={option.value}
                            className={cn(
                              "cursor-pointer rounded-sm px-2 py-1 hover:bg-accent",
                              option.disable &&
                                "cursor-default text-muted-foreground",
                              "aria-selected:bg-gray-100"
                            )}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onClick={() => {
                              if (selected.length >= maxSelected) {
                                onMaxSelected?.(selected.length);
                                return;
                              }
                              setInputValue("");
                              const newOptions = [...selected, option];
                              setSelected(newOptions);
                              onChange?.(newOptions);
                            }}
                            onSelect={() => {
                              if (selected.length >= maxSelected) {
                                onMaxSelected?.(selected.length);
                                return;
                              }
                              setInputValue("");
                              const newOptions = [...selected, option];
                              setSelected(newOptions);
                              onChange?.(newOptions);
                            }}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              transform: `translateY(${virtualRow.start}px)`,
                            }}
                          >
                            {option.label}
                          </CommandPrimitive.Item>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Command>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
export default MultiSelect;
