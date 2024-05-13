"use client";

import { useState } from "react";
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
import { Row } from "@tanstack/react-table";
import { Task, TaskStatus } from "@prisma/client";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FormControl } from "@/components/ui/form";

type Status = {
  value: TaskStatus;
  label: string;
  color: string;
};

const status: Status[] = [
  {
    value: "TODO",
    label: "Todo",
    color: "bg-purple-500",
  },
  {
    value: "DOING",
    label: "Doing",
    color: "bg-yellow-500",
  },
  {
    value: "DONE",
    label: "Done",
    color: "bg-green-500",
  },
];

type TodoListEditStatusSelectProps = {
  form: UseFormReturn<any>;
  row: Row<Task>;
  field: ControllerRenderProps<any>;
};

export default function TodoListEditStatusSelect({
  form,
  row,
  field,
}: TodoListEditStatusSelectProps) {
  const [open, setOpen] = useState(false);

  field.value =
    field.value ||
    status.find((stats) => stats.value === (row.original.status || "TODO"));

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              role="combobox"
              size={"sm"}
              className="w-[150px] justify-start"
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
                        stats.value === field.value?.value
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
