import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../Router/Router";
import ProfilePhoto from "./ProfilePhoto";

interface QueryCardProps {
  data: {
    username: string;
    profile_pic_url_hd?: string;
    profile_pic_url?: string;
    full_name: string;
  };
}

const QueryCard = ({ data }: QueryCardProps) => {
  const navigation = useNavigation<NavigationProps>();

  const handleUserPress = () => {
    navigation.navigate("UsersPage", { username: data.username });
  };

  const profilePicture = data.profile_pic_url_hd || data.profile_pic_url;

  return (
    <View className="flex-row items-center my-2 justify-between">
      <TouchableOpacity
        className="items-center flex-row flex-1"
        onPress={handleUserPress}
      >
        <ProfilePhoto
          username={data.username}
          size={70}
          src={profilePicture as string}
        />
        <View className="ml-2">
          <Text className="font-bold text-base">{data.username}</Text>
          <Text>{data.full_name}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default QueryCard;
