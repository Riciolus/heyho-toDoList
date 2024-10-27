"use client";

import { editProfileData } from "@/src/lib/api";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTachometerAlt, FaUserAstronaut } from "react-icons/fa";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { toast } from "sonner";

const staticGroupData = [
  {
    title: "profile",
    label: "Profile",
    icon: <FaUserAstronaut size={24} className="p-0.5" />,
  },
  {
    title: "themes",
    label: "Themes",
    icon: <FaTachometerAlt size={24} className="p-0.5" />,
  },
  {
    title: "preferences",
    label: "Preferences",
    icon: <MdOutlineRoomPreferences size={24} className="p-0.5" />,
  },
];

const styles = {
  button:
    "flex items-center hover:bg-onhover py-1 ps-2 rounded-lg transition-colors gap-3 cursor-pointer w-[90%] laptop:w-[62%]",
};

export default function MainPage() {
  const [activeSection, setActiveSection] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setActiveSection("profile");
  }, []);

  const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) return toast("Image error, please try again.");

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64data = reader.result;

      const data = {
        avatar: JSON.stringify({ file: base64data }),
      };

      editProfileData(data).then((result) => console.log(result.data));
    };
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileImage = e.target.files?.[0];
    if (newFileImage) setImage(newFileImage);
    console.log(newFileImage);
  };

  return (
    <div>
      {/* Sidebar */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <div className="noFit:mx-[13vw] border-x border-line overflow-hidden h-screen flex flex-col tablet:flex-row">
          {/* Left side */}
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
                    // onClick={() => handleChangeContent(group.title)}
                    className={`${styles.button} ${
                      activeSection === group.title && "bg-onhover"
                    }`}
                  >
                    {group.icon}
                    <span>{group.label}</span>
                  </button>
                ))}
              </motion.div>
            </div>
          </nav>
          <div className="p-3">
            <form onSubmit={handleEditProfile}>
              <input
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
              />
              <button type="submit">Submit</button>
              <div className="rounded-full h-fit  ">
                <Image
                  src="/assets/images/avatar.jpg"
                  width={50}
                  height={50}
                  alt="Avatar..."
                  className="rounded-full"
                  priority
                  draggable="false"
                />
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
