import React from "react";
import { Redirect } from "expo-router";
import { useAppsStore } from "@/store/useAppStore";

export default function Index() {
  const { hasSeenOnboarding } = useAppsStore();

  if (!hasSeenOnboarding) {
    return <Redirect href={"/onboarding"} />;
  }

  return <Redirect href={"/home"} />;
}
