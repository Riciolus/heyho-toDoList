"use client";

import { useEffect, useState } from "react";
import AssignedToMeContent from "../layouts/Main/assgToMe";
import ImportantContent from "../layouts/Main/important";
import TasksContent from "../layouts/Main/tasks";
import TodayContent from "../layouts/Main/today";
import Sidebar from "../layouts/Menu/sidebar";
import Title from "../components/title";
import NavigationBar from "../layouts/Menu/navbar";
import LoadingPage from "../layouts/Main/loading";
import DynamicGroupContent from "../layouts/Main/dynamicGroup";
import { FaHandSparkles } from "react-icons/fa";
import { BsCart4, BsList } from "react-icons/bs";
import { motion } from "framer-motion";
import SearchContent from "../layouts/Main/search";
// import Link from "next/link";

export type Group = {
  label: string;
  title: string;
  icon: string; //DELETED SOON
  iconData: JSX.Element;
};

export type Task = {
  id: string;
  task: string;
  completed: boolean;
  due_date: string;
  important: boolean;
  groupId: string;
  groups: {
    title: string;
  };
};

export type StaticContent = {
  today: JSX.Element;
  important: JSX.Element;
  assgToMe: JSX.Element;
  tasks: JSX.Element;
  search: JSX.Element;
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
  const [dynamicSidebarGroup, setDynamicSidebarGroup] = useState<Group[]>([]);
  const [searchedTaskData, setSearchedTaskData] = useState<Task[]>([]);

  // Get user last visited content in the first load or when refresh the page
  useEffect(() => {
    const storedPage = localStorage.getItem("active-page");

    if (storedPage) {
      const parsedStoredPage = JSON.parse(storedPage);
      setActivePage(parsedStoredPage.current);
    } else {
      localStorage.setItem(
        "active-page",
        JSON.stringify({ current: "today", previous: null })
      );
    }
    setLoading(false);
  }, []);

  const renderActiveContent = () => {
    const staticContent: StaticContent = {
      today: <TodayContent />,
      important: <ImportantContent />,
      assgToMe: <AssignedToMeContent />,
      tasks: <TasksContent />,
      search: <SearchContent searchedTaskData={searchedTaskData} />,
    };

    const dynamicContent = dynamicSidebarGroup?.find(
      (group) => group.label === activePage
    );

    if (dynamicContent) {
      return <DynamicGroupContent data={dynamicContent} iconData={iconData} />;
    }

    return staticContent[activePage as keyof StaticContent];
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className="noFit:mx-[13vw] overflow-hidden h-screen flex flex-col tablet:flex-row">
        {/* Navigation Bar */}
        {/* Navbar only visible when on mobile devices */}
        <NavigationBar toggleSidebar={toggleSidebar} />

        {/* Left Side  Content*/}
        {/* Exsist : Title and Sidebar */}
        <div
          className={`flex z-50 bg-neutral-900 tablet:bg-transparent ease-in-out  flex-col absolute left-[-16rem]  tablet:static h-screen transition-all tablet:border-x border-line pl-3 py-3 w-[65%] tablet:w-[40%] border-r ${
            isSidebar && "left-[0rem]"
          }`}
        >
          {/*          Title */}
          <Title />

          {/*          Sidebar */}
          <div className="h-full ">
            <Sidebar
              setDynamicSidebarGroup={setDynamicSidebarGroup}
              setActivePage={setActivePage}
              setSearchedTaskData={setSearchedTaskData}
              dynamicSidebarGroup={dynamicSidebarGroup}
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
    </motion.div>
  );
}
