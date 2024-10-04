"use client";

import { TiWeatherSunny } from "react-icons/ti";
import { FaRegStar, FaUserAstronaut } from "react-icons/fa";
import { TbSubtask } from "react-icons/tb";
import { Group } from "@/app/page";
import { useEffect } from "react";
import { getGroupByLabel } from "@/app/lib/api";
import GroupProperties from "../../components/sidebar/groupProperties";
import { motion } from "framer-motion";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/app/components/shadcn/context-menu";
import AddNewGroup from "@/app/components/sidebar/addNewGroup";
import ProfileSection from "@/app/components/sidebar/profile";
import SearchBarSection from "@/app/components/sidebar/search";

interface SidebarProps {
  setDynamicSidebarGroup: React.Dispatch<React.SetStateAction<Group[]>>;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
  dynamicSidebarGroup: Group[];
  iconData: object;
}

const staticGroupData = [
  {
    title: "today",
    label: "Today",
    icon: <TiWeatherSunny size={24} className="fill-orange-500" />,
  },
  {
    title: "important",
    label: "Important",
    icon: <FaRegStar size={24} className="fill-pink-400 p-0.5" />,
  },
  {
    title: "assgToMe",
    label: "Assigned to me",
    icon: <FaUserAstronaut size={24} className="fill-green-300 p-0.5" />,
  },
  {
    title: "tasks",
    label: "Tasks",
    icon: <TbSubtask size={24} className="text-blue-300" />,
  },
];

const styles = {
  button:
    "flex items-center hover:bg-onhover py-1 ps-2 rounded-lg transition-colors gap-3 cursor-pointer w-[90%] laptop:w-[62%]",
};

const Sidebar = ({
  setDynamicSidebarGroup,
  setActivePage,
  activePage,
  dynamicSidebarGroup,
  iconData,
}: SidebarProps) => {
  useEffect(() => {
    async function getGroupData() {
      const result = await getGroupByLabel();
      localStorage.setItem("group", JSON.stringify(result));
      console.log(result);
      setDynamicSidebarGroup(result);
    }

    getGroupData();
  }, [setDynamicSidebarGroup]);

  // Change content
  const handleChangeContent = (pageId: string) => {
    localStorage.setItem(
      "active-page",
      JSON.stringify({ current: pageId, previous: activePage })
    );
    setActivePage(pageId);
  };

  return (
    <div className="flex flex-col h-fit  noFit:h-full justify-between ">
      <div className="flex flex-col mt-6 gap-2">
        {/* PROFILE SECTION */}
        <ProfileSection />

        {/* SEARCH BAR */}
        <SearchBarSection />

        {/* STATIC GROUP SECTION */}

        <div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="flex flex-col gap-1"
          >
            {staticGroupData.map((group) => (
              <button
                key={group.title}
                onClick={() => handleChangeContent(group.title)}
                className={`${styles.button} ${
                  activePage === group.title && "bg-onhover"
                }`}
              >
                {group.icon}
                <span>{group.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        <hr className="h-[0.7px] bg-line border-0 mr-20" />

        {/* DYNAMIC GROUP SECTION */}
        <div className="flex flex-col gap-1">
          {dynamicSidebarGroup &&
            dynamicSidebarGroup.map((group: Group) => {
              return (
                <motion.div
                  initial={{ x: 5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  exit={{ opacity: 0 }}
                  key={group.label}
                >
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <div
                        onClick={() => handleChangeContent(group.label)}
                        className={`${styles.button} ${
                          activePage === group.label && "bg-onhover"
                        } `}
                      >
                        {iconData[group.icon as keyof object]}
                        <span> {group.title}</span>
                      </div>
                    </ContextMenuTrigger>
                    <GroupProperties
                      groupId={group.label}
                      setDynamicSidebarGroup={setDynamicSidebarGroup}
                      setActivePage={setActivePage}
                    />
                  </ContextMenu>
                </motion.div>
              );
            })}
        </div>
      </div>

      <div>
        <AddNewGroup
          setSidebarGroup={setDynamicSidebarGroup}
          setActivePage={setActivePage}
          activePage={activePage}
        />
      </div>
    </div>
  );
};

export default Sidebar;
