import * as React from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";

interface CapsuleButtonProps extends Omit<
  RadioGroupPrimitive.Props,
  "children" | "value" | "defaultValue" | "onValueChange"
> {
  leftVal: string;
  rightVal: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function CapsuleButton({
  className,
  leftVal,
  rightVal,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...props
}: CapsuleButtonProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue ?? leftVal,
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const onRight = value === rightVal;

  const handleChange = (next: unknown) => {
    const nextStr = typeof next === "string" ? next : leftVal;
    if (!isControlled) setInternalValue(nextStr);
    onValueChange?.(nextStr);
  };

  return (
    <RadioGroupPrimitive
      data-slot="capsule-button"
      value={value}
      onValueChange={handleChange}
      className={cn(
        "relative inline-flex h-8 w-fit items-stretch rounded-full bg-muted p-[5px] py-5 text-muted-foreground",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          "absolute top-[2px] bottom-[2px] bg-foreground shadow-sm transition-all duration-200 ease-out",
          onRight ? "rounded-r-full" : "rounded-l-full",
        )}
        style={{
          left: "2px",
          width: "calc(50% - 2px)",
          transform: onRight ? "translateX(100%)" : "translateX(0)",
        }}
      />
      <CapsuleButtonItem value={leftVal} side="left" />
      <CapsuleButtonItem value={rightVal} side="right" />
    </RadioGroupPrimitive>
  );
}

function CapsuleButtonItem({
  value,
  side,
}: {
  value: string;
  side: "left" | "right";
}) {
  return (
    <RadioPrimitive.Root
      value={value}
      data-slot="capsule-button-item"
      className={cn(
        "relative z-10 inline-flex flex-1 cursor-pointer items-center justify-center px-3 text-[11px] font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 data-checked:text-background data-unchecked:text-muted-foreground data-unchecked:hover:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        side === "left" ? "rounded-l-full" : "rounded-r-full",
      )}
    >
      {value}
    </RadioPrimitive.Root>
  );
}

export { CapsuleButton };
export type { CapsuleButtonProps };
