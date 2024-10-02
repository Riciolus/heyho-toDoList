"use client";

import Image from "next/image";
import { BiSearchAlt } from "react-icons/bi";
import { TiWeatherSunny } from "react-icons/ti";
import { FaRegStar, FaUserAstronaut } from "react-icons/fa";
import { TbSubtask } from "react-icons/tb";
import { Group } from "@/app/page";
import { LuFolders } from "react-icons/lu";
import { useEffect } from "react";
import { createNewGroup, getGroupById } from "@/app/lib/api";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/app/components/shadcn/context-menu";
import GroupProperties from "./groupProperties";

interface SidebarProps {
  handleChangeContent: (page: string) => void; // Type the prop as a function
  setSidebarGroup: React.Dispatch<React.SetStateAction<Group[]>>;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
  sidebarGroup: Group[];
  iconData: object;
}

const styles = {
  button:
    "flex items-center hover:bg-onhover py-1 ps-2 rounded-lg transition-colors gap-3 cursor-pointer w-[90%] laptop:w-[62%]",
};

const Sidebar = ({
  handleChangeContent,
  setSidebarGroup,
  setActivePage,
  activePage,
  sidebarGroup,
  iconData,
}: SidebarProps) => {
  useEffect(() => {
    async function getTask() {
      const result = await getGroupById();
      localStorage.setItem("group", JSON.stringify(result));
      setSidebarGroup(result);
    }

    getTask();
  }, [setSidebarGroup]);

  const buttonColorActive = (lists: string) => {
    if (activePage === lists) {
      return "bg-onhover";
    }
  };

  const handleNewGroup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const inputValue = form.inputGroup.value;

    createNewGroup(inputValue).then((newGroupData: Group) => {
      setSidebarGroup([...sidebarGroup, newGroupData]);
      localStorage.setItem("active-page", newGroupData.id);
      setActivePage(newGroupData.id);
    });

    form.inputGroup.value = "";
  };

  return (
    <div className="flex flex-col  h-full justify-between">
      <div className="">
        <div className="flex flex-col mt-6 gap-2">
          {/* PROFILE SECTION */}
          <div className="flex gap-3 mb-1">
            <div className="rounded-full h-fit  ">
              <Image
                src="/assets/avatar.jpg"
                width={50}
                height={50}
                alt="Avatar..."
                className="rounded-full"
                priority
              />
            </div>

            <div className="flex flex-col justify-center gap-0.5">
              <span className="font-bold">jhondoe</span>
              <span className="">jhondoe@gmail.com</span>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative mb-2 flex laptop:w-[62%] w-[90%] mt-1">
            <input
              type="text"
              placeholder="Search Tasks"
              className="bg-[#2c2c2c] w-full px-2 py-1.5 rounded-lg border-b-2 border-line placeholder-gray-400 outline-none transition-all focus:border-green-300 focus:border-b-4"
            />
            <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
              <BiSearchAlt size={19} className="fill-gray-400" />
            </div>
          </div>

          {/* PAGINATION SECTION */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleChangeContent("today")}
              className={`${styles.button}  ${buttonColorActive("today")}`}
            >
              <TiWeatherSunny size={24} className="fill-orange-500" />
              <span>Today</span>
            </button>
            <button
              onClick={() => handleChangeContent("important")}
              className={`${styles.button}  ${buttonColorActive("important")}`}
            >
              <FaRegStar size={24} className="fill-pink-400 p-0.5" />
              <span>Important</span>
            </button>
            <button
              onClick={() => handleChangeContent("assgToMe")}
              className={`${styles.button}  ${buttonColorActive("assgToMe")}`}
            >
              <FaUserAstronaut size={24} className="fill-green-300 p-0.5" />
              <span>Assigned to me</span>
            </button>
            <button
              onClick={() => handleChangeContent("tasks")}
              className={`${styles.button}  ${buttonColorActive("tasks")}`}
            >
              <TbSubtask size={24} className="text-blue-300" />
              <span>Tasks</span>
            </button>
          </div>

          <hr className="h-[0.7px] bg-line border-0 mr-20" />

          {/* FOLDER SECTION */}
          <div className="flex flex-col gap-1">
            {sidebarGroup &&
              sidebarGroup.map(
                (group: { id: string; name: string; icon: string }) => {
                  return (
                    <ContextMenu key={group.id}>
                      <ContextMenuTrigger>
                        <div
                          onClick={() => handleChangeContent(group.id)}
                          className={`${styles.button} ${buttonColorActive(
                            group.id
                          )} `}
                        >
                          {iconData[group.icon as keyof object]}
                          <span> {group.name}</span>
                        </div>
                      </ContextMenuTrigger>
                      <GroupProperties
                        groupId={group.id}
                        setSidebarGroup={setSidebarGroup}
                      />
                    </ContextMenu>
                  );
                }
              )}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleNewGroup}
        className="flex relative items-center gap-2    mx-1   "
      >
        <button type="submit" className="absolute">
          <LuFolders size={23} />
        </button>
        <input
          id="inputGroup"
          placeholder="New List"
          className="bg-transparent w-full px-1.5 hover:px-3 hover:bg-onhover pl-8 h-10  mr-3 hover:scale-[1.03] hover:text-sm transition-all rounded-lg placeholder-neutral-50 outline-none font-normal text-base"
        ></input>
      </form>
    </div>
  );
};

export default Sidebar;
