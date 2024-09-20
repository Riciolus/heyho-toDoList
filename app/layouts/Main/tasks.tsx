import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { TbSubtask } from "react-icons/tb";
import { Task } from "@/app/page";
import { getTasks } from "@/app/lib/api";
import LoadingCard from "@/app/components/loadingCard";
import TaskCard from "@/app/components/taskCard";
import AddTaskButton from "@/app/components/addTask";
import { ScrollArea } from "@/app/components/shadcn/scroll-area";

const TasksContent = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, triggerRefetch] = useState(true);

  useEffect(() => {
    const fecthTasksData = async () => {
      await getTasks().then((result) => {
        setTaskData(result.data.data);
        setIsLoading(false);
        triggerRefetch(false);
      });
    };

    if (refetch) {
      fecthTasksData();
    }
  }, [refetch]);
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
      <div className="flex flex-col gap-1.5 mt-5">
        <ScrollArea className="w-full">
          <div className="flex h-[34rem] flex-col gap-1.5 w-[98%]">
            {isLoading ? (
              <LoadingCard />
            ) : (
              taskData.map((task: Task) => {
                return (
                  <TaskCard
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
      <AddTaskButton groupId={3} triggerRefetch={triggerRefetch} />
    </div>
  );
};

export default TasksContent;
