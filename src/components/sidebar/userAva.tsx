import { cn } from "@/src/lib/utils";
import Image from "next/image";
// import { useEffect useState } from "react";

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
  // useEffect(() => profileData && setIsLoading(false), [profileData]);

  return (
    <>
      <div
        className="relative rounded-full"
        style={{ width: imageSize || 50, height: imageSize || 50 }}
      >
        <Image
          src={
            !preview
              ? profileData?.avatar
                ? profileData.avatar
                : "/assets/images/avatar.jpg"
              : preview
          }
          fill
          sizes={`${imageSize}px`}
          alt="Avatar..."
          className={cn("rounded-full object-cover")}
          loading="lazy"
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
