import Image from "next/image";
import { motion } from "framer-motion";

type PageDataItem = {
  header: string;
  text: string;
  iconPath: string;
};

type PageData = Array<{
  today?: PageDataItem;
  important?: PageDataItem;
  assignedToMe?: PageDataItem;
  tasks?: PageDataItem;
  default?: PageDataItem;
}>;

type PageType = "today" | "important" | "tasks" | "default";

const pageData: PageData = [
  {
    today: {
      header: "Focus On Your Day",
      text: "Get things done with My Day, a list that refreshes every day.",
      iconPath: "/assets/fluent-emojis/bear_3d.png",
    },
  },
  {
    important: {
      header: "Stay on Top of What Matters",
      text: "Prioritize the tasks that are most important to you, ensuring they never slip through the cracks.",
      iconPath: "/assets/fluent-emojis/rocket_3d.png",
    },
  },
  {
    assignedToMe: {
      header: "Focus on Your Responsibilities",
      text: "Keep track of the tasks others have assigned to you and stay on top of your commitments.",
      iconPath: "/assets/fluent-emojis/handshake_3d.png",
    },
  },
  {
    tasks: {
      header: "All Your Tasks, One Place",
      text: "View all your tasks in one organized list, ensuring nothing is left undone.",
      iconPath: "/assets/fluent-emojis/face_with_monocle_3d.png",
    },
  },
  {
    default: {
      header: "Your Awesome Space",
      text: "Organize your tasks the way you want. Create and manage tasks in this personalized group.",
      iconPath: "/assets/fluent-emojis/face_savoring_food_3d.png",
    },
  },
];

const ZeroTask = ({ pageType = "default" }: { pageType: PageType }) => {
  const pageInfo = pageData.find((name) => name[pageType])?.[pageType];

  if (!pageInfo) {
    return null;
  }

  const { header, text, iconPath } = pageInfo;
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center w-full h-[35rem]">
        <Image
          src={iconPath}
          alt="Image not found"
          width={100}
          height={100}
          className="w-20 opacity-90"
        ></Image>
        <h1 className="font-bold text-base mt-1">{header}</h1>
        <p className="w-64 text-neutral-400 text-center text-sm mt-1.5">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default ZeroTask;
