import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { deleteTask } from "./api";

type handleDeleteTask = {
  taskId: string;
  triggerRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if users make a task in important page. it's automatically make the new task to important
export function addImportantTask(groupId: number) {
  if (groupId === 1) {
    return true;
  } else {
    return false;
  }
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

export function groupColorThemeChecker(groupId: number) {
  switch (groupId) {
    case 0:
      return "orange";
    case 1:
      return "pink";
    case 2:
      return "green";
    case 3:
      return "blue";
  }

  // 0 = today, 1 = important, 2 = green, 3 =
}
