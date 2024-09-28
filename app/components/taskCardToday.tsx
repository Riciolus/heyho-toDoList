import { Task } from "@/app/page";
import TaskProperties from "./taskProperties";
import { ContextMenu, ContextMenuTrigger } from "./shadcn/context-menu";
import { updateCompleted, updateTaskImportance } from "../lib/api";
import Checkbox from "./checkbox";
import { colorClasses } from "./taskCard";
import ImportantButton from "./completeButton";

type GroupNameMap = {
  [key: string]: string;
};

const groupNameMap: GroupNameMap = {
  tasks: "Tasks",
  assgn: "Assigned To Me",
};

const TaskCardToday = ({
  task,
  setTaskData,
}: {
  task: Task;
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const handleImportance = async (
    taskId: string,
    toImportantStatus: boolean
  ) => {
    setTaskData((prevData) =>
      prevData.map((task) =>
        task.id === taskId ? { ...task, important: toImportantStatus } : task
      )
    );
    const data = { taskId, toImportantStatus };
    await updateTaskImportance(data);
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
      <ContextMenuTrigger className="bg-neutral-800 hover:bg-onhover tablet:py-2 py-3.5 px-5 rounded-lg w-full">
        <div className="flex justify-between items-center">
          {/* left side wrapper */}
          <div className="flex gap-1.5 items-center">
            <Checkbox
              taskId={task.id}
              taskCompleted={task.completed}
              handleCheckbox={handleCheckbox}
              colorClasses={colorClasses}
              colorTheme="orange"
            />

            <label
              className="cursor-pointer ml-2  text-sm"
              htmlFor="check-with-description"
            >
              <div>
                <p
                  className={`${
                    task.completed && "text-neutral-400 line-through"
                  } font-normal`}
                >
                  {task.task}
                </p>
                <p
                  className={`${
                    task.completed ? "text-neutral-500" : "text-gray-300"
                  }`}
                >
                  {groupNameMap[task.groupId]}
                </p>
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
      <TaskProperties taskId={task.id} setTaskData={setTaskData} />
    </ContextMenu>
  );
};

export default TaskCardToday;
