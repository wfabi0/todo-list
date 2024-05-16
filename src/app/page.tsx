"use client";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import TodoList from "@/components/todo-list/todo-list";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const getUser = async () => {
    const response = await fetch("api/auth/check", {
      method: "GET",
    });
    return response.json();
  };

  const getWorkspace = async () => {
    const response = await fetch("api/workspace", {
      method: "GET",
    });
    return response.json();
  };

  const fetchItems = async () => {
    const get1 = await getUser();
    const get2 = await getWorkspace();
    return { user: get1, workspace: get2 };
  };

  const { data, isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchItems,
  });

  return (
    <main className="flex min-h-screen flex-col justify-between bg-slate-300">
      <Navbar data={data} isLoading={isLoading} />
      <TodoList data={data} isLoading={isLoading} />
      <Footer />
    </main>
  );
}
