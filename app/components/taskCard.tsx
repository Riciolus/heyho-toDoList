import TodayBadge from "./todayBadge";
import { Task } from "@/app/page";
import TaskProperties from "./taskProperties";
import { ContextMenu, ContextMenuTrigger } from "./shadcn/context-menu";
import { updateCompleted, updateTaskImportance } from "../lib/api";
import Checkbox from "./checkbox";
import ImportantButton from "./completeButton";
import { CardType } from "../layouts/TaskList";

export type ColorTheme = "blue" | "pink" | "green" | "orange";

type Propstype = {
  task: Task;
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  colorTheme: ColorTheme;
  cardType: CardType;
};

type GroupNameMap = {
  [key: string]: string;
};

export type ColorClasses = {
  [key in ColorTheme]: string;
};

export const colorClasses: ColorClasses = {
  blue: "checked:bg-blue-400",
  pink: "checked:bg-pink-300",
  green: "checked:bg-green-400",
  orange: "checked:bg-orange-400",
};

const groupNameMap: GroupNameMap = {
  tasks: "Tasks",
  assgn: "Assigned To Me",
};

const TaskCard = ({ task, colorTheme, setTaskData, cardType }: Propstype) => {
  const handleImportance = async (
    taskId: string,
    toImportantStatus: boolean
  ) => {
    if (colorTheme === "pink") {
      setTaskData((prevData) => prevData.filter((task) => task.id !== taskId));
    } else {
      setTaskData((prevData) =>
        prevData.map((task) =>
          task.id === taskId ? { ...task, important: toImportantStatus } : task
        )
      );
    }
    await updateTaskImportance({ taskId, toImportantStatus });
  };

  const handleCheckbox = async (status: boolean) => {
    setTaskData((prevData) =>
      prevData.map((oldTask) =>
        oldTask.id === task.id ? { ...oldTask, completed: status } : oldTask
      )
    );
    const data = {
      taskId: task.id,
      toCompletedStatus: status,
    };
    await updateCompleted(data);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="bg-neutral-800 hover:bg-onhover tablet:py-2 py-3.5 tablet:px-5 px-3 rounded-lg">
        <div className="flex justify-between items-center">
          {/* Left Side Wrapper */}
          <div className="flex gap-1 tablet:gap-1.5 items-center">
            <Checkbox
              taskId={task.id}
              taskCompleted={task.completed}
              handleCheckbox={handleCheckbox}
              colorClasses={colorClasses}
              colorTheme={colorTheme}
            />
            <label className="cursor-pointer ml-2 text-sm">
              <div>
                <p
                  className={`${
                    task.completed && "text-neutral-400 line-through"
                  } font-normal`}
                >
                  {task.task}
                </p>

                {cardType === "today" ? (
                  <p
                    className={`${
                      task.completed ? "text-neutral-500" : "text-gray-300"
                    }`}
                  >
                    {groupNameMap[task.groupId]}
                  </p>
                ) : (
                  <TodayBadge
                    createdAt={task.created_at}
                    isCompleted={task.completed}
                  />
                )}
              </div>
            </label>
          </div>

          {/* Right side wrapper */}
          <div>
            <ImportantButton
              taskId={task.id}
              isCompleted={task.completed}
              isImportant={task.important}
              handleImportance={handleImportance}
            />
          </div>
        </div>
      </ContextMenuTrigger>
      <TaskProperties setTaskData={setTaskData} taskId={task.id} />
    </ContextMenu>
  );
};

export default TaskCard;
