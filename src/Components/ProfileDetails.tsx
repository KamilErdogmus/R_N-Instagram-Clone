import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileDetails = ({
  name,
  bio,
  link,
  isPrivate,
  owner = false,
}: {
  name: string;
  bio: string;
  link?: { url: string }[];
  isPrivate: boolean;
  owner?: boolean;
}) => {
  return (
    <View className="px-4 mb-4">
      {name !== "" && <Text className="text-xl font-bold">{name}</Text>}
      {bio !== "" && <Text className="text-base">{bio}</Text>}

      <View>
        {link?.length
          ? link.map((item, index) => (
              <Text key={index} className="my-1 text-blue-500">
                {item.url}
              </Text>
            ))
          : null}
      </View>
      {!isPrivate && owner && (
        <TouchableOpacity className="border my-2 border-[#cbcbcb] rounded-md p-1">
          <Text className="text-center font-semibold text-lg">
            Edit Profile
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileDetails;
