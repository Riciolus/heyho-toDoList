import AddTaskButton from "@/src/components/addTask";
import TaskList from "../TaskList";
import Dropdown from "@/src/components/task/dropdown";
import ZeroTask from "@/src/components/task/0task";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { Group, Task } from "@/src/app/page";
import { getImportantTasks } from "@/src/lib/api";
import { toast } from "sonner";

const ImportantContent = ({ userGroups }: { userGroups: Group[] }) => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getImportantTasks()
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
        <div>
          <h1 className="flex  gap-2 items-center text-3xl font-semibold underline underline-offset-4 text-pink-300 ">
            <FaRegStar />
            <span>Important</span>
          </h1>
        </div>
        <Dropdown />
      </div>
      {/* Task Lists */}
      {!isLoading && taskData.length === 0 ? (
        <ZeroTask pageType="important" />
      ) : (
        <TaskList
          userGroups={userGroups}
          colorTheme="pink"
          isLoading={isLoading}
          taskData={taskData}
          pageType="important"
          setTaskData={setTaskData}
        />
      )}

      {/* Add Task */}
      <AddTaskButton
        groupId="tasks"
        pageType="important"
        colorTheme="pink"
        setTaskData={setTaskData}
      />
    </div>
  );
};

export default ImportantContent;
