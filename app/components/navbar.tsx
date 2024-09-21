import React from "react";
import { IoMenu } from "react-icons/io5";

const NavigationBar = ({
  toggleSidebar,
}: {
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex justify-between bg-neutral-950 items-center px-3 tablet:hidden h-14 border-b border-line">
      <div className="text-lg font-semibold">Heyho!</div>
      <button onClick={() => toggleSidebar((prev) => !prev)}>
        <IoMenu size={32} />
      </button>
    </div>
  );
};

export default NavigationBar;
