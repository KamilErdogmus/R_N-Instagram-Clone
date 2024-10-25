import { View, Text, TextInput } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../Utils/api";
import ProfilePhoto from "./ProfilePhoto";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Loader from "./Loader";

interface UserInfo {
  username: string;
  profile_pic_url_hd: string;
  is_verified: boolean;
}
const UserComment = ({ username }: { username: string }) => {
  const { data, isLoading } = useQuery<UserInfo>({
    queryKey: ["data", username],
    queryFn: () => getInfo(username),
  });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <View className="flex-row items-center my-2 justify-between bg-zinc-100/40 p-2 rounded-lg">
      <View className="flex-row items-center">
        <ProfilePhoto src={data?.profile_pic_url_hd as string} size={50} />
        <View className="ml-2">
          <View className="flex-row items-center ">
            <Text className="font-semibold text-lg">{data?.username}</Text>
            {data?.is_verified && (
              <MaterialIcons name="verified" size={14} color="blue" />
            )}
          </View>
          <View className="flex-row justify-between flex-1">
            <TextInput
              style={{ width: "80%" }}
              placeholder={`Add comment for ${username}...`}
              className="text-base my-2"
            />
            <Ionicons name="send" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserComment;
