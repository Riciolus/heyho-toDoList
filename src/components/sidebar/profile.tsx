import { getUserProfileData, logoutAccount } from "@/src/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserAvatar from "./userAva";
import { useEffect, useState } from "react";
import { ProfileData } from "@/src/app/settings/page";

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
    router.push("/home");

    logoutAccount();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex gap-3 mb-1">
          <UserAvatar includeName={true} profileData={profileData} />

          <div className="h-fit w-fit"></div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[15rem] noPhone:w-[24rem] tablet:w-[17rem] desktop:w-[24rem] laptop:w-[19rem] laptop:mr-8">
        <DropdownMenuLabel>Task Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href={"/settings"}>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
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
