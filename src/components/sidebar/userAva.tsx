import { cn } from "@/src/lib/utils";
import Image from "next/image";

interface PropsType {
  profileData:
    | {
        email: string;
        avatar: string;
        name: string;
      }
    | undefined;
  includeName: boolean;
  preview?: string | null;
  imageSize?: number | null;
}

const UserAvatar = ({
  profileData,
  includeName,
  preview,
  imageSize,
}: PropsType) => {
  return (
    <>
      <div className="rounded-full h-fit  ">
        <Image
          src={
            !preview
              ? profileData?.avatar
                ? profileData.avatar
                : "/assets/images/avatar.jpg"
              : preview
          }
          width={imageSize || 50}
          height={imageSize || 50}
          alt="Avatar..."
          className={cn(
            "rounded-full  object-cover",
            `w-[${imageSize || 50}px] h-[${imageSize || 50}px]`
          )}
          priority
          draggable="false"
        />
      </div>
      {includeName && (
        <div className="flex flex-col justify-center text-left">
          <span className="font-bold">{profileData?.name}</span>
          <span className="text-neutral-300">{profileData?.email}</span>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
