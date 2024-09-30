import AddTaskButton from "@/app/components/addTask";
import { getTasksByGroup } from "@/app/lib/api";
import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import TaskList from "../TaskList";
import { Task } from "@/app/page";

const DynamicGroupContent = ({
  data,
  iconData,
}: {
  data: { id: string; name: string; icon: string };
  iconData: object;
}) => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTasksByGroup(data.id).then((result) => {
      setTaskData(result.data.data);
      setIsLoading(false);
    });
  }, [data.id]);

  return (
    <div className="text-base h-full">
      {/* Title Bar */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="flex  gap-2 items-center text-3xl font-semibold underline underline-offset-4 text-neutral-300 ">
            {iconData[data.icon as keyof object]}
            <span>{data.name}</span>
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
        colorTheme="blue"
        isLoading={isLoading}
        taskData={taskData}
        cardType="default"
        setTaskData={setTaskData}
      />

      {/* Add Task */}
      <AddTaskButton
        groupId={data.id}
        colorTheme="green"
        setTaskData={setTaskData}
        cardType="default"
      />
    </div>
  );
};

export default DynamicGroupContent;
