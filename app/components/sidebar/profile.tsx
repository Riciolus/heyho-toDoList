import { getUserProfileData, logoutAccount } from "@/app/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { useRouter } from "next/navigation";
// import { IoIosArrowDown } from "react-icons/io";
// import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";

type ProfileData = {
  email: string;
  name: string;
  avatar: string;
};

const ProfileSection = () => {
  const [profileData, setProfileData] = useState<ProfileData>();
  const router = useRouter();

  useEffect(() => {
    getUserProfileData().then((result) => {
      if (result.status) {
        setProfileData(result.userData);
      }
    });
  }, []);

  const handleLogout = () => {
    logoutAccount().then(() => {
      router.push("/home");
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-3 mb-1">
            <div className="rounded-full h-fit  ">
              <Image
                src="/assets/images/avatar.jpg"
                width={50}
                height={50}
                alt="Avatar..."
                className="rounded-full"
                priority
              />
            </div>

            {profileData && (
              <div className="flex flex-col justify-center text-left gap-0.5">
                <span className="font-bold">{profileData.name}</span>
                <span className="text-neutral-300">{profileData.email}</span>
              </div>
            )}

            <div className="h-fit w-fit"></div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[24rem] mr-8 ">
          <DropdownMenuLabel>Task Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Invite members</DropdownMenuItem>
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Popover>
        <PopoverTrigger>
          <div className="flex gap-3 mb-1">
            <div className="rounded-full h-fit  ">
              <Image
                src="/assets/images/avatar.jpg"
                width={50}
                height={50}
                alt="Avatar..."
                className="rounded-full"
                priority
              />
            </div>

            {profileData && (
              <div className="flex flex-col justify-center text-left gap-0.5">
                <span className="font-bold">{profileData.name}</span>
                <span className="text-neutral-300">{profileData.email}</span>
              </div>
            )}

            <div className="h-fit w-fit"></div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-neutral-900 p-2.5 border-line">
          <h3 className="font-semibold mb-2">Profile Menu</h3>
          <div>
            <button className="hover:bg-neutral-800">Log out</button>
          </div>
        </PopoverContent>
      </Popover> */}
    </>
  );
};

export default ProfileSection;
