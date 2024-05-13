"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
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
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { cn } from "@/lib/utils";
import { CategoryOptions } from "@/utils/types";
import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

type Category = {
  value: CategoryOptions;
  label: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  {
    value: "home",
    label: "Home",
    icon: Home,
  },
  {
    value: "work",
    label: "Work",
    icon: BriefcaseBusiness,
  },
  {
    value: "personal",
    label: "Personal",
    icon: UserRound,
  },
  {
    value: "shopping",
    label: "Shopping",
    icon: ShoppingBag,
  },
  {
    value: "education",
    label: "Education",
    icon: BookOpenText,
  },
  {
    value: "health",
    label: "Health",
    icon: HeartPulse,
  },
  {
    value: "finance",
    label: "Finance",
    icon: BadgeDollarSign,
  },
  {
    value: "other",
    label: "Other",
    icon: Package,
  },
];

type TodoListCategorySelectProps = {
  form: UseFormReturn<any>;
  field: ControllerRenderProps<any>;
};

export default function TodoListCategorySelect({
  form,
  field,
}: TodoListCategorySelectProps) {
  const [open, setOpen] = useState(false);

  field.value = field.value || categories.find((cat) => cat.value === "other");

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              role="combobox"
              variant={"outline"}
              size={"sm"}
              className="w-[150px] justify-start"
              aria-expanded={open}
              {...field}
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
          </FormControl>
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
                        categories.find((cat) => cat.value === value) || null
                      );
                      setOpen(false);
                    }}
                  >
                    <category.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        category.value === field.value?.value
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
