import { create } from "zustand";
import { Group } from "../app/page";

// Define the state and methods
type State = {
  groups: Group[];
  setGlobalGroups: () => void;
};

// Create the Zustand store
const useStore = create<State>((set) => ({
  groups: [],
  setGlobalGroups: (updatedGroups: Group) => set({ groups: updatedGroups }),
}));

export default useStore;
