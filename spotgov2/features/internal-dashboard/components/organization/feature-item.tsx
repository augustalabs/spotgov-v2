import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Zap } from "lucide-react";

function FeatureItem({
  label,
  enabled,
  sublabel,
  description,
  icon,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  sublabel?: string;
  description?: string;
  icon?: React.ReactNode;
  onToggle: () => void;
}) {
  return (
    <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
      <Switch
        id={`switch-${label}`}
        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
        checked={enabled}
        aria-describedby={`switch-${label}-description`}
        onCheckedChange={onToggle}
      />
      <div className="flex grow items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
          {icon || <Zap className="h-5 w-5 shrink-0 text-primary" />}
        </div>
        <div className="grid grow gap-2">
          <Label htmlFor={`switch-${label}`}>
            {label}{" "}
            <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
              {sublabel || "(Premium Feature)"}
            </span>
          </Label>
          <p
            id={`switch-${label}-description`}
            className="text-xs text-muted-foreground"
          >
            {description ||
              "Enable or disable this feature for your organization."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeatureItem;
