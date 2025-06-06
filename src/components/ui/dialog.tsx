import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      {children}
    </div>
  );
};

const DialogContent = ({ className, children }: DialogContentProps) => {
  return (
    <div
      className={cn(
        "relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 z-50 max-h-[90vh] overflow-y-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

const DialogHeader = ({ className, children }: DialogHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left mb-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const DialogTitle = ({ className, children }: DialogTitleProps) => {
  return (
    <h2
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className,
      )}
    >
      {children}
    </h2>
  );
};

const DialogDescription = ({ className, children }: DialogDescriptionProps) => {
  return <p className={cn("text-sm text-gray-600", className)}>{children}</p>;
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription };
