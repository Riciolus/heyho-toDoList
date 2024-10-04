import AddTaskButton from "@/app/components/addTask";
import { getTasksByGroup } from "@/app/lib/api";
import { useEffect, useState } from "react";
import TaskList from "../TaskList";
import { Group, Task } from "@/app/page";
import Dropdown from "@/app/components/task/dropdown";

const DynamicGroupContent = ({
  data,
  iconData,
}: {
  data: Group;
  iconData: object;
}) => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTasksByGroup(data.label).then((result) => {
      setTaskData(result.data.data);
      setIsLoading(false);
    });
  }, [data.label]);

  return (
    <div className="text-base h-full">
      {/* Title Bar */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="flex  gap-2 items-center text-3xl font-semibold underline underline-offset-4 text-purple-200 ">
            {iconData[data.icon as keyof object]}
            <span>{data.title}</span>
          </h1>
        </div>
        <Dropdown />
      </div>
      {/* Task Lists */}
      <TaskList
        colorTheme="purple"
        isLoading={isLoading}
        taskData={taskData}
        pageType="default"
        setTaskData={setTaskData}
      />

      {/* Add Task */}
      <AddTaskButton
        groupId={data.label}
        colorTheme="purple"
        setTaskData={setTaskData}
        pageType="default"
      />
    </div>
  );
};

export default DynamicGroupContent;
