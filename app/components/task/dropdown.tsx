import React from "react";
import { GoKebabHorizontal } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";

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
        <DropdownMenuItem>Delete All Task</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
