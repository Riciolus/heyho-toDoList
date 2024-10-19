import AddTaskButton from "@/src/components/addTask";
import TaskList from "../TaskList";
import Dropdown from "@/src/components/task/dropdown";
import ZeroTask from "@/src/components/task/0task";
import { useEffect, useState } from "react";
import { Task } from "@/src/app/page";
import { getDateFormattedLong } from "@/src/lib/datetime";
import { getTodayTasks } from "@/src/lib/api";
import { toast } from "sonner";

const TodayContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const date = getDateFormattedLong();

  useEffect(() => {
    getTodayTasks()
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
      {!isLoading && taskData.length === 0 ? (
        <ZeroTask pageType="today" />
      ) : (
        <TaskList
          colorTheme="orange"
          isLoading={isLoading}
          taskData={taskData}
          pageType="today"
          setTaskData={setTaskData}
        />
      )}

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
