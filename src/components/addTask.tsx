import { FiPlus } from "react-icons/fi";
import { addImportantTask, cn } from "../lib/utils";
import { Task } from "../app/page";
import { ColorTheme } from "./task/taskCard";
import { PageType } from "../layouts/TaskList";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { DatePicker } from "./task/datepicker";
import { addNewTask } from "../lib/api";
import AssignToButton from "./task/assignToTask";

export interface Propstype {
  groupId: string;
  colorTheme: ColorTheme;
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  pageType: PageType;
}

const AddTaskButton = ({
  groupId,
  pageType = "default",
  colorTheme,
  setTaskData,
}: Propstype) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assignTo, setAssignTo] = useState("");

  const handleAddTask = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setIsLoading((prev) => prev);

      const form = event.target as HTMLFormElement;
      const inputValue = form.inputTask.value;

      const formattedDate = () => {
        if (form.date?.innerText) {
          if (form.date.innerText === "Pick a date") return new Date();
          return new Date(form.date.innerText);
        } else {
          return new Date();
        }
      };

      if (inputValue.length === 0) {
        return null;
      }

      const data = {
        task: inputValue,
        groupId,
        important: addImportantTask(pageType),
        due_date: formattedDate(),
        assignTo,
        method: pageType,
      };

      addNewTask(data)
        .then((result) => {
          if (result.status) {
            setTaskData((prevData) => [...prevData, result.data]);
            form.inputTask.value = "";
            return toast("New task added successfully!");
          }

          toast(result.message || "An error occured.");
        })
        .finally(() => setIsLoading(() => false));
    },
    [groupId, pageType, setTaskData, assignTo]
  );

  return (
    <div className="absolute noFit:w-[40%] tablet:w-[55%] laptop:w-[38%]  desktop:w-[39.5%] w-[90%] rounded-xl  bg-onhover bottom-16 noFit:bottom-11">
      <form
        onSubmit={(event) => handleAddTask(event)}
        className="relative w-full flex items-center px-2"
      >
        <button
          aria-label="Add New Task"
          type="submit"
          className="absolute ml-2"
        >
          <FiPlus className={cn(`text-${colorTheme}-300`)} size={24} />
        </button>
        <input
          disabled={isLoading}
          placeholder="Add A Tasks"
          id="inputTask"
          autoComplete="off"
          className={`font-medium outline-none w-full py-5 px-3 place-self-center  bg-transparent  pl-9`}
        />
        {/* Assign To Button */}
        {pageType === "assignment" && (
          <AssignToButton setAssignTo={setAssignTo} assignTo={assignTo} />
        )}

        {/* Date Picker Button */}
        {pageType !== "today" && (
          <div>
            {pageType === "assignment"}
            <DatePicker />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTaskButton;
