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
import useSpeechToText from "../lib/useSpeechToText";
import { MdKeyboardVoice } from "react-icons/md";

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

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    setTranscript,
  } = useSpeechToText({ continuous: true });

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    stopListening();
    console.log(transcript);
  };

  const handleAddTask = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setIsLoading((prev) => prev);
      const form = event.target as HTMLFormElement;

      const formattedDate = () => {
        if (form.date?.innerText) {
          if (form.date.innerText === "Pick a date") return new Date();
          return new Date(form.date.innerText);
        } else {
          return new Date();
        }
      };

      if (transcript.length === 0) {
        return null;
      }

      const data = {
        task: transcript,
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
            setTranscript("");
            return toast("New task added successfully!");
          }

          toast(result.message || "An error occured.");
        })
        .finally(() => setIsLoading(() => false));
    },
    [groupId, pageType, setTaskData, assignTo, setTranscript, transcript]
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
          placeholder="Add A Task"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
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

        {/* Speech to text button */}
        <button
          type="button"
          onClick={() => {
            startStopListening();
          }}
          className={cn(
            "ml-1 bg-neutral-800 py-2 px-1.5 rounded-lg transition-colors",
            isListening && "bg-neutral-700"
          )}
        >
          <MdKeyboardVoice size={20} />
        </button>
      </form>
    </div>
  );
};

export default AddTaskButton;
