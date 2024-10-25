import { View } from "react-native";
import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import { More } from "../Utils/Icons";
import { MaterialIcons } from "@expo/vector-icons";
import User from "./User";

const PostOwner = ({
  data,
  profileOwner,
}: {
  data: any;
  profileOwner: string;
}) => {
  return (
    <View className="flex-row flex-grow px-4 items-center justify-between">
      <View className="flex-row items-center ">
        <ProfilePhoto size={40} src={data?.user.profile_pic_url} />
        <User username={data?.user?.username} profileOwner={profileOwner} />
        {data?.is_verified && (
          <MaterialIcons name="verified" size={24} color="blue" />
        )}
      </View>
      <View className="items-center">
        <More size={30} />
      </View>
    </View>
  );
};

export default PostOwner;
