import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { TbSubtask } from "react-icons/tb";
import { Task } from "@/app/page";
import { getTasksByGroup } from "@/app/lib/api";
import AddTaskButton from "@/app/components/addTask";
import TaskList from "../TaskList";

const TasksContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const groupId = "tasks";

    getTasksByGroup(groupId).then((result) => {
      setTaskData(result.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="text-base h-full">
      {/* Title Bar */}
      <div className="flex justify-between items-center mb-5">
        <div className="text-blue-300">
          <h1 className="flex gap-2 items-center text-3xl font-semibold underline underline-offset-4 ">
            <TbSubtask />
            <span>Tasks</span>
          </h1>
        </div>
        <div
          onClick={() => alert("bitch")}
          className="bg-onhover hover:bg-[#3f3f3f] p-1.5 rounded-lg"
        >
          <GoKebabHorizontal />
        </div>
      </div>

      {/* Tasks Lists */}
      <TaskList
        colorTheme="blue"
        isLoading={isLoading}
        taskData={taskData}
        cardType="default"
        setTaskData={setTaskData}
      />
      {/* Add Task */}
      <AddTaskButton
        groupId="tasks"
        colorTheme="blue"
        setTaskData={setTaskData}
        cardType="default"
      />
    </div>
  );
};

export default TasksContent;
