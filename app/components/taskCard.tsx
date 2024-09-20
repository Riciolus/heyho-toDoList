import { useState } from "react";
import TodayBadge from "./todayBadge";
import { Task } from "@/app/page";
import { FaRegStar, FaStar } from "react-icons/fa";

import TaskProperties from "./taskProperties";
import { ContextMenu, ContextMenuTrigger } from "./shadcn/context-menu";
import { updateTaskImportance } from "../lib/api";

type Propstype = {
  task: Task;
  triggerRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskCard = ({ task, triggerRefetch }: Propstype) => {
  const [isImportant, setIsImportant] = useState(task.important);

  const handleImportance = async (
    taskId: string,
    toImportantStatus: boolean
  ) => {
    const data = { taskId, toImportantStatus };
    setIsImportant(toImportantStatus);
    await updateTaskImportance(data).then(() => {
      if (triggerRefetch) {
        triggerRefetch(true);
      }
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="bg-neutral-800 hover:bg-onhover py-2 px-5 rounded-lg">
        <div className="flex justify-between items-center">
          {/* left side wrapper */}
          <div className="flex gap-1.5 items-center">
            <label
              className="flex items-start cursor-pointer relative"
              htmlFor={task.id}
            >
              <input
                type="checkbox"
                className="peer  h-4 w-4 cursor-pointer transition-all appearance-none shadow hover:shadow-md border border-slate-400 checked:bg-blue-400 checked:border-onhover rounded-full"
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
                <p className="font-medium">{task.task}</p>
                <TodayBadge createdAt={task.created_at} />
              </div>
            </label>
          </div>

          {/* Right side wrapper */}
          <div>
            <button className="active:animate-ping">
              {isImportant ? (
                <FaStar
                  onClick={() => handleImportance(task.id, false)}
                  className="fill-pink-300"
                />
              ) : (
                <FaRegStar onClick={() => handleImportance(task.id, true)} />
              )}
            </button>
          </div>
        </div>
      </ContextMenuTrigger>
      <TaskProperties triggerRefetch={triggerRefetch} taskId={task.id} />
    </ContextMenu>
  );
};

export default TaskCard;
