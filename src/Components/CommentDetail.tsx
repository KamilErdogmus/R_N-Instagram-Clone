import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import { MaterialIcons } from "@expo/vector-icons";
import { Heart } from "../Utils/Icons";

const CommentDetail = ({ item }: { item: any }) => {
  return (
    <View className="flex-row items-center m-2 justify-between p-2 rounded-lg">
      <View className="flex-row items-center">
        <ProfilePhoto size={50} src={item?.user.profile_pic_url} />
        <View className="ml-2">
          <View className="flex-row items-center ">
            <Text className="font-semibold text-lg">{item?.user.username}</Text>
            {item?.user.is_verified && (
              <MaterialIcons name="verified" size={14} color="blue" />
            )}
          </View>
          <View className="flex-row items-center justify-start w-[85%]">
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              className="text-base my-2 flex-wrap"
            >
              {item?.text}
            </Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="mr-3">
              <Text className="text-blue-500">Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-blue-500">See Translation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="items-center justify-center">
        <Heart size={16} />
        <Text className="text-lg">{item?.like_count}</Text>
      </View>
    </View>
  );
};

export default CommentDetail;
