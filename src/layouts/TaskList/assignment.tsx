import LoadingCard from "@/src/components/task/loadingCard";
import TaskCard, { ColorTheme } from "@/src/components/task/taskCard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useState } from "react";
import { Task } from "@/src/app/page";
import { cn } from "@/src/lib/utils";

export type PageType =
  | "today"
  | "default"
  | "important"
  | "tasks"
  | "assignment"
  | "search";

const AssignmentTaskList = ({
  setTaskData,
  isLoading,
  taskData,
  colorTheme,
  pageType,
  userId,
}: {
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  isLoading: boolean;
  taskData: Task[];
  colorTheme: ColorTheme;
  pageType: PageType;
  userId: string;
}) => {
  const [showAssignedByUser, setShowAssignedByUser] = useState(true);

  //   const completedTasks = Array.isArray(taskData)
  //     ? taskData.filter((task) => task.completed)
  //     : [];

  //   const notCompletedTasks = Array.isArray(taskData)
  //     ? taskData.filter((task) => !task.completed)
  //     : [];

  const taskAssignedToMe = Array.isArray(taskData)
    ? taskData.filter((task) => task.assigneeId === userId)
    : [];

  const taskAssignedByUser = Array.isArray(taskData)
    ? taskData.filter((task) => task.creatorId === userId)
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
                {taskAssignedToMe.map((task: Task) => (
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

            {/* {completedTasks.length > 0 && (
              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              >
                <button
                  onClick={() => setShowCompleted((prev) => !prev)}
                  className={cn(
                    "bg-neutral-800 flex items-center justify-center gap-1.5 w-fit px-2.5 text-sm font-medium mt-3 mb-0.5 py-1.5 rounded-xl",
                    `text-${colorTheme}-300`
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
            )} */}

            {!isLoading && pageType === "assignment" && (
              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              >
                <button
                  onClick={() => setShowAssignedByUser((prev) => !prev)}
                  className={
                    "bg-neutral-800 flex items-center justify-center gap-1.5 w-fit px-2.5 text-sm font-medium mt-3 mb-0.5 py-1.5 rounded-xl text-green-200"
                  }
                >
                  {showAssignedByUser ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  <span>
                    Tasks Assigned by You {`(${taskAssignedByUser.length})`}
                  </span>
                </button>
              </motion.div>
            )}

            {isLoading ? (
              <LoadingCard />
            ) : (
              showAssignedByUser && (
                // AnimatePresence for tasks
                <AnimatePresence>
                  {taskAssignedByUser.map((task: Task) => (
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
              )
            )}
          </div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default AssignmentTaskList;
