import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { Task } from "@/app/page";
import { getImportantTasks } from "@/app/lib/api";
import AddTaskButton from "@/app/components/addTask";
import TaskList from "../TaskList";
import Dropdown from "@/app/components/task/dropdown";

const ImportantContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getImportantTasks().then((result) => {
      setTaskData(result.data.data);
      setIsLoading(false);
    });
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
        <Dropdown />
      </div>
      {/* Task Lists */}
      <TaskList
        colorTheme="pink"
        isLoading={isLoading}
        taskData={taskData}
        cardType="important"
        setTaskData={setTaskData}
      />

      {/* Add Task */}
      <AddTaskButton
        groupId="tasks"
        cardType="important"
        colorTheme="pink"
        setTaskData={setTaskData}
      />
    </div>
  );
};

export default ImportantContent;
