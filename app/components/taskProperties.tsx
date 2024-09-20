import { handleDeleteTask } from "../lib/utils";
import { ContextMenuContent, ContextMenuItem } from "./shadcn/context-menu";

type Propstype = {
  taskId: string;
  triggerRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskProperties = ({ triggerRefetch, taskId }: Propstype) => {
  return (
    <ContextMenuContent>
      <ContextMenuItem>Edit</ContextMenuItem>
      <ContextMenuItem
        onClick={() => handleDeleteTask({ taskId, triggerRefetch })}
      >
        Delete
      </ContextMenuItem>
      <ContextMenuItem>Change Date</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default TaskProperties;
