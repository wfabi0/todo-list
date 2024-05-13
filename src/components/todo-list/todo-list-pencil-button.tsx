import { Pencil, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import TodoListStatusSelect from "./add-button/todo-list-status-select";
import { Table } from "@tanstack/react-table";
import { Task } from "@prisma/client";

type TodoListPencilButtonProps = {
  table: Table<Task>;
};

export default function TodoListPencilButton({
  table,
}: TodoListPencilButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          size={"sm"}
          className="bg-purple-700 hover:bg-purple-900"
          disabled={!(table.getFilteredSelectedRowModel().rows.length > 0)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit tasks select</DialogTitle>
          <DialogDescription>
            You are editing
            <span className="px-1 font-bold text-gray-800">
              {table.getFilteredSelectedRowModel().rows.length}
            </span>
            tasks.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="task-status" className="text-right">
            Status
          </Label>
          {/* <TodoListStatusSelect  /> */}
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            variant="default"
            className="bg-purple-700 hover:bg-purple-900"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
