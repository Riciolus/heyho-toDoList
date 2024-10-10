import Link from "next/link";
import cursorImage from "../../../public/assets/images/cursor.png";
import messageImage from "../../../public/assets/images/message.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[linear-gradient(to_bottom,#171717_38%,#4F21A1_65%,#A46EDB_82%)] relative overflow-clip">
      {/* CONTENT */}
      <div className="relative z-30 flex flex-col justify-center items-center text-center p-3 laptop:mt-48 mt-20">
        {/* Title */}
        <div className="flex justify-center">
          <div className="inline-flex relative">
            <h1 className="text-6xl tablet:text-8xl tracking-tighter font-semibold text-center">
              Create. Organize.
              <br /> Achieve.
            </h1>
            <Image
              src={cursorImage}
              height={200}
              width={200}
              className="absolute right-[660px] top-[30px] hidden noFit:inline"
              alt="Cursor Image"
            />
            <Image
              src={messageImage}
              height={200}
              width={200}
              className="absolute top-[62px] left-[634px] hidden noFit:inline"
              alt="Message Image"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex justify-center mt-14 mb-3 tablet:mb-12">
          <p className=" text-xl  w-[90%] laptop:w-[50%]">
            Your simple and intuitive task manager. Create, organize, and track
            your tasks effortlessly. Stay on top of your day with features like
            deadlines, priorities, and task assignments. Get started today!
          </p>
        </div>

        {/* Button  */}
        <div className="flex justify-center mt-12">
          <button className="bg-neutral-50 text-neutral-950 py-3 px-5 rounded-lg font-medium hover:bg-neutral-300">
            <Link href="/auth/register">
              <span>Get for free</span>
            </Link>
          </button>
        </div>
      </div>

      {/* BACKGROUND - ROUNDED CIRCLE */}
      <div className="absolute h-[375px] w-[750px] noPhone:h-[512px] noPhone:w-[1312px] noFit:h-[768px] noFit:w-[1736px] laptop:h-[780px] laptop:w-[2400px] desktop:h-[800px] desktop:w-[3800px] rounded-[100%] bg-neutral-900 left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-[radial-gradient(closest-side,#171717_82%,#9560EB)] top-[calc(100%-96px)] noFit:top-[calc(100%-120px)]"></div>
    </div>
  );
};

export default Hero;
