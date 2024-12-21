import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

type DestructiveActionDialogProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  action: () => Promise<boolean> | void;
};

const DestructiveActionDialog = ({
  children,
  isOpen,
  setIsOpen,
  action,
}: DestructiveActionDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const destructiveActionDialogTranslation =
    useTranslations("destructiveDialog");

  const onAction = async () => {
    try {
      setIsLoading(true);

      const success = await action();

      if (success) {
        setIsOpen(false);
      }
    } catch {
      // TODO: Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {destructiveActionDialogTranslation("title")}
          </DialogTitle>
          <DialogDescription>
            {destructiveActionDialogTranslation("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            {destructiveActionDialogTranslation("buttons.cancel")}
          </Button>
          <Button variant="destructive" onClick={onAction} disabled={isLoading}>
            {destructiveActionDialogTranslation("buttons.continue")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestructiveActionDialog;
