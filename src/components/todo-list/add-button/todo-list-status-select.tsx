"use client";

import { TaskStatus } from "@/utils/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { useState } from "react";

type Status = {
  value: TaskStatus;
  label: string;
  color: string;
};

const status: Status[] = [
  {
    value: "todo",
    label: "Todo",
    color: "bg-purple-500",
  },
  {
    value: "doing",
    label: "Doing",
    color: "bg-yellow-500",
  },
  {
    value: "done",
    label: "Done",
    color: "bg-green-500",
  },
];

type TodoListStatusSelectProps = {
  form: UseFormReturn<any>;
  field: ControllerRenderProps<any>;
};

export default function TodoListStatusSelect({
  form,
  field,
}: TodoListStatusSelectProps) {
  const [open, setOpen] = useState(false);

  field.value = field.value || status.find((stats) => stats.value === "todo");

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              role="combobox"
              size={"sm"}
              className={`w-[150px] justify-start`}
              aria-expanded={open}
              {...field}
            >
              {field.value ? (
                <>
                  <div
                    className={`w-3 h-3 rounded-full mr-1 ${field.value?.color}`}
                  />
                  {field.value?.label}
                </>
              ) : (
                <>+ Select status</>
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
                {status.map((stats) => (
                  <CommandItem
                    key={stats.value}
                    value={stats.value}
                    onSelect={(value: string) => {
                      form.setValue(
                        "task-status",
                        status.find((cat) => cat.value === value)
                      );
                      setOpen(false);
                    }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-1 ${stats.color} ${
                        stats.value === field.value
                          ? "opacity-100"
                          : "opacity-40"
                      }`}
                    />
                    <span>{stats.label}</span>
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
