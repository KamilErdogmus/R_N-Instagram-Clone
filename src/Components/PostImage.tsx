import { Feather } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import React, { useState, useRef, useEffect } from "react";
import { Pressable, View, Image } from "react-native";

interface PostImageProps {
  src:
    | {
        video_url?: string;
        thumbnail_url?: string;
      }
    | undefined;
  isVisible?: boolean;
}

const PostImage: React.FC<PostImageProps> = ({ src, isVisible }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<Video>(null);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    const handleVideoVisibility = async () => {
      if (!videoRef.current) return;

      try {
        if (isVisible) {
          await videoRef.current.playAsync();
        } else {
          await videoRef.current.pauseAsync();
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleVideoVisibility();
  }, [isVisible]);

  if (src?.video_url) {
    return (
      <Pressable onPress={toggleMute} className="relative">
        <Video
          ref={videoRef}
          source={{ uri: src.video_url }}
          resizeMode={ResizeMode.COVER}
          className="h-full w-full rounded-md"
          isLooping={!isVisible}
          shouldPlay={!isVisible}
          isMuted={isMuted}
        />
        <View className="absolute top-4 left-4 z-30">
          <Feather
            name={isMuted ? "volume-x" : "volume-2"}
            size={24}
            color="white"
          />
        </View>
      </Pressable>
    );
  }

  return (
    <Image
      resizeMode="cover"
      source={{ uri: src?.thumbnail_url }}
      className="h-full w-full rounded-md"
    />
  );
};

export default PostImage;
