import { GoKebabHorizontal } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-onhover hover:bg-[#3f3f3f] p-1.5 rounded-lg">
          <GoKebabHorizontal />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Task Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sort By</DropdownMenuItem>
        <DropdownMenuItem>Rename List</DropdownMenuItem>
        <DropdownMenuItem>Information</DropdownMenuItem>
        <DropdownMenuItem>Delete List</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          Delete All Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
