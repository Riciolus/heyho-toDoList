import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import { Task } from "@/app/page";
import { getImportantTasks } from "@/app/lib/api";
import AddTaskButton from "@/app/components/addTask";
import TaskList from "../TaskList";

const ImportantContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthTasksData = async () => {
      await getImportantTasks().then((result) => {
        setTaskData(result.data.data);
        setIsLoading(false);
      });
    };

    fecthTasksData();
  }, []);

  return (
    <div className="text-base h-full">
      {/* Title Bar */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="flex  gap-2 items-center text-3xl font-semibold underline underline-offset-4 text-pink-300 ">
            <FaRegStar />
            <span>Important</span>
          </h1>
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
        colorTheme="pink"
        isLoading={isLoading}
        taskData={taskData}
        cardType="default"
        setTaskData={setTaskData}
      />

      {/* Add Task */}
      <AddTaskButton groupId={1} colorTheme="pink" setTaskData={setTaskData} />
    </div>
  );
};

export default ImportantContent;
