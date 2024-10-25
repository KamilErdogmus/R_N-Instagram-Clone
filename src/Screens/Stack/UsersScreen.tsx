import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../Router/Router";
import { Dots, Share } from "../../Utils/Icons";
import CountDisplay from "../../Components/CountDisplay";
import ProfileDetails from "../../Components/ProfileDetails";
import Tabs from "../../Components/Tabs";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../../Utils/api";
import Loader from "../../Components/Loader";
import ProfilePhoto from "../../Components/ProfilePhoto";
import Highlights from "../../Components/Highlights";
import ProfileStories from "../../Components/ProfileStories";
import { UserData } from "../../Utils/types";

type RouteParams = {
  username: string;
};

const UsersScreen = ({ route }: { route: { params: RouteParams } }) => {
  const user = route.params.username;
  const navigation = useNavigation<NavigationProps>();
  const [followed, setFollowed] = useState<boolean>(false);

  const { data, isLoading } = useQuery<UserData>({
    queryKey: ["data", user],
    queryFn: () => getInfo(user),
    enabled: !!user,
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaView className="bg-bg flex-1 ">
      <View className="flex-row items-center justify-between my-2 px-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-bold mx-2">{data?.username}</Text>
          <MaterialIcons name="verified" size={16} color="blue" />
        </View>
        <View className="flex-row ">
          <Share size={25} />
          <Dots size={25} />
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-4 flex-1">
          <ProfilePhoto
            size={100}
            username={data?.username}
            src={data?.profile_pic_url_hd || data?.profile_pic_url || ""}
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
          name={data?.full_name ?? user}
          bio={data?.biography ?? ""}
          link={data?.bio_links || []}
          isPrivate={data?.is_private || false}
        />

        <View className="flex-row flex-1 justify-center items-center p-2">
          <View className="flex-1">
            <TouchableOpacity
              onPress={() => setFollowed(!followed)}
              className={`${
                followed ? "bg-zinc-300 " : "bg-blue-500"
              }  flex-1 border border-zinc-600 justify-center items-center p-2`}
            >
              <Text
                className={`${
                  followed ? "text-black" : "text-white"
                } font-semibold`}
              >
                {followed ? "Followed" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <TouchableOpacity className="flex-1 border border-zinc-400 justify-center items-center p-2">
              <Text>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Highlights username={user} />
        <Tabs IGTV_count={0} />
        <ProfileStories username={user} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsersScreen;
