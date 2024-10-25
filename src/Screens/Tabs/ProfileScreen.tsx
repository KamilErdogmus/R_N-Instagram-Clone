import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BurgerMenu, Dropdown, Plus } from "../../Utils/Icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProfilePhoto from "../../Components/ProfilePhoto";
import CountDisplay from "../../Components/CountDisplay";
import ProfileDetails from "../../Components/ProfileDetails";
import Tabs from "../../Components/Tabs";
import Highlights from "../../Components/Highlights";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../../Utils/api";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Entypo } from "@expo/vector-icons";
import ProfileStories from "../../Components/ProfileStories";
import Loader from "../../Components/Loader";
import { ProfileOwnerData } from "../../Utils/types";

interface RouteProps {
  route: {
    params: {
      username: string;
    };
  };
}

const ProfileScreen = ({ route }: RouteProps) => {
  const { username } = route.params;

  const { data, isLoading } = useQuery<ProfileOwnerData>({
    queryKey: ["data", username],
    queryFn: () => getInfo(username),
    enabled: !!username,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-6">
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold mr-2">{data?.username}</Text>
            {data?.is_verified && (
              <MaterialIcons name="verified" size={24} color="blue" />
            )}
            <Dropdown size={24} />
          </View>
          <View className="flex-row items-center gap-x-5">
            <TouchableOpacity activeOpacity={0.7}>
              <Plus size={24} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <BurgerMenu size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row items-center my-4 px-6 ">
          <ProfilePhoto
            src={data?.profile_pic_url_hd ?? ""}
            size={100}
            username={username}
          />
          <View className="flex-row justify-between items-center flex-1 ml-14 ">
            <CountDisplay title="Posts" count={data?.media_count as number} />
            <CountDisplay
              title="Followers"
              count={data?.follower_count as number}
            />
            <CountDisplay
              title="Following"
              count={data?.following_count as number}
            />
          </View>
        </View>
        <ProfileDetails
          name={data?.full_name ?? ""}
          bio={data?.biography ?? ""}
          // @ts-ignore
          link={data?.bio_links || []}
          isPrivate={data?.is_private || false}
          owner={true}
        />

        {data?.is_private ? (
          <View className=" mx-2 h-96 flex-row  items-center justify-center">
            <Entypo name="lock" size={60} color="black" />
            <Text className="text-3xl">This account is private.</Text>
          </View>
        ) : (
          <View className="flex-1 ">
            <Highlights username={username} />
            <Tabs IGTV_count={data?.total_igtv_videos ?? 0} />
            <ProfileStories username={username} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
