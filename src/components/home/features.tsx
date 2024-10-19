import Image from "next/image";
import EcosystemIcon from "../../../public/assets/icons/ecosystem.svg";

const featureData = [
  {
    title: "Integration Ecosystem",
    description:
      "Seamlessly connect with your favorite productivity tools, calendars, and apps to streamline task management. Our app integrates effortlessly with other platforms, ensuring that all your tasks and schedules are in one place for optimal efficiency.",
  },
  {
    title: "Goal Setting and Tracking",
    description:
      "Set clear goals, break them down into actionable tasks, and track your progress with real-time updates. Whether personal or professional, stay motivated as you complete milestones and see your achievements build up over time.",
  },
  {
    title: "Secure Data Encryption",
    description:
      "Your data is protected with top-tier encryption, ensuring that all your tasks, goals, and personal information remain confidential. We prioritize security so you can focus on your tasks with peace of mind, knowing your information is safe.",
  },
];

const Features = () => {
  return (
    <div
      id="feature"
      className="flex justify-center mx-5 bg-neutral-900 text-neutral-50 py-24"
    >
      <div className="container relative">
        <h2 className="text-center font-semibold text-4xl laptop:text-5xl tracking-tighter">
          Everything you need
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center  mt-5 text-lg  text-neutral-400">
            Enjoy customizable lists, team work tools, and smart tracking all in
            one place. Set tasks and see your progress simply and quickly.
          </p>
        </div>
        <div className="mt-16 flex flex-col noPhone:flex-row noPhone:flex-1 gap-4">
          {featureData.map((ft) => (
            <div
              key={ft.title}
              className="border border-line px-5 py-10 text-center rounded-xl  tablet:w-[33.3%]"
            >
              <div className="inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg">
                <Image src={EcosystemIcon} width={20} height={20} alt="Icons" />
              </div>
              <h3 className="mt-6 font-bold">{ft.title}</h3>
              <p className="mt-2 text-neutral-400">{ft.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
