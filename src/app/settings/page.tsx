"use client";

import UserEditProfile from "@/src/components/settings/userProfile";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaTachometerAlt, FaUserAstronaut } from "react-icons/fa";
import { MdOutlineRoomPreferences } from "react-icons/md";

const staticGroupData = [
  {
    title: "profile",
    label: "Profile",
    icon: <FaUserAstronaut size={24} className="p-0.5" />,
    content: <UserEditProfile />,
  },
  {
    title: "themes",
    label: "Themes",
    icon: <FaTachometerAlt size={24} className="p-0.5" />,
    content: <div>On Progress...</div>,
  },
  {
    title: "preferences",
    label: "Preferences",
    icon: <MdOutlineRoomPreferences size={24} className="p-0.5" />,
    content: <div>On Progress...</div>,
  },
];

const styles = {
  button:
    "flex items-center hover:bg-onhover py-1 ps-2 rounded-lg transition-colors gap-3 cursor-pointer w-[90%] ",
};

export default function MainPage() {
  const [activePage, setActivePage] = useState("profile");

  const handleChangePage = (title: string) => {
    setActivePage(title);
  };

  return (
    <div>
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <div className="noFit:mx-[13vw] border-x border-line overflow-hidden h-screen flex flex-row tablet:flex-row">
          {/* Left side aka Sidebar */}

          <nav className="flex flex-col h-screen p-5 border-r w-1/3 border-line  noFit:h-full">
            <div className="flex flex-col mt-6 gap-2">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
                className="flex flex-col gap-1.5"
              >
                {staticGroupData.map((group) => (
                  <button
                    key={group.title}
                    onClick={() => handleChangePage(group.title)}
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
          </nav>

          {/* Content */}
          <div className="px-16 py-8 w-full">
            {
              staticGroupData.find((group) => group.title === activePage)
                ?.content
            }
          </div>
        </div>
      </motion.div>
    </div>
  );
}
