import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/shadcn/alert-dialog";
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
      <AlertDialog>
        <AlertDialogTrigger className="relative flex cursor-default select-none items-center rounded-sm    px-6 py-1 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-neutral-800 hover:text-neutral-50">
          Delete Group{" "}
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-neutral-800 rounded-md border-neutral-700 text-neutral-50">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              group and remove your tasks from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-950  hover:bg-neutral-900  hover:text-neutral-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGroup}
              className="bg-neutral-950 hover:text-neutral-50 cursor-pointer"
            >
              <ContextMenuItem>Continue</ContextMenuItem>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ContextMenuContent>
  );
};

export default GroupProperties;
