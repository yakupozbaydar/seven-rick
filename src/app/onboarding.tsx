import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Button } from "@/components/Button";
import { useAppsStore } from "@/store/useAppStore";

export default function Onboarding() {
  const { top } = useSafeAreaInsets();
  const { setHasSeenOnboarding } = useAppsStore();

  return (
    <View
      className="flex-1 px-12 items-center justify-center bg-dark/70"
      style={{ paddingTop: top + 20 }}
    >
      <Text className="text-2xl font-bold text-center text-white">
        Hello SevenApps team 🙂
      </Text>
      <Button
        title="Go to select Rick&Morty characters"
        onPress={() => {
          setHasSeenOnboarding(true);
          router.push("/home");
        }}
        className="mt-8"
      />
      <Button
        title="Go to black screen to watch yourself"
        onPress={() => {
          setHasSeenOnboarding(true);
          router.push("/entry");
        }}
        className="mt-8"
      />
    </View>
  );
}
