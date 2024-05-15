"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import { FaAngleRight, FaInfoCircle, FaTasks, FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import NavContextAddUser from "./nav-context/nav-context-add-user";
import NavContextInfoButton from "./nav-context/nav-context-info-button";
import NavContextMoreButton from "./nav-context/nav-context-more-button";
import NavContextMoreUsers from "./nav-context/nav-context-more-users";
import NavContextSelectText from "./nav-context/nav-context-select-task";
import NavContextUserButton from "./nav-context/nav-context-users-button";
// import "moment/locale/pt-br";

let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john-doe@exemple.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane-doe@example.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 3,
    name: "Daniel",
    email: "daniel@exemple.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 4,
    name: "Lucas",
    email: "lucas@exemple.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 5,
    name: "Luíza",
    email: "luiza@exemple.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 6,
    name: "Marcos",
    email: "marcos@exemple.com",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 7,
    name: "Júlia",
    email: "julia@exemple.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 8,
    name: "Vanessa",
    email: "vanessa@exemple.com",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
  },
];

// let workspace: any = {
//   id: "teste",
//   name: "🔥 Workspace",
//   description: "This is a workspace description",
//   tasks: [],
//   membersId: [],
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   creatorId: "233232",
//   members: users,
// };

type NavContextProps = {
  data?: { user: any; workspace: any };
  isLoadingData: boolean;
};

export default function NavContext({ data, isLoadingData }: NavContextProps) {
  const [isMobile, setIsMobile] = useState(false);

  const workspace = data?.workspace.workspace;

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return !isMobile ? (
    <div className="flex w-auto max-w-[60%] bg-white rounded-2xl shadow-lg py-2.5 px-3 space-x-2">
      <div className="self-center">{workspace.name}</div>
      <div className="bg-zinc-300 w-[1.5px] rounded-full" />
      <div className="flex space-x-[0.23rem] items-center">
        {workspace.membersId.slice(0, 4).map((user: any, index: any) => (
          <NavContextUserButton key={index} user={user} />
        ))}
        {workspace.membersId.length > 4 && (
          <NavContextMoreUsers workspace={workspace} />
        )}
        <NavContextAddUser />
      </div>
      <div className="bg-zinc-300 w-[1.5px] rounded-full" />
      <NavContextInfoButton />
      <div className="bg-zinc-300 w-[1.5px] rounded-full" />
      <NavContextMoreButton />
    </div>
  ) : (
    <Sheet>
      <SheetTrigger className="bg-white bg-opacity-75 rounded-2xl shadow-lg py-2.5 px-3">
        <FaGear className="text-purple-600" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>{workspace.name}</SheetTitle>
          <SheetDescription>{workspace.description}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Separator className="" orientation="horizontal" />
          <div className="items-center space-y-2 gap-4">
            <div className="flex items-center space-x-1">
              <FaUsers className="text-purple-600" />
              <div>
                Collaborators
                <span className="text-sm text-gray-700 pl-[0.15rem]">
                  ({workspace.membersId.length})
                </span>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-y-2">
              {workspace.membersId.map((user: any, index: any) => (
                <NavContextUserButton key={index} user={user} />
              ))}
            </div>
          </div>
          <Separator className="" orientation="horizontal" />
          <div className="items-center space-y-2 gap-4">
            <div className="flex items-center space-x-1">
              <FaInfoCircle className="text-purple-600" />
              <div className="flex space-x-1 items-center">
                <div>Info</div>
              </div>
            </div>
            <div className="items-center text-sm text-gray-800">
              <div className="flex items-center">
                <FaAngleRight className="text-purple-600" /> Created at:
                <span className="text-gray-600 pl-1">
                  {moment(workspace.createdAt).format("lll")}
                </span>
              </div>
              <div className="flex items-center">
                <FaAngleRight className="text-purple-600" /> Updated at:
                <span className="text-gray-600 pl-1">
                  {moment(workspace.updatedAt).format("lll")}
                </span>
              </div>
            </div>
          </div>
          <Separator className="" orientation="horizontal" />
          <div className="items-center space-y-2 gap-4">
            <div className="flex items-center space-x-1">
              <FaTasks className="text-purple-600" />
              <div className="flex space-x-1 items-center">
                <div>Tasks</div>
                <div className="text-sm self-center text-gray-600">
                  ({workspace.tasks.length + workspace.tasks.length})
                </div>
              </div>
            </div>
            <NavContextSelectText workspace={workspace} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
