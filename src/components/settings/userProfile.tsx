import React, { useEffect, useState } from "react";
import UserAvatar from "../sidebar/userAva";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { editProfileData, getUserProfileData } from "@/src/lib/api";
import UserProfileSkeleton from "./userProfileSkeleton";

export type ProfileData = {
  email: string;
  name: string;
  avatar: string;
};

const UserEditProfile = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isReadingImage, setIsReadingImage] = useState(false);

  useEffect(() => {
    getUserProfileData().then((result) => {
      if (result.status) {
        setProfileData(result.userData);
      }
    });
  }, []);

  if (!profileData) {
    return <UserProfileSkeleton />;
  }

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
    <>
      <form onSubmit={handleEditProfile} className="flex flex-col gap-1 ">
        {/* Image Profile Picture */}

        <div className="relative flex flex-col justify-center items-center  gap-1.5 rounded-full h-fit ">
          <UserAvatar
            profileData={profileData}
            includeName={false}
            preview={preview}
            imageSize={60}
          />

          <input
            className="absolute top-0 text-transparent h-full w-[60px] file:hidden bg-transparent rounded-full"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </div>

        {/* username and email */}
        <div className="grid grid-cols-2 gap-3 w-full mt-5">
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
    </>
  );
};

export default UserEditProfile;
