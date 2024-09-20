import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addNewTask, deleteTask } from "./api";

type AddNewTask = {
  event: React.FormEvent<HTMLFormElement>;
  groupId: number;
  triggerRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

type handleDeleteTask = {
  taskId: string;
  triggerRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if users make a task in important page. it's automatically make the new task to important
function addImportantTask(groupId: number) {
  if (groupId === 1) {
    return true;
  } else {
    return false;
  }
}

export async function handleAddTask({
  event,
  groupId,
  triggerRefetch,
}: AddNewTask) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const inputValue = form.inputTask.value;

  if (inputValue.length === 0) {
    return null;
  }

  const data = {
    task: inputValue,
    groupId: "tasks",
    important: addImportantTask(groupId),
  };

  await addNewTask(data).then((status) => {
    if (status) {
      triggerRefetch(true);
    }
    form.inputTask.value = "";
  });
}

export async function handleDeleteTask({
  taskId,
  triggerRefetch,
}: handleDeleteTask) {
  await deleteTask(taskId).then((status) => {
    if (status) {
      triggerRefetch(true);
    }
  });
}

export function groupChecker(groupId: number) {
  switch (groupId) {
    case 0:
      return "-orange-300";
    case 1:
      return "-pink-300";
    case 2:
      return "-green-200";
    case 3:
      return "-blue-300";
  }
}
