import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const Title = () => {
  return (
    <HoverCard>
      <HoverCardTrigger className="font-semibold cursor-pointer hover:underline hover:underline-offset-4  ">
        Heyho! To Do List
      </HoverCardTrigger>
      <HoverCardContent>
        To Do List App for organizing your task! – created and maintained by
        @riciolus.
      </HoverCardContent>
    </HoverCard>
  );
};

export default Title;
