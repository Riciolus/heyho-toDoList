"use client";

import { useEffect, useState } from "react";
import AssignedToMeContent from "./layouts/Main/assgToMe";
import ImportantContent from "./layouts/Main/important";
import TasksContent from "./layouts/Main/tasks";
import TodayContent from "./layouts/Main/today";
import Sidebar from "./layouts/Sidebar";
import Title from "./components/title";

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

  // if()

  return (
    <div className="noFit:mx-[13vw] mx-0 h-screen flex">
      <div className="flex flex-col h-screen border-x border-line pl-3 py-3 w-[30%] tablet:w-[40%]">
        <Title />
        {/* Sidebar component */}
        <div className="h-full">
          <Sidebar
            handleChangeContent={handleChangeContent}
            activePage={activePage}
          />
        </div>
        {/* Main Content */}
      </div>

      <div className="laptop:px-16 tablet:px-8 px-5 py-10 w-[70%] ">
        {renderActivePage[activePage]}
      </div>
    </div>
  );
}
