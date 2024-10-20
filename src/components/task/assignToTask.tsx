import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AssignToButton = ({
  assignTo,
  setAssignTo,
}: {
  assignTo: string;
  setAssignTo: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Popover>
      <PopoverTrigger type="button" className="mr-1.5">
        <div>
          <Button
            type="button"
            id="date"
            variant={"outline"}
            className={
              "w-fit rounded-xl bg-neutral-800/90 text-neutral-300 hover:bg-neutral-900/50 transition hover:text-neutral-300 p-2 h-fit"
            }
          >
            Assign to
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-neutral-900 border-line">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Assign this task to?</h4>
            <p className="text-sm text-neutral-500">
              Work colaborative by assigning a task to your team.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              defaultValue={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              id="email"
              name=""
              placeholder="jhon@gmail.com"
              autoComplete="off"
              className="col-span-3 h-8 bg-neutral-800 border-line outline-none"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AssignToButton;
