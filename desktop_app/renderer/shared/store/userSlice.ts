import { StateCreator } from "zustand";

export interface Device {
  uid: string;
  fcmToken: string;
  id: number;
  model: string;
  os: string;
  type: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  createdDate: string;
  locationConsent: boolean;
  devices?: Device[];
}

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const LOCAL_STORAGE_KEY = 'userState';

// Helper function to get initial state from localStorage
const getInitialUserState = (): User | null => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const createUserSlice: StateCreator<UserState> = (set) => ({
  user: getInitialUserState(),
  setUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    }
    set({ user });
  },
  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    set({ user: null });
  },
});