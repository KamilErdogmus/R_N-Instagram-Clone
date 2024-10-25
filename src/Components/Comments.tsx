import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../Utils/api";
import millify from "millify";
import CommentDetail from "./CommentDetail";
import UserComment from "./UserComment";
import Loader from "./Loader";

interface CommentResponse {
  data: {
    total: number;
    items: { id: string };
    additional_data: {
      comments_disabled: boolean;
    };
  };
}

const Comments = ({
  postID,
  username,
}: {
  postID: string;
  username?: string;
}) => {
  const { data, isLoading } = useQuery<CommentResponse>({
    queryKey: ["comment", postID],
    queryFn: () => getComments(postID),
  });

  const totalComments = data?.data?.total;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <View>
      {data?.data.additional_data.comments_disabled ? (
        <Text>Comments Disabled</Text>
      ) : (
        <View>
          <Text className="text-center text-2xl">Comments</Text>
          <View className="flex-row">
            <Text className="text-base font-bold">
              {totalComments && !isNaN(Number(totalComments))
                ? millify(Number(totalComments))
                : "0"}
            </Text>
            <Text className="text-base"> Comments</Text>
          </View>
          {data?.data.items.map((item: any) => (
            <CommentDetail key={item.id} item={item} />
          ))}
        </View>
      )}
      {!data?.data.additional_data.comments_disabled && (
        <UserComment username={username as string} />
      )}
    </View>
  );
};

export default Comments;
