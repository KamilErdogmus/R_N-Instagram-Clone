import { View, Text } from "react-native";
import React from "react";
import ProfilePhoto from "./ProfilePhoto";

const FollewerStories = ({ item }: { item: any }) => {
  return (
    <View>
      <View className="w-20 items-center justify-center">
        <ProfilePhoto
          src={item?.profile_pic_url}
          size={70}
          username={item.username}
        />
        <Text className="mt-1 text-md">{item?.full_name}</Text>
      </View>
    </View>
  );
};

export default FollewerStories;
