import { getUserProfileData, logoutAccount } from "@/src/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

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
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex gap-3 mb-1">
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

          <div className="flex flex-col justify-center text-left">
            <span className="font-bold">{profileData?.name}</span>
            <span className="text-neutral-300">{profileData?.email}</span>
          </div>

          <div className="h-fit w-fit"></div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[15rem] noPhone:w-[24rem] tablet:w-[17rem] desktop:w-[24rem] laptop:w-[19rem] laptop:mr-8">
        <DropdownMenuLabel>Task Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Invite members</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/home")}>
          Home
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileSection;
