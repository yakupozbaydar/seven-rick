import { Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";
import { ActiveName } from "@/components/ActiveName";
import { CharacterItem } from "@/components/CharacterItem";
import { Character, useCharacterStore } from "@/store/useCharacterStore";
import CharacterService from "@/api/CharacterService";
import { QUERY_KEYS } from "@/constants/query";
import { ListLoading } from "@/components/ListLoading";
import { EmptyList } from "@/components/EmptyList";
import { debounce } from "@/store/debounce";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Home() {
  const { top } = useSafeAreaInsets();
  const [listExpanded, setListExpanded] = useState(true);
  const {
    addCharacter,
    removeCharacter,
    searchKey,
    selectedCharacters,
    setSearchKey,
    searchInput,
    setSearchInput,
  } = useCharacterStore();
  const iconRotation = useSharedValue(0);

  // added debounce for performant search
  const debouncedSearchKey = debounce(setSearchKey, 500);

  const { data, isLoading } = useQuery<Character[]>({
    queryKey: [QUERY_KEYS.characters, searchKey],
    queryFn: async () => {
      const res = await CharacterService.searchCharacter(searchKey);

      if (!res) {
        return [];
      }

      return res;
    },
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${iconRotation.value}deg` }],
    };
  });

  return (
    <View className="flex-1 items-center px-4" style={{ paddingTop: top + 20 }}>
      <AnimatedPressable
        accessibilityRole="button"
        className="flex-row items-center bg-white border-[1px] border-dark p-1 flex-wrap rounded-xl"
        layout={CurvedTransition}
      >
        {selectedCharacters.map((char) => (
          <ActiveName
            key={char.name}
            name={char.name}
            onPress={() => removeCharacter(char.id)}
          />
        ))}
        <TextInput
          accessibilityLabel="Text input field"
          className="p-2 min-w-[40%] text-sm flex-1 leading-5"
          value={searchInput}
          onChangeText={(text) => {
            setSearchInput(text);
            debouncedSearchKey(text);
          }}
        />
        <AnimatedPressable
          style={iconAnimatedStyle}
          onPress={() => {
            setListExpanded((state) => !state);
            iconRotation.value = listExpanded ? withTiming(180) : withTiming(0);
          }}
        >
          <Ionicons
            name={"caret-down"}
            size={24}
            color="#334155"
            className="self-center"
          />
        </AnimatedPressable>
      </AnimatedPressable>

      {listExpanded && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          className="flex-1 w-full mt-4 pb-12"
        >
          <Animated.FlatList
            data={data}
            bounces={false}
            layout={CurvedTransition}
            className="rounded-xl border-[1px] border-dark"
            ItemSeparatorComponent={() => (
              <View className="bg-dark h-[1px] w-full" />
            )}
            ListEmptyComponent={isLoading ? ListLoading : EmptyList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CharacterItem
                character={item}
                isSelected={selectedCharacters
                  .map((char) => char.id)
                  .includes(item.id)}
                onPress={() => {
                  if (
                    selectedCharacters.map((char) => char.id).includes(item.id)
                  ) {
                    removeCharacter(item.id);
                  } else {
                    addCharacter(item);
                    setSearchInput("");
                  }
                }}
              />
            )}
          />
        </Animated.View>
      )}
    </View>
  );
}
