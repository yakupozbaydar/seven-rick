import { Text, View } from "react-native";
import React from "react";
import { tw } from "@/utils/tw";

type Props = {
  isActive: boolean;
};

export const Checkbox = ({ isActive }: Props) => {
  const containerClassName = [
    tw`w-4 h-4 rounded-sm bg-dark/50`,
    isActive && tw`bg-green-700`,
  ].join(" ");
  return (
    <View className={containerClassName}>
      {isActive && (
        <Text className="text-white text-center text-xs font-inter-bold">
          ✓
        </Text>
      )}
    </View>
  );
};
