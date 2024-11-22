import { deleteTask } from "@/src/lib/api";
import { Group, Task } from "@/src/app/page";
import { ContextMenuContent, ContextMenuItem } from "../ui/context-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "./datepicker";
import { FormEvent } from "react";

type Propstype = {
  task: Task;
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  userGroups: Group[];
};

const Edit = ({ task, userGroups }: { task: Task; userGroups: Group[] }) => {
  const handleUpdateTask = (e: FormEvent) => {
    e.preventDefault();

    console.log("submit");
    console.log(e.target);
  };

  return (
    <form onSubmit={handleUpdateTask}>
      <Sheet>
        <SheetTrigger className="w-full">
          <ContextMenuItem
            onSelect={(event) => {
              event.preventDefault(); // Prevents menu from closing
            }}
          >
            Edit
          </ContextMenuItem>
        </SheetTrigger>
        <SheetContent className="bg-neutral-950 w-full tablet:w-1/2 laptop:w-1/4 border-line">
          <SheetHeader>
            <SheetTitle className="text-neutral-50">Edit Task</SheetTitle>
            <SheetDescription>
              Make changes to your task. Click save when youre done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task
              </Label>
              <Input
                id="name"
                defaultValue={task.task}
                className="col-span-3 border-line bg-neutral-800 h-9"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Due Date
              </Label>
              <DatePicker type="long" taskDate={task.due_date} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Groups
              </Label>
              <Select>
                <SelectTrigger className="w-[130px] bg-neutral-800 border-line h-8">
                  <SelectValue
                    placeholder={
                      userGroups.find((group) => group.label === task.groupId)
                        ?.title || "Tasks"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 text-neutral-50 border-line">
                  <SelectItem value="tasks" className="">
                    Tasks
                  </SelectItem>
                  {userGroups?.map((group) => {
                    return (
                      <SelectItem value={group.title} key={group.label}>
                        {group.title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </form>
  );
};

const TaskProperties = ({ setTaskData, task, userGroups }: Propstype) => {
  const handleDeleteTask = async () => {
    setTaskData((prevData) =>
      prevData.filter((filteredTask) => filteredTask.id !== task.id)
    );
    toast("Task Deleted!");
    await deleteTask(task.id);
  };

  return (
    <ContextMenuContent>
      <Edit task={task} userGroups={userGroups} />

      <ContextMenuItem onClick={handleDeleteTask}>Delete</ContextMenuItem>
      <ContextMenuItem>Change Date</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default TaskProperties;
