import AddTaskButton from "@/src/components/addTask";
import TaskList from "../TaskList";
import Dropdown from "@/src/components/task/dropdown";
import ZeroTask from "@/src/components/task/0task";
import { getTasksByGroup } from "@/src/lib/api";
import { useEffect, useState } from "react";
import { Group, Task } from "@/src/app/page";
import { toast } from "sonner";

const DynamicGroupContent = ({
  userGroups,
  data,
  iconData,
}: {
  userGroups: Group[];
  data: Group;
  iconData: object;
}) => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTasksByGroup(data.label)
      .then((result) => {
        if (result?.data?.data) {
          setTaskData(result.data.data);
        } else {
          toast("Server busy, Please try again later.");
          setTaskData([]); // Handle cases where data is missing
        }
      })
      .finally(() => {
        setIsLoading(false); // End loading state
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
      {!isLoading && taskData.length === 0 ? (
        <ZeroTask pageType="default" />
      ) : (
        <TaskList
          userGroups={userGroups}
          colorTheme="purple"
          isLoading={isLoading}
          taskData={taskData}
          pageType="default"
          setTaskData={setTaskData}
        />
      )}

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
