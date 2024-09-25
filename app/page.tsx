"use client";

import { useEffect, useState } from "react";
import AssignedToMeContent from "./layouts/Main/assgToMe";
import ImportantContent from "./layouts/Main/important";
import TasksContent from "./layouts/Main/tasks";
import TodayContent from "./layouts/Main/today";
import Sidebar from "./layouts/Sidebar";
import Title from "./components/title";
import NavigationBar from "./components/navbar";
import LoadingPage from "./layouts/Main/loading";

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

// Objects that filled with component name for dynamic content rendering
// the name of each page name is same as page name in localstorage
const renderActivePage: ActivePageMap = {
  today: <TodayContent />,
  important: <ImportantContent />,
  assgToMe: <AssignedToMeContent />,
  tasks: <TasksContent />,
};

export default function MainPage() {
  const [activePage, setActivePage] = useState<ActivePageKey>("today"); // To store user current active page
  const [isSidebar, toggleSidebar] = useState<boolean>(false); // To store status of Sidebar (is opened or not)
  const [isLoading, setLoading] = useState<boolean>(true);

  // Get user last visited content in the first load or when refresh the page
  useEffect(() => {
    const storedPage = localStorage.getItem("active-page") as ActivePageKey;
    if (storedPage) {
      setActivePage(storedPage);
    } else {
      localStorage.setItem("active-page", "today");
    }
    setLoading(false);
  }, []);

  // Change content
  const handleChangeContent = (page: keyof ActivePageMap) => {
    localStorage.setItem("active-page", page);
    setActivePage(page);
  };

  return (
    <div className="noFit:mx-[13vw] h-screen flex flex-col tablet:flex-row">
      {/* Navigation Bar */}
      {/* Navbar only visible when on mobile devices */}
      <NavigationBar toggleSidebar={toggleSidebar} />

      {/* Left Side  Content*/}
      {/* Exsist : Title and Sidebar */}
      <div
        className={`flex z-50 bg-neutral-900 tablet:bg-transparent ease-in-out  flex-col absolute left-[-16rem] tablet:static h-screen transition-all tablet:border-x border-line pl-3 py-3 w-[65%] tablet:w-[40%] ${
          isSidebar && "left-[0rem]"
        }`}
      >
        {/*          Title */}
        <Title />

        {/*          Sidebar */}
        <div className="h-full ">
          <Sidebar
            handleChangeContent={handleChangeContent}
            activePage={activePage}
          />
        </div>

        {/*           Main Content */}
      </div>

      <div className="laptop:px-16 w-full tablet:px-8 px-5 tablet:py-10 py-3 tablet:w-[70%] ">
        {/* Render Page Dynamicly */}
        {isLoading ? <LoadingPage /> : renderActivePage[activePage]}

        {/* <LoadingPage /> */}
      </div>
    </div>
  );
}
