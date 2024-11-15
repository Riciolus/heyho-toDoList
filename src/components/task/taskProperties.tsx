import { deleteTask } from "@/src/lib/api";
import { Task } from "../../app/page";
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

type Propstype = {
  taskId: string;
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskProperties = ({ setTaskData, taskId }: Propstype) => {
  const handleDeleteTask = async () => {
    setTaskData((prevData) => prevData.filter((task) => task.id !== taskId));
    toast("Task Deleted!");
    await deleteTask(taskId);
  };

  return (
    <ContextMenuContent>
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
        <SheetContent className="bg-neutral-950 w-1/4 border-line">
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
                value="Pedro Duarte"
                className="col-span-3 border-line bg-neutral-800 h-9"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Due Date
              </Label>
              <DatePicker type="long" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Groups
              </Label>
              <Select>
                <SelectTrigger className="w-[130px] bg-neutral-800 border-line h-8">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
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

      <ContextMenuItem onClick={handleDeleteTask}>Delete</ContextMenuItem>
      <ContextMenuItem>Change Date</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default TaskProperties;
