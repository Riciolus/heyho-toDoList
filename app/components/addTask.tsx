import { FiPlus } from "react-icons/fi";
import { addNewTask } from "../lib/api";
import { addImportantTask } from "../lib/utils";
import { Task } from "../page";
import { ColorTheme } from "./taskCard";

export interface Propstype {
  groupId: number;
  colorTheme: ColorTheme;
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddTaskButton = ({ groupId, colorTheme, setTaskData }: Propstype) => {
  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
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

    await addNewTask(data).then((result) => {
      setTaskData((prevData) => [...prevData, result]);
    });

    form.inputTask.value = "";
  };

  return (
    <div className="fixed noFit:w-[40%] tablet:w-[55%] laptop:w-[38%] desktop:w-[39.5%] w-[90%] bottom-10">
      <form
        onSubmit={(event) => handleAddTask(event)}
        className="w-full flex items-center"
      >
        <button type="submit" className="absolute ml-2">
          <FiPlus className={`text-${colorTheme}-300`} size={24} />
        </button>
        <input
          placeholder="Add A Tasks"
          id="inputTask"
          className={`font-medium outline-none w-full py-5 px-3 place-self-center bg-onhover hover:bg-onhover focus:bg-onhover rounded-xl pl-9`}
        />
      </form>
    </div>
  );
};

export default AddTaskButton;
