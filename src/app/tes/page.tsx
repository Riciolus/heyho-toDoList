"use client";

import useStore from "@/src/store/useGroupsStore";

export default function Main() {
  const bears = useStore((state) => state.bears);

  const increasePopulation = useStore((state) => state.increasePopulation);

  return (
    <div>
      <h1>{bears} bears around here...</h1>
      <button onClick={increasePopulation}>one up</button>
    </div>
  );
}
