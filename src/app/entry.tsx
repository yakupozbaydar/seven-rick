import { View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button } from "@/components/Button";

export default function Entry() {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Button title="Go to Onboarding" onPress={router.back} />
    </View>
  );
}
