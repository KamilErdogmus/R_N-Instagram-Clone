import { View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../Utils/api";
import Loader from "./Loader";
import PostOwner from "./PostOwner";
import PostImages from "./PostImages";
import NavigationTabs from "./NavigationTabs";
import Likes from "./Likes";
import SharedTime from "./SharedTime";
import PostTextDetails from "./PostTextDetails";

interface PostItem {
  id: string;
  device_timestamp: number;
  user: {
    username: string;
  };
  caption?: {
    text: string;
  };
}
interface PostResponse {
  items: PostItem[];
}

const Post = ({
  username,
  profileOwner,
}: {
  username: string;
  profileOwner: string;
}) => {
  const { data, isLoading } = useQuery<PostResponse>({
    queryKey: ["post", username],
    queryFn: () => getAllPosts(username as string),
  });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <View className="bg-zinc-100 pb-4">
      <PostOwner data={data?.items[0]} profileOwner={profileOwner} />

      <PostImages data={data?.items[0]} />

      <NavigationTabs
        postID={data?.items[0].id as string}
        username={profileOwner}
      />

      <View className="flex-row items-center justify-between mt-2">
        <Likes id={data?.items[0].id as string} />
        <SharedTime time={data?.items[0].device_timestamp || 0} />
      </View>

      <PostTextDetails
        name={data?.items[0].user?.username as string}
        text={data?.items[0].caption?.text as string}
      />
    </View>
  );
};

export default Post;
