import Dropdown from "@/src/components/task/dropdown";
import { TbSubtask } from "react-icons/tb";
import TaskList from "../TaskList";
import AddTaskButton from "@/src/components/addTask";
import { useEffect, useState } from "react";
import { getTasksByGroup } from "@/src/lib/api";
import { Task } from "@/src/app/page";
import ZeroTask from "@/src/components/task/0task";
import { toast } from "sonner";

const AssignedToMeContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const groupId = "assignment";

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
        <div className="text-green-200">
          <h1 className="flex gap-2 items-center text-3xl font-semibold underline underline-offset-4 ">
            <TbSubtask />
            <span>Assinged To Me</span>
          </h1>
        </div>
        <Dropdown />
      </div>

      {/* Tasks Lists */}

      {!isLoading && taskData.length === 0 ? (
        <ZeroTask pageType="assignment" />
      ) : (
        <TaskList
          isLoading={isLoading}
          taskData={taskData}
          colorTheme="green"
          pageType="assignment"
          setTaskData={setTaskData}
        />
      )}

      {/* Add Task */}
      <AddTaskButton
        colorTheme="green"
        groupId="assignment"
        pageType="assignment"
        setTaskData={setTaskData}
      />
    </div>
  );
};

export default AssignedToMeContent;
