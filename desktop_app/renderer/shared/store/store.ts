import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SidebarState, createSidebarSlice } from "./sidebarSlice";
import { UserState, createUserSlice } from "./userSlice";
import { RouterState, createRouterSlice } from "./routerSlice";

type StoreState = SidebarState & UserState & RouterState;

export const useStore = create<StoreState>()(
  devtools((set, get, api) => ({
    ...createSidebarSlice(set, get, api),
    ...createUserSlice(set, get, api),
    ...createRouterSlice(set, get, api),
  }))
);

export default useStore;
