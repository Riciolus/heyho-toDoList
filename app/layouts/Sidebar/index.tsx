"use client";

import Image from "next/image";
import { BiSearchAlt } from "react-icons/bi";
import { TiWeatherSunny } from "react-icons/ti";
import { FaHandSparkles, FaRegStar, FaUserAstronaut } from "react-icons/fa";
import { TbSubtask } from "react-icons/tb";
import { BsCart4, BsList } from "react-icons/bs";
import { ActivePageMap } from "@/app/page";
import { MdFolderCopy } from "react-icons/md";

interface SidebarProps {
  handleChangeContent: (page: keyof ActivePageMap) => void; // Type the prop as a function
  activePage: string;
}

const sidebarData = [
  {
    title: "Getting Started",
    icon: <FaHandSparkles size={24} className="fill-yellow-500" />,
  },
  {
    title: "Web Dev Tasks",
    icon: <BsList size={24} />,
  },
  {
    title: "Groceries",
    icon: <BsCart4 size={24} />,
  },
];

const styles = {
  button:
    "flex items-center hover:bg-onhover py-1 ps-2 rounded-lg transition-colors gap-3 cursor-pointer w-[90%] laptop:w-[62%]",
};

const Sidebar = ({ handleChangeContent, activePage }: SidebarProps) => {
  const buttonColorActive = (lists: string) => {
    if (activePage === lists) {
      return "bg-onhover";
    }
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
            {/* <div className={styles.button}>
              <FaHandSparkles size={24} className="fill-yellow-500" />
              <span>Getting Started</span>
            </div>
            <div className={styles.button}>
              <BsList size={24} />
              <span>Web Dev Tasks</span>
            </div>
            <div className={styles.button}>
              <BsCart4 size={24} className="" />
              <span>Groceries</span>
            </div> */}
            {sidebarData.map((menu) => {
              return (
                <div key={menu.title} className={styles.button}>
                  {menu.icon}
                  <span> {menu.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button className="flex items-center gap-2 hover:bg-onhover px-1.5 hover:px-3 py-2 mr-3 rounded-lg hover:scale-[1.03] transition-all">
        <MdFolderCopy size={23} />
        <span>New List</span>
      </button>
    </div>
  );
};

export default Sidebar;
