import { FiPlus } from "react-icons/fi";
import { addImportantTask, cn } from "../lib/utils";
import { Task } from "../app/page";
import { ColorTheme } from "./task/taskCard";
import { PageType } from "../layouts/TaskList";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { DatePicker } from "./task/datepicker";
import { addNewTask } from "../lib/api";

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

  const handleAddTask = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);

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
      };

      addNewTask(data)
        .then((result) => {
          setTaskData((prevData) => [...prevData, result]);
          toast("New task added successfully!");
        })
        .finally(() => setIsLoading((prev) => !prev));

      form.inputTask.value = "";
    },
    [groupId, pageType, setTaskData]
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
          className={`font-medium outline-none w-full py-5 px-3 place-self-center  bg-transparent  pl-9`}
        />
        {pageType !== "today" && (
          <div className="">
            <DatePicker />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTaskButton;
