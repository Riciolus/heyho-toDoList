import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import { Task } from "@/app/page";
import { getImportantTasks } from "@/app/lib/api";
import LoadingCard from "@/app/components/loadingCard";
import TaskCard from "@/app/components/taskCard";
import AddTaskButton from "@/app/components/addTask";
import { ScrollArea } from "@/app/components/shadcn/scroll-area";
import { IoIosArrowDown } from "react-icons/io";

const ImportantContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, triggerRefetch] = useState(true);

  useEffect(() => {
    const fecthTasksData = async () => {
      await getImportantTasks().then((result) => {
        setTaskData(result.data.data);
        setIsLoading(false);
        triggerRefetch(false);
      });
    };

    if (refetch) {
      fecthTasksData();
    }
  }, [refetch]);

  const completedTasks = taskData.filter((task) => task.completed);
  const notCompletedTasks = taskData.filter((task) => !task.completed);
  return (
    <div className="text-base h-full">
      {/* Title Bar */}
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="flex  gap-2 items-center text-3xl font-semibold underline underline-offset-4 text-pink-300 ">
            <FaRegStar />
            <span>Important</span>
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
      <div className="relative flex flex-col justify-between h-fit mt-5 w-full items-center px-1 tablet:px-0">
        <ScrollArea className="w-full">
          <div className="flex h-[34rem] flex-col gap-1.5 w-[98%]">
            {isLoading ? (
              <LoadingCard />
            ) : (
              notCompletedTasks.map((task: Task) => {
                return (
                  <TaskCard
                    task={task}
                    key={task.id}
                    triggerRefetch={triggerRefetch}
                    colorTheme="pink"
                    setTaskData={setTaskData}
                  />
                );
              })
            )}

            {completedTasks.length > 0 && (
              <h1 className="bg-neutral-800 flex items-center font-medium justify-center gap-1.5 w-fit px-2.5 text-sm mt-3 mb-0.5 text-pink-300 py-1.5 rounded-xl">
                <IoIosArrowDown />
                <p>Completed {`(${completedTasks.length})`}</p>
              </h1>
            )}

            {isLoading && completedTasks.length > 0 ? (
              <LoadingCard />
            ) : (
              completedTasks.map((task: Task) => {
                return (
                  <TaskCard
                    task={task}
                    key={task.id}
                    triggerRefetch={triggerRefetch}
                    colorTheme="pink"
                    setTaskData={setTaskData}
                  />
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Add Task */}
      <AddTaskButton groupId={1} colorTheme="pink" setTaskData={setTaskData} />
    </div>
  );
};

export default ImportantContent;
