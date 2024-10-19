import AddTaskButton from "@/src/components/addTask";
import TaskList from "../TaskList";
import Dropdown from "@/src/components/task/dropdown";
import ZeroTask from "@/src/components/task/0task";
import { useEffect, useState } from "react";
import { TbSubtask } from "react-icons/tb";
import { Task } from "@/src/app/page";
import { getTasksByGroup } from "@/src/lib/api";
import { toast } from "sonner";

const TasksContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const groupId = "tasks";

    getTasksByGroup(groupId)
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
        <Dropdown />
      </div>

      {/* Tasks Lists */}
      {!isLoading && taskData.length === 0 ? (
        <ZeroTask pageType="tasks" />
      ) : (
        <TaskList
          colorTheme="blue"
          isLoading={isLoading}
          taskData={taskData}
          pageType="tasks"
          setTaskData={setTaskData}
        />
      )}
      {/* Add Task */}
      <AddTaskButton
        groupId="tasks"
        colorTheme="blue"
        setTaskData={setTaskData}
        pageType="tasks"
      />
    </div>
  );
};

export default TasksContent;
