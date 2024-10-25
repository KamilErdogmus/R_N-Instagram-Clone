import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostDetails } from "../../Utils/api";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../Components/Loader";
import Likes from "../../Components/Likes";
import { ScrollView } from "react-native-gesture-handler";
import PostTextDetails from "../../Components/PostTextDetails";
import SharedTime from "../../Components/SharedTime";
import PostOwner from "../../Components/PostOwner";
import PostImages from "../../Components/PostImages";
import NavigationTabs from "../../Components/NavigationTabs";

interface RouteParams {
  route: {
    params: {
      id: string;
      username: string;
    };
  };
}
interface PostData {
  user: {
    username: string;
  };
  caption?: {
    text: string;
  };
  device_timestamp?: number;
}

interface QueryError {
  message: string;
}
const PostDetailScreen = ({ route }: RouteParams) => {
  const { id, username } = route.params;

  const { data, isLoading, error } = useQuery<PostData, QueryError>({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await getPostDetails(id);
      return response;
    },
    retry: 2,
  });

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaView className=" flex-1 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <PostOwner profileOwner={username} data={data} />
        <PostImages data={data} />
        <NavigationTabs postID={id} username={username} />
        <Likes id={id} />
        <PostTextDetails
          name={data?.user?.username as string}
          text={data?.caption?.text as string}
        />
        <SharedTime time={data?.device_timestamp || 0} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostDetailScreen;
