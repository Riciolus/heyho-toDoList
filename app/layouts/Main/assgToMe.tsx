// import { Task } from "@/app/page";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
// import LoadingCard from "@/components/ui/loadingCard";
// import TaskCard from "@/components/ui/taskCard";
// import AddTaskButton from "@/components/ui/addTask";

const AssignedToMeContent = () => {
  // const [taskData, setTaskData] = useState<Task[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/tasks/2/cm0w6tuj3000010i7z2ppri91`)
  //     .then((result) => {
  //       setTaskData(result.data.data);
  //       setIsLoading(false);
  //     });
  // }, []);
  return (
    <div className="text-base">
      {/* Title Bar */}
      <div className="flex justify-between items-center ">
        <div className="text-green-200">
          <h1 className="flex gap-2 items-center text-3xl font-semibold underline underline-offset-4 ">
            <FaUserAstronaut />
            <span>Assigned To Me</span>
          </h1>
        </div>
        <div className="bg-onhover hover:bg-[#3f3f3f] p-1.5 rounded-lg">
          <GoKebabHorizontal />
        </div>
      </div>
      {/* Tasks Lists */}
      underConstruction
      {/* px-1 tablet:px-0 */}
      {/* <div className="flex flex-col gap-1.5 mt-5">
        {isLoading ? (
          <LoadingCard />
        ) : (
          taskData.map((task: Task, index: number) => {
            return <TaskCard task={task} key={index} />;
          })
        )}
      </div> */}
      {/* Add Task */}
      {/* <AddTaskButton groupId={2} /> */}
    </div>
  );
};

export default AssignedToMeContent;
