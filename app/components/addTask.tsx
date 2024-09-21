import { FiPlus } from "react-icons/fi";
import { handleAddTask } from "../lib/utils";

export interface Propstype {
  groupId: number;
  colorTheme: string;
  triggerRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskButton = ({ groupId, triggerRefetch, colorTheme }: Propstype) => {
  // const groupColorTheme = groupColorThemeChecker(groupId);

  return (
    <div className="fixed noFit:w-[40%] tablet:w-[55%] laptop:w-[38%] desktop:w-[39.5%] w-[90%] bottom-10">
      <form
        onSubmit={(event) => handleAddTask({ event, groupId, triggerRefetch })}
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
