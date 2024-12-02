import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAppsStore = create(
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
