import { View } from "react-native";
import React from "react";
import Post from "./Post";
import { shuffleArray } from "../Utils/Shuffle";

const Posts = ({ similiar, username }: { similiar: any; username: string }) => {
  let usernames: string[] = [];

  similiar?.map((item: any) => usernames.push(item?.username));

  const shuffledUsernames = shuffleArray(usernames);

  return (
    <View>
      {shuffledUsernames.map((item, index) => (
        <Post key={index} username={item} profileOwner={username} />
      ))}
    </View>
  );
};

export default Posts;
