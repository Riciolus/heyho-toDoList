import Image from "next/image";

const ProfileSection = () => {
  return (
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

      <div className="flex flex-col justify-center gap-0.5">
        <span className="font-bold">jhondoe</span>
        <span className="">jhondoe@gmail.com</span>
      </div>
    </div>
  );
};

export default ProfileSection;
