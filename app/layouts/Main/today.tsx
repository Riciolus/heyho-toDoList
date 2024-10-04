import { useEffect, useState } from "react";
import { Task } from "@/app/page";
import { getDateFormattedLong } from "@/app/lib/datetime";
import { getTodayTasks } from "@/app/lib/api";
import AddTaskButton from "@/app/components/addTask";
import TaskList from "../TaskList";
import Dropdown from "@/app/components/task/dropdown";
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
        <Dropdown />
      </div>
      {/* Task Lists */}
      <TaskList
        colorTheme="orange"
        isLoading={isLoading}
        taskData={taskData}
        pageType="today"
        setTaskData={setTaskData}
      />

      {/* Add Task */}
      <AddTaskButton
        groupId="tasks"
        pageType="today"
        colorTheme="orange"
        setTaskData={setTaskData}
      />
    </div>
  );
};

export default TodayContent;
