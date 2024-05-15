import { Skeleton } from "../ui/skeleton";
import TodoListData from "./todo-list-data";

type TodoListProps = {
  data?: { workspace: any; user: any };
  isLoading: boolean;
};

export default function TodoList({ data, isLoading }: TodoListProps) {
  return (
    <div className="flex justify-center lg:px-24">
      {isLoading ? (
        <div className="w-full h-64">
          <Skeleton className="w-full h-full" />
        </div>
      ) : (
        <TodoListData data={data} isLoading={isLoading} />
      )}
    </div>
  );
}
