import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../Router/Router";

const User = ({
  username,
  profileOwner,
}: {
  username: string;
  profileOwner: string;
}) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    if (username === profileOwner) {
      navigation.navigate("Profile", { username: profileOwner });
    } else {
      navigation.navigate("UsersPage", { username });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text className="text-xl mx-4">{username}</Text>
    </TouchableOpacity>
  );
};

export default User;
