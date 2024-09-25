import { useState } from "react";
import TodayBadge from "./todayBadge";
import { Task } from "@/app/page";
import { FaRegStar, FaStar } from "react-icons/fa";

import TaskProperties from "./taskProperties";
import { ContextMenu, ContextMenuTrigger } from "./shadcn/context-menu";
import { updateCompleted, updateTaskImportance } from "../lib/api";

type ColorTheme = "blue" | "pink" | "green";

type Propstype = {
  task: Task;
  triggerRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  colorTheme: ColorTheme;
};

type ColorClasses = {
  [key in ColorTheme]: string;
};

const colorClasses: ColorClasses = {
  blue: "checked:bg-blue-400",
  pink: "checked:bg-pink-300",
  green: "checked:bg-green-400",
};

const TaskCard = ({
  task,
  triggerRefetch,
  colorTheme,
  setTaskData,
}: Propstype) => {
  const [isImportant, setIsImportant] = useState(task.important);
  const [isChecked, setChecked] = useState<boolean>(task.completed);

  const handleImportance = async (
    taskId: string,
    toImportantStatus: boolean
  ) => {
    setIsImportant(toImportantStatus);

    if (colorTheme === "pink") {
      setTaskData((prevData) => prevData.filter((task) => task.id !== taskId));
    }
    await updateTaskImportance({ taskId, toImportantStatus });
  };

  const handleCheckbox = async (taskId: string, toCompletedStatus: boolean) => {
    await updateCompleted({ taskId, toCompletedStatus }).then((result) => {
      setChecked(result);
      triggerRefetch(true);
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="bg-neutral-800 hover:bg-onhover tablet:py-2 py-3.5 tablet:px-5 px-3 rounded-lg">
        <div className="flex justify-between items-center">
          {/* Left Side Wrapper */}
          <div className="flex gap-1 tablet:gap-1.5 items-center">
            <label
              className="flex items-start cursor-pointer relative"
              htmlFor={task.id}
            >
              <input
                onChange={(e) => handleCheckbox(task.id, e.target.checked)}
                checked={isChecked}
                type="checkbox"
                className={`peer h-5 w-5   tablet:h-4 tablet:w-4 cursor-pointer transition-all appearance-none shadow hover:shadow-md border border-slate-400 ${colorClasses[colorTheme]} checked:border-onhover rounded-full`}
                id={task.id}
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              className="cursor-pointer ml-2  text-sm"
              htmlFor="check-with-description"
            >
              <div>
                <p
                  className={`${
                    isChecked && "text-neutral-400 line-through"
                  } font-normal`}
                >
                  {task.task}
                </p>
                <TodayBadge createdAt={task.created_at} isChecked={isChecked} />
              </div>
            </label>
          </div>

          {/* Right side wrapper */}
          <div>
            <button
              className={`${
                isChecked ? "cursor-not-allowed" : "active:animate-ping "
              } `}
            >
              {isImportant ? (
                <FaStar
                  onClick={() => {
                    if (!isChecked) {
                      handleImportance(task.id, false);
                    }
                  }}
                  className={`${
                    isChecked ? "fill-neutral-400" : "fill-pink-300"
                  } tablet:w-4 tablet:h-4 w-5 h-5`}
                />
              ) : (
                <FaRegStar
                  onClick={() => {
                    if (!isChecked) {
                      handleImportance(task.id, true);
                    }
                  }}
                  className={`${
                    isChecked && "fill-neutral-400"
                  } tablet:w-4 tablet:h-4 w-5 h-5`}
                />
              )}
            </button>
          </div>
        </div>
      </ContextMenuTrigger>
      <TaskProperties setTaskData={setTaskData} taskId={task.id} />
    </ContextMenu>
  );
};

export default TaskCard;
