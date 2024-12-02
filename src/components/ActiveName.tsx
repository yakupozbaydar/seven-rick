import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type ActiveNameProps = {
  name: string;
} & TouchableOpacityProps;

export const ActiveName = ({ name, ...rest }: ActiveNameProps) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      className="bg-dark/10 p-2 rounded-lg flex-row items-center m-1"
      {...rest}
    >
      <Text className="text-dark mr-2 text-md">{name}</Text>
      <View className="bg-dark/50 items-center p-0.5 justify-center rounded-md">
        <Ionicons name="close-sharp" size={18} color="white" />
      </View>
    </TouchableOpacity>
  );
};
