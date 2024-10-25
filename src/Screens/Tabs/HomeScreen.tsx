import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { getInfo, getSimiliarAcc } from "../../Utils/api";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../Components/Loader";
import { Heart, Messenger } from "../../Utils/Icons";
import ProfilePhoto from "../../Components/ProfilePhoto";
import { AntDesign } from "@expo/vector-icons";
import FollewerStories from "../../Components/FollewerStories";
import Posts from "../../Components/Posts";

const HomeScreen = ({ route }: { route: any }) => {
  const { username } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const { data: userData, refetch: refetchUserData } = useQuery({
    queryKey: ["data", username],
    queryFn: () => getInfo(username),
  });

  const {
    isLoading,
    data: similiar,
    refetch: refetchSimiliar,
  } = useQuery({
    queryKey: ["similiarAccounts"],
    queryFn: () => getSimiliarAcc(),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchUserData(), refetchSimiliar()]);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="bg-bg flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"
            colors={["#000"]}
          />
        }
      >
        <View className="flex-row items-center justify-between px-4">
          <Image
            source={require("../../../assets/logos/black-text.png")}
            className="w-40 h-20 scale-90 "
          />

          <View className="flex-row">
            <View className="relative mr-4">
              <Heart size={30} />
              <View className="absolute rounded-full w-3 h-3 bg-red-500 z-20 right-0 top-0" />
            </View>
            <Messenger size={30} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 4 }}
        >
          <View className="relative w-20 items-center mb-3 justify-center">
            <ProfilePhoto
              src={userData?.profile_pic_url_hd}
              size={70}
              username={username}
            />
            <Text className="mt-1 text-base">Add Story</Text>
            <View className="absolute bottom-6 right-2">
              <AntDesign name="pluscircle" size={24} color="blue" />
            </View>
          </View>

          {similiar?.map((item: any) => (
            <FollewerStories key={item.id} item={item} />
          ))}
        </ScrollView>

        <Posts similiar={similiar} username={username} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
