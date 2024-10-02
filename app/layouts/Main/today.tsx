import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { Task } from "@/app/page";
import { getDateFormattedLong } from "@/app/lib/datetime";
import { getTodayTasks } from "@/app/lib/api";
import AddTaskButton from "@/app/components/addTask";
import TaskList from "../TaskList";
// import Image from "next/image";

const TodayContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const date = getDateFormattedLong();

  useEffect(() => {
    getTodayTasks().then((result) => {
      setTaskData(result.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className=" text-base h-full">
      {/* Title Bar */}
      <div className="h-20 flex justify-between items-center mb-2.5">
        <div className="text-orange-300">
          <h1 className="text-3xl font-semibold mb-1 underline underline-offset-4 ">
            Today
          </h1>
          <span className="">{date}</span>
        </div>
        <div
          onClick={() => alert("bitch")}
          className="bg-onhover hover:bg-[#3f3f3f] p-1.5 rounded-lg"
        >
          <GoKebabHorizontal />
        </div>
      </div>
      {/* Task Lists */}
      <TaskList
        colorTheme="orange"
        isLoading={isLoading}
        taskData={taskData}
        cardType="today"
        setTaskData={setTaskData}
      />

      {/* <div className="w-full h-[70%] text-sm flex flex-col items-center justify-center">
        <Image
          src="/assets/bear_3d.png"
          alt="Image not found"
          width={100}
          height={100}
          className="w-28 opacity-90"
        ></Image>
        <h1 className="font-bold">Focus On Your Day</h1>
        <p className="w-56 text-center mt-2">
          Get things done with My Day, a list that refreshes every day
        </p>
      </div> */}
      {/* Add Task */}
      <AddTaskButton
        groupId="tasks"
        cardType="today"
        colorTheme="orange"
        setTaskData={setTaskData}
      />
    </div>
  );
};

export default TodayContent;
