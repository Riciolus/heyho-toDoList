import Dropdown from "@/src/components/task/dropdown";
import { TbSubtask } from "react-icons/tb";
import AddTaskButton from "@/src/components/addTask";
import { useEffect, useState } from "react";
import { getAssignedTask } from "@/src/lib/api";
import { Group, Task } from "@/src/app/page";
import ZeroTask from "@/src/components/task/0task";
import { toast } from "sonner";
import AssignmentTaskList from "../TaskList/assignment";

const AssignedToMeContent = ({ userGroups }: { userGroups: Group[] }) => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getAssignedTask()
      .then((result) => {
        if (result?.data?.data) {
          setTaskData(result.data.data);
          setUserId(result.data.userId);
        } else {
          toast("Server busy, Please try again later.");
          setTaskData([]); // Handle cases where data is missing
        }
      })
      .finally(() => {
        setIsLoading(false); // End loading state
      });
  }, []);

  return (
    <div className="text-base h-full">
      {/* Title Bar */}
      <div className="flex justify-between items-center mb-5">
        <div className="text-green-200">
          <h1 className="flex gap-2 items-center text-3xl font-semibold underline underline-offset-4 ">
            <TbSubtask />
            <span>Assinged To Me</span>
          </h1>
        </div>
        <Dropdown />
      </div>

      {/* Tasks Lists */}

      {!isLoading && taskData.length === 0 ? (
        <ZeroTask pageType="assignment" />
      ) : (
        <AssignmentTaskList
          userGroups={userGroups}
          isLoading={isLoading}
          taskData={taskData}
          setTaskData={setTaskData}
          pageType="assignment"
          colorTheme="green"
          userId={userId}
        />
      )}

      {/* Add Task */}
      <AddTaskButton
        colorTheme="green"
        groupId="tasks"
        pageType="assignment"
        setTaskData={setTaskData}
      />
    </div>
  );
};

export default AssignedToMeContent;
