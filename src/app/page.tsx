import Navbar from "@/components/navbar/navbar";
import TodoList from "@/components/todo-list/todo-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-slate-300">
      <Navbar />
      <TodoList />
      <div>Footer</div>
    </main>
  );
}
