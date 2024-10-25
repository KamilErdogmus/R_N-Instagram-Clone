import { View } from "react-native";
import React from "react";
import ImageSwiper from "./Swiper";
import PostImage from "./PostImage";

const PostImages = ({ data }: { data: any }) => {
  return (
    <View className=" h-[700] my-4">
      {data?.carousel_media && data?.carousel_media.length > 0 ? (
        <ImageSwiper src={data?.carousel_media} />
      ) : (
        <PostImage src={data} />
      )}
    </View>
  );
};

export default PostImages;
