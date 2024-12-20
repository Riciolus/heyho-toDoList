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
} from "@/src/components/ui/alert-dialog";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/src/components/ui/context-menu";
import { deleteGroup } from "@/src/lib/api";
import { Group } from "@/src/app/page";
import { toast } from "sonner";

const GroupProperties = ({
  groupId,
  setDynamicSidebarGroup,
  setActivePage,
  setIsEditing,
}: {
  groupId: string;
  setDynamicSidebarGroup: React.Dispatch<React.SetStateAction<Group[]>>;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleDeleteGroup = () => {
    setDynamicSidebarGroup((prevGroupData) =>
      prevGroupData.filter((group) => group.label !== groupId)
    );

    const activePage = localStorage.getItem("active-page");
    const parsedActivePage = activePage ? JSON.parse(activePage) : null;

    setActivePage(parsedActivePage.previous);
    toast("Task Deleted Sucessfully!");
    deleteGroup(groupId);
  };

  return (
    <ContextMenuContent>
      <ContextMenuItem onClick={() => setIsEditing(groupId)}>
        Edit List
      </ContextMenuItem>
      <AlertDialog>
        <AlertDialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-6 py-1 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-neutral-800 hover:text-neutral-50">
          Delete List
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
            <AlertDialogCancel className="bg-neutral-950 hover:bg-neutral-900 hover:text-neutral-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGroup}
              className="bg-neutral-950 hover:text-neutral-50 cursor-pointer"
            >
              <ContextMenuItem className="hover:bg-transparent bg-transparent">
                Continue
              </ContextMenuItem>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ContextMenuContent>
  );
};

export default GroupProperties;
