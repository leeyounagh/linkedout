import { StateCreator } from "zustand";

 
export interface RouterState {
  path: string;
  setPath: (newPath: string) => void;
}


export const createRouterSlice: StateCreator<RouterState> = (set) => ({
  path: "/web/main",
  setPath: (newPath: string) => {
    set({ path: newPath });
  },
});