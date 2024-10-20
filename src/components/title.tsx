import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const Title = () => {
  return (
    <HoverCard>
      <HoverCardTrigger className="font-semibold cursor-pointer hover:underline hover:underline-offset-4  ">
        Heyho! To Do List
      </HoverCardTrigger>
      <HoverCardContent className="relative  overflow-hidden">
        <div className="absolute bg-gradient-to-tr from-green-300 to-red-300 w-16 h-12 blur-xl bottom-0 right-5 " />
        <div>
          To Do List App for organizing your task! – created and maintained by
          @riciolus.
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Title;
