import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center pb-5 gap-y-1">
      <p className="flex flex-row items-center">
        Desenvolvido por
        <span className="hover:text-purple-500 dark:hover:text-purple-500 hover:transition hover:duration-300 ml-1">
          <Link href={"https://github.com/wfabi0"}>wfabi0</Link>
        </span>
      </p>
      <p className="flex flex-row items-center hover:text-purple-500 dark:hover:text-purple-500 hover:transition hover:duration-300">
        <Link
          className="flex items-center"
          href={"https://github.com/wfabi0/todo-list"}
        >
          <FaGithub className="mr-1" /> GitHub
        </Link>
      </p>
    </footer>
  );
}
