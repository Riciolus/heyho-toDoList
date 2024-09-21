"use client";

import { useEffect, useState } from "react";
import AssignedToMeContent from "./layouts/Main/assgToMe";
import ImportantContent from "./layouts/Main/important";
import TasksContent from "./layouts/Main/tasks";
import TodayContent from "./layouts/Main/today";
import Sidebar from "./layouts/Sidebar";
import Title from "./components/title";
import { IoMenu } from "react-icons/io5";

export type Task = {
  id: string;
  task: string;
  completed: boolean;
  created_at: string;
  important: boolean;
  groupId: string;
  group: string;
};

export type ActivePageMap = {
  today: JSX.Element;
  important: JSX.Element;
  assgToMe: JSX.Element;
  tasks: JSX.Element;
};

type ActivePageKey = keyof ActivePageMap;

const renderActivePage: ActivePageMap = {
  today: <TodayContent />,
  important: <ImportantContent />,
  assgToMe: <AssignedToMeContent />,
  tasks: <TasksContent />,
};

export default function MainPage() {
  const [activePage, setActivePage] = useState<ActivePageKey>("today");
  const [isSidebar, toggleSidebar] = useState<boolean>(false);

  useEffect(() => {
    const storedPage = localStorage.getItem("active-page") as ActivePageKey;
    if (storedPage) {
      setActivePage(storedPage);
    } else {
      localStorage.setItem("active-page", "today");
    }
  }, []);

  const handleChangeContent = (page: keyof ActivePageMap) => {
    localStorage.setItem("active-page", page);
    setActivePage(page);
  };

  return (
    <div className="noFit:mx-[13vw] h-screen flex flex-col tablet:flex-row">
      <div className="flex justify-between bg-neutral-950 items-center px-3 tablet:hidden h-14 border-b border-line">
        <div className="text-lg font-semibold">Heyho!</div>
        <button onClick={() => toggleSidebar((prev) => !prev)}>
          <IoMenu size={32} />
        </button>
      </div>
      {/* Left Side */}
      <div
        className={`flex z-50 bg-neutral-900 tablet:bg-transparent ease-in-out  flex-col absolute left-[-16rem] tablet:static h-screen transition-all tablet:border-x border-line pl-3 py-3 w-[65%] tablet:w-[40%] ${
          isSidebar && "left-[0rem]"
        }`}
      >
        <Title />
        {/* Sidebar component */}
        <div className="h-full ">
          <Sidebar
            handleChangeContent={handleChangeContent}
            activePage={activePage}
          />
        </div>
        {/* Main Content */}
      </div>

      <div className="laptop:px-16 w-full tablet:px-8 px-5 tablet:py-10 py-3 tablet:w-[70%] ">
        {renderActivePage[activePage]}
      </div>
    </div>
  );
}
