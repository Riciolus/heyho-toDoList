import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/app/components/shadcn/context-menu";
import { deleteGroup } from "@/app/lib/api";
import { Group } from "@/app/page";
import { toast } from "sonner";

const GroupProperties = ({
  groupId,
  setSidebarGroup,
}: {
  groupId: string;
  setSidebarGroup: React.Dispatch<React.SetStateAction<Group[]>>;
}) => {
  const handleDeleteGroup = () => {
    setSidebarGroup((prevGroupData) =>
      prevGroupData.filter((group) => group.id !== groupId)
    );
    toast("Task Deleted Sucessfully!");
    deleteGroup(groupId);
  };

  return (
    <ContextMenuContent>
      <ContextMenuItem>Rename</ContextMenuItem>
      <ContextMenuItem onClick={handleDeleteGroup}>
        Delete Group
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default GroupProperties;
