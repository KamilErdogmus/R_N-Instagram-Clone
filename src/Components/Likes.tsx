import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../Utils/api";
import millify from "millify";

interface LikesResponse {
  total: number;
}

const Likes = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery<LikesResponse>({
    queryKey: ["likes", id],
    queryFn: () => getLikes(id),
  });

  const totalLikes = data?.total;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View className="flex-row items-center my-2 px-4">
      <Text className="text-lg font-semibold">
        {totalLikes && !isNaN(Number(totalLikes))
          ? millify(Number(totalLikes))
          : "0"}
      </Text>
      <Text className="font-bold text-lg"> Likes</Text>
    </View>
  );
};

export default Likes;
