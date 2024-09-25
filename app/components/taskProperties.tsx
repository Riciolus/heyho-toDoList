import { deleteTask } from "../lib/api";
import { Task } from "../page";
import { ContextMenuContent, ContextMenuItem } from "./shadcn/context-menu";

type Propstype = {
  taskId: string;
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskProperties = ({ setTaskData, taskId }: Propstype) => {
  const handleDeleteTask = async () => {
    await deleteTask(taskId);
    setTaskData((prevData) => prevData.filter((task) => task.id !== taskId));
  };

  return (
    <ContextMenuContent>
      <ContextMenuItem>Edit</ContextMenuItem>
      <ContextMenuItem onClick={handleDeleteTask}>Delete</ContextMenuItem>
      <ContextMenuItem>Change Date</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default TaskProperties;
