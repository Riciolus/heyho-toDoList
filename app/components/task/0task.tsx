import Image from "next/image";

const ZeroTask = () => {
  return (
    <div className="flex flex-col        items-center justify-center w-full h-[35rem]">
      <Image
        src="/assets/bear_3d.png"
        alt="Image not found"
        width={100}
        height={100}
        className="w-20 opacity-90"
      ></Image>
      <h1 className="font-bold text-base mt-1">Focus On Your Day</h1>
      <p className="w-56 text-center text-sm mt-1.5">
        Get things done with My Day, a list that refreshes every day
      </p>
    </div>
  );
};

export default ZeroTask;
