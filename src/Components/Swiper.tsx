import { Image, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

interface ImageItem {
  id: string;
  thumbnail_url: string;
  width?: number;
  height?: number;
  url?: string;
}

interface ImageSwiperProps {
  src: ImageItem[];
}

const ImageSwiper = ({ src }: ImageSwiperProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Swiper showsButtons loop={false} paginationStyle={{ bottom: 10 }}>
        {src.map((item) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            key={item.id}
          >
            <Image
              source={{ uri: item.thumbnail_url }}
              resizeMode="cover"
              className="h-full w-full rounded-lg"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default ImageSwiper;
