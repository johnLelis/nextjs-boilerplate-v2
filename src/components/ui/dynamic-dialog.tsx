"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type DialogButton = {
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  loadingLabel?: string;
};

type DynamicDialogProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  buttons?: DialogButton[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
};

export const DynamicDialog = ({
  trigger,
  title,
  description,
  children,
  buttons,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  showCloseButton = true,
}: DynamicDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState<number | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setUncontrolledOpen;

  const handleButtonClick = async (button: DialogButton, index: number) => {
    if (button.onClick) {
      setLoadingButton(index);
      try {
        await button.onClick();
      } finally {
        setLoadingButton(null);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
        {buttons && buttons.length > 0 && (
          <DialogFooter>
            {showCloseButton && (
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loadingButton !== null}
              >
                Cancel
              </Button>
            )}
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "default"}
                onClick={() => handleButtonClick(button, index)}
                disabled={button.disabled || loadingButton !== null}
                className={button.className}
              >
                {loadingButton === index && button.loadingLabel
                  ? button.loadingLabel
                  : button.label}
              </Button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
