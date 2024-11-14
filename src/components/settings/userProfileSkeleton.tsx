import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UserProfileSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-1 ">
        {/* Image Profile Picture */}

        <div className="relative flex flex-col justify-center items-center  gap-1.5 rounded-full h-fit ">
          <div className="w-[60px] h-[60px] bg-neutral-800 rounded-full animate-pulse relative"></div>

          <input
            className="absolute top-0 text-transparent h-full w-full  file:hidden bg-transparent rounded-full"
            type="file"
            accept="image/*"
          />
        </div>

        {/* username and email */}
        <div className="grid grid-cols-2 gap-3 w-full mt-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="font-semibold text-transparent bg-neutral-800 w-fit animate-pulse rounded-md"
            >
              Usernam
            </label>
            <Input
              id="username"
              type="text"
              className="bg-neutral-800 w-[19rem] noPhone:w-full border-none animate-pulse h-8"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="font-semibold text-transparent bg-neutral-800 w-fit animate-pulse rounded-md"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              className="bg-neutral-800 w-[19rem] noPhone:w-full border-none animate-pulse h-8"
            />
          </div>
        </div>
        <div className=" flex justify-center mt-5">
          <Button className="bg-neutral-800 text-neutral-50 hover:bg-onhover w-full h-7 animate-pulse"></Button>
        </div>
      </div>
    </>
  );
};

export default UserProfileSkeleton;
