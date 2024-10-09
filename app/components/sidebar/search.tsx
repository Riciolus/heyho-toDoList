import { searchTasks } from "@/app/lib/api";
import { Task } from "@/app/page";
// import { Task } from "@/app/page";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchBarSection = ({
  setSearchedTaskData,
  handleChangeContent,
}: {
  setSearchedTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
  handleChangeContent: (pageId: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleChangeContent("search");

      if (searchQuery.length === 0) {
        setSearchedTaskData([]);
      }

      if (searchQuery.trim()) {
        searchTasks(searchQuery).then((result) =>
          setSearchedTaskData(result.data)
        );
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery, handleChangeContent, setSearchedTaskData]);

  return (
    <div className="relative mb-2 flex laptop:w-[62%] w-[90%] mt-1">
      <input
        id="search"
        onChange={(event) => setSearchQuery(event.target.value)}
        type="text"
        placeholder="Search Tasks"
        className="bg-[#2c2c2c] w-full px-2 py-1.5 rounded-lg border-b-2 border-line placeholder-gray-400 outline-none transition-all focus:border-green-300 focus:border-b-4"
      />
      <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
        <BiSearchAlt size={19} className="fill-gray-400" />
      </div>
    </div>
  );
};

export default SearchBarSection;
