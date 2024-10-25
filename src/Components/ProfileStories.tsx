import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../Utils/api";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../Router/Router";
import { Carousel } from "../Utils/Icons";
import Loader from "./Loader";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const numCol = 3;
const imageSize = (width - (numCol + 1) * 2) / numCol;

interface PostItem {
  id: string;
  thumbnail_url: string;
  media_type: number;
  carousel_media_count?: number;
}
interface PostsResponse {
  items: PostItem[];
}

const ProfileStories = ({ username }: { username: string }) => {
  const navigation = useNavigation<NavigationProps>();
  const { data, isLoading } = useQuery<PostsResponse>({
    queryKey: ["posts", username],
    queryFn: () => getAllPosts(username),
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <View className="flex-row flex-wrap">
      {data?.items.map((item: any) => (
        <TouchableOpacity
          key={item.id}
          className="relative"
          onPress={() =>
            navigation.navigate("PostDetail", {
              id: item.id,
              username: username,
            })
          }
        >
          <Image
            source={{ uri: item.thumbnail_url }}
            style={{
              width: imageSize,
              height: imageSize,
              margin: 1,
              borderRadius: 4,
            }}
          />
          {item?.media_type === 2 ? (
            <View className="absolute right-3 top-3">
              <MaterialIcons name="video-collection" size={24} color="white" />
            </View>
          ) : item?.carousel_media_count > 0 ? (
            <View className="absolute right-3 top-3">
              <Carousel size={18} />
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileStories;
