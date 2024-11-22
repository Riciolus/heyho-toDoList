import ZeroTask from "@/src/components/task/0task";
import TaskList from "../TaskList";
import { useEffect, useState } from "react";
import { Group, Task } from "@/src/app/page";

const SearchContent = ({
  searchedTaskData,
  userGroups,
}: {
  searchedTaskData: Task[];
  userGroups: Group[];
}) => {
  const [taskData, setTaskData] = useState<Task[]>([]);

  useEffect(() => {
    setTaskData(searchedTaskData);
  }, [searchedTaskData]);

  return (
    <div className="text-base h-full">
      {/* Title Bar */}

      {/* Tasks Lists */}
      <div className="mt-16">
        {taskData.length === 0 ? (
          <ZeroTask pageType="search" />
        ) : (
          <TaskList
            userGroups={userGroups}
            colorTheme="purple"
            isLoading={false}
            taskData={taskData}
            pageType="default"
            setTaskData={setTaskData}
          />
        )}
      </div>
    </div>
  );
};

export default SearchContent;
