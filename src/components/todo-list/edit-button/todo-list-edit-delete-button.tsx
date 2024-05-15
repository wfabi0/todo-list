import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Task } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { MouseEvent } from "react";
import { toast } from "sonner";
import { status } from "./todo-list-edit-status-selection";

type TodoListEditDeleteButtonProps = {
  row: Row<Task>;
};

export default function TodoListEditDeleteButton({
  row,
}: TodoListEditDeleteButtonProps) {
  const queryClient = useQueryClient();
  async function onClick(event: MouseEvent<HTMLButtonElement>, id: string) {
    const response = await fetch("/api/task/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast("Failed to delete task.");
    }

    toast("Task deleted successfully.");
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex flex-1 items-center">
        <Trash2 className="mr-2 h-4 w-4 group-hover:text-red-700" />
        <span className="group-hover:text-red-700">Delete</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this task?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task.{" "}
            <br />
            <Separator className="my-2" />
            Task ID: {row.original.id}
            <br />
            Task Name: {row.original.name} <br />
            <span className="flex items-center">
              Task Status:
              <div
                className={`h-2 w-2 rounded-full mx-1 ${
                  status.find((s) => s.value === row.original.status)?.color
                }`}
              />{" "}
              {status.find((s) => s.value === row.original.status)?.label}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => onClick(e, row.original.id)}
            className="bg-purple-700 hover:bg-purple-900"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
