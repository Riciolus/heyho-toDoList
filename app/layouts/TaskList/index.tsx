import LoadingCard from "@/app/components/loadingCard";
import { ScrollArea } from "@/app/components/shadcn/scroll-area";
import TaskCard, { ColorTheme } from "@/app/components/taskCard";
import { Task } from "@/app/page";
import clsx from "clsx";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export type CardType = "today" | "default";

const TaskList = ({
  isLoading,
  taskData,
  setTaskData,
  colorTheme,
  cardType,
}: {
  isLoading: boolean;
  taskData: Task[];
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  colorTheme: ColorTheme;
  cardType: CardType;
}) => {
  const [showCompleted, setShowCompleted] = useState(true);

  const completedTasks = taskData.filter((task) => task.completed);
  const notCompletedTasks = taskData.filter((task) => !task.completed);
  return (
    <div className="flex flex-col items-center px-1 tablet:px-0">
      <ScrollArea className="w-full">
        <div
          className={clsx(
            "flex flex-col gap-1.5 w-[98%]",
            cardType === "today" ? "h-[31.5rem]" : "h-[34rem]"
          )}
        >
          {isLoading ? (
            <LoadingCard />
          ) : (
            notCompletedTasks.map((task: Task) => {
              return (
                <TaskCard
                  task={task}
                  key={task.id}
                  colorTheme={colorTheme}
                  cardType={cardType}
                  setTaskData={setTaskData}
                />
              );
            })
          )}

          {completedTasks.length > 0 && (
            <button
              onClick={() => setShowCompleted((prev) => !prev)}
              className={`bg-neutral-800 flex items-center justify-center gap-1.5 w-fit px-2.5 text-sm font-medium mt-3 mb-0.5 text-${colorTheme}-300 py-1.5 rounded-xl`}
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
                  colorTheme={colorTheme}
                  task={task}
                  key={task.id}
                  cardType={cardType}
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

// flex flex-col justify-between h-fit mt-5 w-full items-center px-1 tablet:px-0
