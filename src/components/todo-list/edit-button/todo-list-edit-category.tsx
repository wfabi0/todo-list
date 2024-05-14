"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Category as CategoryOptions, Task } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import {
  BadgeDollarSign,
  BookOpenText,
  BriefcaseBusiness,
  HeartPulse,
  Home,
  LucideIcon,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

export type Category = {
  value: CategoryOptions;
  label: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    value: "HOME",
    label: "Home",
    icon: Home,
  },
  {
    value: "WORK",
    label: "Work",
    icon: BriefcaseBusiness,
  },
  {
    value: "PERSONAL",
    label: "Personal",
    icon: UserRound,
  },
  {
    value: "SHOPPING",
    label: "Shopping",
    icon: ShoppingBag,
  },
  {
    value: "EDUCATION",
    label: "Education",
    icon: BookOpenText,
  },
  {
    value: "HEALTH",
    label: "Health",
    icon: HeartPulse,
  },
  {
    value: "FINANCE",
    label: "Finance",
    icon: BadgeDollarSign,
  },
  {
    value: "OTHER",
    label: "Other",
    icon: Package,
  },
];

type TodoListEditCategorySelectProps = {
  form: UseFormReturn<any>;
  row: Row<Task>;
  field: ControllerRenderProps<any>;
};

export default function TodoListEditCategorySelect({
  form,
  row,
  field,
}: TodoListEditCategorySelectProps) {
  const [open, setOpen] = useState(false);

  field.value =
    field.value ||
    categories.find((cat) => cat.value === (row.original.category || "OTHER"));

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className="w-[150px] justify-start"
            aria-expanded={open}
          >
            {field.value ? (
              <>
                <field.value.icon className="mr-2 h-4 w-4 shrink-0" />
                {field.value.label}
              </>
            ) : (
              <>+ Select category</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput placeholder="Select category..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    onSelect={(value: string) => {
                      form.setValue(
                        "task-category",
                        categories.find((cat) => cat.value === value)
                      );
                      setOpen(false);
                    }}
                  >
                    <category.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        category.value === field.value.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{category.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
