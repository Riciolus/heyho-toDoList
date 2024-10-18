import LoadingCard from "@/app/components/task/loadingCard";
import TaskCard, { ColorTheme } from "@/app/components/task/taskCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "@/app/components/shadcn/scroll-area";
import { useState } from "react";
import { Task } from "@/app/page";
import { cn } from "@/app/lib/utils";

export type PageType =
  | "today"
  | "default"
  | "important"
  | "tasks"
  | "assignment"
  | "search";

const TaskList = ({
  setTaskData,
  isLoading,
  taskData,
  colorTheme,
  pageType,
}: {
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  isLoading: boolean;
  taskData: Task[];
  colorTheme: ColorTheme;
  pageType: PageType;
}) => {
  const [showCompleted, setShowCompleted] = useState(true);

  const textColorTheme = `text-${colorTheme}-300`;

  const completedTasks = Array.isArray(taskData)
    ? taskData.filter((task) => task.completed)
    : [];

  const notCompletedTasks = Array.isArray(taskData)
    ? taskData.filter((task) => !task.completed)
    : [];

  return (
    <div className="flex flex-col items-center px-1 tablet:px-0">
      <ScrollArea className="w-full">
        <AnimatePresence>
          <div
            className={cn(
              "flex flex-col gap-1.5 w-[98%]",
              pageType === "today" ? "h-[31.5rem]" : "h-[34rem]"
            )}
          >
            {isLoading ? (
              <LoadingCard />
            ) : (
              // AnimatePresence for tasks
              <AnimatePresence>
                {notCompletedTasks.map((task: Task) => (
                  <motion.div
                    key={task.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                  >
                    <TaskCard
                      task={task}
                      colorTheme={colorTheme}
                      pageType={pageType}
                      setTaskData={setTaskData}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {completedTasks.length > 0 && (
              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              >
                <button
                  onClick={() => setShowCompleted((prev) => !prev)}
                  className={cn(
                    "bg-neutral-800 flex items-center justify-center gap-1.5 w-fit px-2.5 text-sm font-medium mt-3 mb-0.5 py-1.5 rounded-xl",
                    textColorTheme
                  )}
                >
                  {showCompleted ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  <span>Completed {`(${completedTasks.length})`}</span>
                </button>
              </motion.div>
            )}

            {isLoading ? (
              <LoadingCard />
            ) : (
              showCompleted && (
                <AnimatePresence>
                  {completedTasks.map((task: Task) => (
                    <motion.div
                      key={task.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ ease: "easeOut", duration: 0.3 }}
                    >
                      <TaskCard
                        colorTheme={colorTheme}
                        task={task}
                        pageType={pageType}
                        setTaskData={setTaskData}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )
            )}
          </div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default TaskList;
