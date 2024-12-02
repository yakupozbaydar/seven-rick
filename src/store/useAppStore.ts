import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AppStoreState = {
  hasSeenOnboarding: boolean;
};

type AppStoreActions = {
  setHasSeenOnboarding: (hasSeenOnboarding: boolean) => void;
};

export const useAppsStore = create<AppStoreState & AppStoreActions>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,

      setHasSeenOnboarding: (hasSeenOnboarding: boolean) => {
        set({ hasSeenOnboarding });
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
