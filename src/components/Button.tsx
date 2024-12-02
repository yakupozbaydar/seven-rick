import React, { memo } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import * as Haptics from "expo-haptics";
import { tw } from "@/utils/tw";

type Props = {
  title?: string;
  theme?: "dark";
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  vertical?: boolean;
  textClassName?: string;
  loading?: boolean;
} & TouchableOpacityProps;

const buttonVariants = {
  dark: tw`bg-dark rounded-lg`,
  disabled: tw`bg-white/10 opacity-20`,
};

const _Button = ({
  title,
  disabled,
  rightElement,
  leftElement,
  textClassName,
  theme = "dark",
  onPress,
  loading,
  children,
  ...rest
}: Props) => {
  const containerClassNames = [
    tw`p-4 rounded-lg flex-row items-center justify-center`,
    buttonVariants[theme],
    leftElement && tw`justify-between`,
    disabled && buttonVariants.disabled,
  ].join(" ");

  const textClassNames = [
    tw`text-white text-lg text-center font-inter-medium`,
    disabled && tw`opacity-50`,
    textClassName,
  ].join(" ");

  const onClick: TouchableOpacityProps["onPress"] = (e) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      className={containerClassNames}
      disabled={disabled}
      onPress={onClick}
      {...rest}
    >
      {children || (
        <>
          <View className="w-10">{leftElement}</View>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className={textClassNames}>{title}</Text>
          )}
          <View className="w-10">{rightElement}</View>
        </>
      )}
    </TouchableOpacity>
  );
};

export const Button = memo(_Button);
