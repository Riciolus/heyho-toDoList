import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { TbSubtask } from "react-icons/tb";
import { Task } from "@/app/page";
import { getTasks } from "@/app/lib/api";
import LoadingCard from "@/app/components/loadingCard";
import TaskCard from "@/app/components/taskCard";
import AddTaskButton from "@/app/components/addTask";
import { ScrollArea } from "@/app/components/shadcn/scroll-area";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const TasksContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const fecthTasksData = async () => {
      await getTasks().then((result) => {
        setTaskData(result.data.data);
        setIsLoading(false);
      });
    };

    fecthTasksData();
  }, []);

  const completedTasks = taskData.filter((task) => task.completed);
  const notCompletedTasks = taskData.filter((task) => !task.completed);
  return (
    <div className="text-base h-full">
      {/* Title Bar */}
      <div className="flex justify-between items-center ">
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
      <div className="flex flex-col mt-5 items-center px-1 tablet:px-0">
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
                    colorTheme="blue"
                    setTaskData={setTaskData}
                  />
                );
              })
            )}

            {completedTasks.length > 0 && (
              <button
                onClick={() => setShowCompleted((prev) => !prev)}
                className="bg-neutral-800 flex items-center justify-center gap-1.5 w-fit px-2.5 text-sm font-medium mt-3 mb-0.5 text-blue-300 py-1.5 rounded-xl"
              >
                {showCompleted ? <IoIosArrowDown /> : <IoIosArrowUp />}
                <span>Completed {`(${completedTasks.length})`}</span>
              </button>
            )}

            {isLoading ? (
              <LoadingCard />
            ) : (
              showCompleted &&
              completedTasks.map((task: Task) => {
                return (
                  <TaskCard
                    colorTheme="blue"
                    task={task}
                    key={task.id}
                    setTaskData={setTaskData}
                  />
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Add Task */}
      <AddTaskButton groupId={3} colorTheme="blue" setTaskData={setTaskData} />
    </div>
  );
};

export default TasksContent;
