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
      <div
        className="relative rounded-full bg-red-300"
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
          alt="Avatar..."
          className="rounded-full object-cover"
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
