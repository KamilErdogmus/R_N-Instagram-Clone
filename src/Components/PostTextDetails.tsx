import { View, Text } from "react-native";
import React from "react";
import ReadMore from "@fawazahmed/react-native-read-more";

const PostTextDetails = ({ name, text }: { name: string; text: string }) => {
  return (
    <View className="mb-2 flex-row px-4">
      <ReadMore
        numberOfLines={2}
        style={{ fontSize: 15 }}
        seeLessStyle={{ color: "#999" }}
        seeMoreStyle={{ color: "#999" }}
      >
        <Text className="flex-row font-bold text-base items-start">{name}</Text>
        <Text> {text} &nbsp; &nbsp; &nbsp;</Text>
      </ReadMore>
    </View>
  );
};

export default PostTextDetails;
