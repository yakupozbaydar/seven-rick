import { ActivityIndicator, View } from "react-native";
import React from "react";

export const ListLoading = () => (
  <View className="flex-1 items-center justify-center mt-12">
    <ActivityIndicator size="large" color={"#334155"} />
  </View>
);
