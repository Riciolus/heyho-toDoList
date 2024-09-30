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
import DynamicGroupContent from "./layouts/Main/dynamicGroup";
import { FaHandSparkles } from "react-icons/fa";
import { BsCart4, BsList } from "react-icons/bs";

export type Group = {
  id: string;
  name: string;
  userId: string;
  icon: string; //DELETED SOON
};

export type Task = {
  id: string;
  task: string;
  completed: boolean;
  created_at: string;
  important: boolean;
  groupId: string;
  groups: {
    name: string;
  };
};

export type StaticContent = {
  today: JSX.Element;
  important: JSX.Element;
  assgToMe: JSX.Element;
  tasks: JSX.Element;
};

const iconData: { [key: string]: JSX.Element } = {
  start: <FaHandSparkles size={24} className="fill-yellow-500" />,
  list: <BsList size={24} />,
  cart: <BsCart4 size={24} />,
};

// Objects that filled with component name for dynamic content rendering
// the name of each page name is same as page name in localstorage

export default function MainPage() {
  const [activePage, setActivePage] = useState<string>("today"); // To store user current active page
  const [isSidebar, toggleSidebar] = useState<boolean>(false); // To store status of Sidebar (is opened or not)
  const [isLoading, setLoading] = useState<boolean>(true);
  const [sidebarGroup, setSidebarGroup] = useState<Group[]>([]);

  // Get user last visited content in the first load or when refresh the page
  useEffect(() => {
    const storedPage = localStorage.getItem("active-page");
    if (storedPage) {
      setActivePage(storedPage);
    } else {
      localStorage.setItem("active-page", "today");
    }
    setLoading(false);
  }, []);

  const renderActiveContent = () => {
    const staticContent: StaticContent = {
      today: <TodayContent />,
      important: <ImportantContent />,
      assgToMe: <AssignedToMeContent />,
      tasks: <TasksContent />,
    };
    const dynamicContent = sidebarGroup.find(
      (group) => group.id === activePage
    );

    if (dynamicContent) {
      return <DynamicGroupContent data={dynamicContent} iconData={iconData} />;
    }

    return staticContent[activePage as keyof StaticContent]; // Type assertion
  };

  // Change content
  const handleChangeContent = (page: string) => {
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
            setSidebarGroup={setSidebarGroup}
            sidebarGroup={sidebarGroup}
            handleChangeContent={handleChangeContent}
            activePage={activePage}
            iconData={iconData}
          />
        </div>

        {/*           Main Content */}
      </div>

      <div className="laptop:px-16 w-full tablet:px-8 px-5 tablet:py-10 py-3 tablet:w-[70%] ">
        {/* Render Page Dynamicly */}
        {isLoading ? <LoadingPage /> : renderActiveContent()}

        {/* <LoadingPage /> */}
      </div>
    </div>
  );
}
