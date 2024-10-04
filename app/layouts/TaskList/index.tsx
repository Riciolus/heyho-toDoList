import LoadingCard from "@/app/components/task/loadingCard";
import { ScrollArea } from "@/app/components/shadcn/scroll-area";
import TaskCard, { ColorTheme } from "@/app/components/task/taskCard";
import { Task } from "@/app/page";
import clsx from "clsx";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import ZeroTask from "@/app/components/task/0task";

export type PageType = "today" | "default" | "important" | "tasks";

const TaskList = ({
  isLoading,
  taskData,
  setTaskData,
  colorTheme,
  pageType,
}: {
  isLoading: boolean;
  taskData: Task[];
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  colorTheme: ColorTheme;
  pageType: PageType;
}) => {
  const [showCompleted, setShowCompleted] = useState(true);

  const completedTasks = Array.isArray(taskData)
    ? taskData.filter((task) => task.completed)
    : [];

  const notCompletedTasks = Array.isArray(taskData)
    ? taskData.filter((task) => !task.completed)
    : [];

  if (!isLoading && taskData.length === 0) {
    return <ZeroTask pageType={pageType} />;
  }
  return (
    <div className="flex flex-col items-center px-1 tablet:px-0">
      <ScrollArea className="w-full">
        <div
          className={clsx(
            "flex flex-col gap-1.5 w-[98%]",
            pageType === "today" ? "h-[31.5rem]" : "h-[34rem]"
          )}
        >
          {isLoading ? (
            <LoadingCard />
          ) : (
            notCompletedTasks.map((task: Task) => {
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  colorTheme={colorTheme}
                  pageType={pageType}
                  setTaskData={setTaskData}
                />
              );
            })
          )}

          {completedTasks.length > 0 && (
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            >
              <button
                onClick={() => setShowCompleted((prev) => !prev)}
                className={`bg-neutral-800 flex items-center justify-center gap-1.5 w-fit px-2.5 text-sm font-medium mt-3 mb-0.5 text-${colorTheme}-300 py-1.5 rounded-xl`}
              >
                {showCompleted ? <IoIosArrowDown /> : <IoIosArrowUp />}
                <span>Completed {`(${completedTasks.length})`}</span>
              </button>
            </motion.div>
          )}

          {isLoading ? (
            <LoadingCard />
          ) : (
            showCompleted &&
            completedTasks.map((task: Task) => {
              return (
                <TaskCard
                  colorTheme={colorTheme}
                  task={task}
                  key={task.id}
                  pageType={pageType}
                  setTaskData={setTaskData}
                />
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskList;
