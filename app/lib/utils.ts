import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if users make a task in important page. it's automatically make the new task to important
export function addImportantTask(isImportantCardType: string) {
  if (isImportantCardType === "important") {
    return true;
  } else {
    return false;
  }
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

  // 0 = today, 1 = important, 2 = assigned to me, 3 = taks
}
