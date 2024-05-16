"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { UseFormReturn } from "react-hook-form";

type FormConfirmButtonProps = {
  text?: string;
  className?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  form?: UseFormReturn<any>;
};

export default function FormConfirmButton({
  text,
  className,
  open,
  setOpen,
  form,
}: FormConfirmButtonProps) {
  const { pending } = useFormStatus();
  text = text || "Continue";
  className = className || "";
  if (form) {
    const { formState } = form;
    return (
      <Button
        onClick={(e) => setOpen && setOpen(!open)}
        type="submit"
        disabled={formState.isSubmitting}
        className={`${className}`}
      >
        {formState.isSubmitting ? "Wait..." : text}
      </Button>
    );
  } else {
    return (
      <Button
        onClick={(e) => setOpen && setOpen(!open)}
        type="submit"
        disabled={pending}
        className={`${className}`}
      >
        {pending ? "Wait..." : text}
      </Button>
    );
  }
}
