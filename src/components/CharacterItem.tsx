import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Checkbox } from "@/components/Checkbox";
import { Character } from "@/store/useCharacterStore";

type CharacterItemProps = {
  character: Character;
  isSelected: boolean;
} & TouchableOpacityProps;

export const CharacterItem = ({
  character,
  isSelected,
  ...rest
}: CharacterItemProps) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      className="flex-row bg-dark/20 px-4 items-center py-2"
      {...rest}
    >
      <View className="flex-row items-center mr-4">
        <Checkbox isActive={isSelected} />
        <Image
          source={{
            uri: character.image,
          }}
          className="w-12 aspect-square ml-4 rounded-lg"
        />
      </View>

      <View>
        <Text>{character.name}</Text>
        <Text>{character.episode.length} Episodes</Text>
      </View>
    </TouchableOpacity>
  );
};
