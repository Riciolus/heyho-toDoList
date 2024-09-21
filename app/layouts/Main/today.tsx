import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { Task } from "@/app/page";
import { getDateFormattedLong } from "@/app/lib/datetime";
import { getTodayTasks } from "@/app/lib/api";
import LoadingCard from "@/app/components/loadingCard";
import TaskCardToday from "@/app/components/taskCardToday";
import AddTaskButton from "@/app/components/addTask";
import { ScrollArea } from "@/app/components/shadcn/scroll-area";
import { IoIosArrowDown } from "react-icons/io";

const TodayContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, triggerRefetch] = useState(true);
  const date = getDateFormattedLong();

  useEffect(() => {
    const fecthTasksData = async () =>
      await getTodayTasks().then((result) => {
        setTaskData(result.data.data);
        setIsLoading(false);
        triggerRefetch(false);
      });

    if (refetch) {
      fecthTasksData();
    }
  }, [refetch]);

  const completedTasks = taskData.filter((task) => task.completed);
  const notCompletedTasks = taskData.filter((task) => !task.completed);
  return (
    <div className=" text-base h-full">
      {/* Title Bar */}
      <div className="h-20 flex justify-between items-center ">
        <div className="text-orange-300">
          <h1 className="text-3xl font-semibold mb-1 underline underline-offset-4 ">
            Today
          </h1>
          <span className="">{date}</span>
        </div>
        <div
          onClick={() => alert("bitch")}
          className="bg-onhover hover:bg-[#3f3f3f] p-1.5 rounded-lg"
        >
          <GoKebabHorizontal />
        </div>
      </div>

      {/* Task Lists */}
      <div className="flex flex-col justify-between max-h-screen w-full mt-2.5 items-center px-1 tablet:px-0">
        <ScrollArea className="w-full">
          <div className="flex h-[31.5rem] flex-col gap-1.5 w-[98%]">
            {isLoading ? (
              <LoadingCard />
            ) : (
              notCompletedTasks.map((task: Task) => {
                return (
                  <TaskCardToday
                    task={task}
                    key={task.id}
                    triggerRefetch={triggerRefetch}
                  />
                );
              })
            )}

            {completedTasks.length > 0 && (
              <h1 className="bg-neutral-800 flex font-medium items-center justify-center gap-1.5 w-fit px-2.5 text-sm mt-3 mb-0.5 text-orange-300 py-1.5 rounded-xl">
                <IoIosArrowDown />
                <p>Completed {`(${completedTasks.length})`}</p>
              </h1>
            )}

            {isLoading && completedTasks.length > 0 ? (
              <LoadingCard />
            ) : (
              completedTasks.map((task: Task) => {
                return (
                  <TaskCardToday
                    task={task}
                    key={task.id}
                    triggerRefetch={triggerRefetch}
                  />
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Add Task */}
      <AddTaskButton groupId={0} triggerRefetch={triggerRefetch} />
    </div>
  );
};

export default TodayContent;
