"use client";

import UserAvatar from "@/src/components/sidebar/userAva";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { editProfileData, getUserProfileData } from "@/src/lib/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaTachometerAlt, FaUserAstronaut } from "react-icons/fa";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { toast } from "sonner";

export type ProfileData = {
  email: string;
  name: string;
  avatar: string;
};

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
  const [preview, setPreview] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isReadingImage, setIsReadingImage] = useState(false);

  useEffect(() => {
    setActiveSection("profile");
  }, []);

  useEffect(() => {
    getUserProfileData().then((result) => {
      if (result.status) {
        setProfileData(result.userData);
      }
    });
  }, []);

  const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isReadingImage) {
      toast("Please wait for the image to finish loading.");
      return;
    }

    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const reader = new FileReader();

    if (image) {
      setIsReadingImage(true); // Start reading the image
      reader.readAsDataURL(image);

      reader.onload = () => {
        setIsReadingImage(false); // Image reading is complete

        const data = {
          name: form.username.value,
          email: form.email.value,
          avatar: typeof reader.result === "string" ? reader.result : undefined,
        };

        editProfileData(data).then(() => {
          setIsLoading(false);
          toast("Profile Changed!");
        });
      };

      reader.onerror = () => {
        setIsReadingImage(false); // Stop loading on error
        setIsLoading(false);
        toast("Failed to read the image.");
      };
    } else {
      // Handle form submission without an image
      const data = {
        name: form.username.value,
        email: form.email.value,
        avatar: undefined, // No image provided
      };

      editProfileData(data).then(() => {
        setIsLoading(false);
        toast("Profile Changed!");
      });
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileImage = e.target.files?.[0];

    if (newFileImage) {
      setImage(newFileImage);
      const objectUrl = URL.createObjectURL(newFileImage);
      setPreview(objectUrl);
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <div className="noFit:mx-[13vw] border-x border-line overflow-hidden h-screen flex flex-row tablet:flex-row">
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

          {/* Settings */}
          <div className="px-16 py-8 w-full">
            {/* Edit Profile Form */}
            <form onSubmit={handleEditProfile} className="flex flex-col gap-1 ">
              {/* Image Profile Picture */}
              <div className="relative flex flex-col justify-center items-center  gap-1.5 rounded-full h-fit ">
                {/* <label className="font-semibold">Profile Picture</label> */}
                {profileData && (
                  <UserAvatar
                    profileData={profileData}
                    includeName={false}
                    preview={preview}
                    imageSize={60}
                  />
                )}

                <input
                  className="absolute top-0 text-transparent h-full w-full  file:hidden bg-transparent rounded-full"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                />
              </div>

              {/* username and email */}
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="username" className="font-semibold">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    className="bg-neutral-800 w-[19rem] noPhone:w-full border-line h-9"
                    defaultValue={profileData?.name}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-neutral-800 w-[19rem] noPhone:w-full border-line h-9"
                    defaultValue={profileData?.email}
                  />
                </div>
              </div>
              <div className=" flex justify-center mt-5">
                <Button
                  className="bg-neutral-700 text-neutral-50 hover:bg-onhover w-full h-8 border border-line"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CgSpinner className="animate-spin" size={22} />
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
