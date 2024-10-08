import { createNewGroup } from "@/app/lib/api";
import { Group } from "@/app/page";
import { LuFolders } from "react-icons/lu";
import { toast } from "sonner";

type Propstype = {
  setSidebarGroup: React.Dispatch<React.SetStateAction<Group[]>>;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
};

const AddNewGroup = ({
  setSidebarGroup,
  setActivePage,
  activePage,
}: Propstype) => {
  // Add New Group
  const handleNewGroup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const inputValue = form.inputGroup.value;

    if (inputValue.length === 0) {
      return toast("Please input the task name!");
    }

    createNewGroup(inputValue).then((newGroupData: Group) => {
      setSidebarGroup((prevSidebarGroup) => [
        ...prevSidebarGroup,
        newGroupData,
      ]);

      localStorage.setItem(
        "active-page",
        JSON.stringify({ current: newGroupData.label, previous: activePage })
      );
      setActivePage(newGroupData.label);
      toast(`Sucessfuly creating ${newGroupData.title} group!`);
    });

    form.inputGroup.value = "";
  };
  return (
    <div>
      <form
        onSubmit={handleNewGroup}
        className="flex items-center ps-2 noFit:ps-0 h-9 hover:ps-0  relative  rounded-lg transition-colors gap-3 cursor-pointer w-[90%]  mt-2 noFit:w-[100%]"
      >
        <button type="submit" className="absolute">
          <LuFolders size={23} className="p-0.5 noFit:p-0" />
        </button>
        <input
          id="inputGroup"
          placeholder="New List"
          className="bg-transparent w-full mx-1 noFit:hover:ps-3 h-full px-3 noFit:mr-4 hover:px-1.5 hover:bg-onhover pl-8    hover:scale-[1.03] hover:text-sm transition-all rounded-lg placeholder-neutral-50 outline-none font-normal text-sm"
        ></input>
      </form>
    </div>
  );
};

export default AddNewGroup;
