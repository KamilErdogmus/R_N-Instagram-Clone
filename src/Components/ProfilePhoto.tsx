import { View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "../Utils/api";
import { LinearGradient } from "expo-linear-gradient";
import Loader from "./Loader";
import StoryViewer from "./StoryViewer";

interface ProfilePhotoProps {
  size: number;
  src: string;
  username?: string;
}

interface StoryMedia {
  uri: string;
  type: "video" | "image";
}

interface StoryItem {
  media_type: number;
  video_url?: string;
  image_url?: string;
  thumbnail_url?: string;
}

interface StoriesResponse {
  count: number;
  items: StoryItem[];
}

const ProfilePhoto = ({ size = 100, src, username }: ProfilePhotoProps) => {
  const [stories, setStories] = useState<StoryMedia[]>([]);
  const [visible, setIsVisible] = useState<boolean>(false);

  const { data, isLoading } = useQuery<StoriesResponse>({
    queryKey: ["stories", username],
    queryFn: () => getStories(username as string),
    enabled: !!username,
  });

  useEffect(() => {
    if (data?.count && data.count > 0 && data.items) {
      const formattedStories = data.items.map((item) => {
        const mediaUrl =
          item.media_type === 2
            ? item.video_url
            : item.image_url || item.thumbnail_url;

        return {
          uri: mediaUrl || "",
          type: item.media_type === 2 ? "video" : "image",
        } as StoryMedia;
      });

      setStories(formattedStories.filter((story) => story.uri));
    } else {
      setStories([]);
    }
  }, [data]);

  const handleClose = (): void => {
    setIsVisible(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!stories || stories.length === 0) {
    return (
      <View>
        <Image
          className="rounded-full"
          style={{ width: size, height: size }}
          source={{ uri: src }}
        />
      </View>
    );
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#e11447", "#f7a14b"]}
      style={{
        width: size + 6,
        height: size + 6,
        borderRadius: (size + 4) / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={() => setIsVisible(true)}>
        <Image
          className="rounded-full"
          style={{ width: size, height: size }}
          source={{ uri: src }}
        />
      </TouchableOpacity>
      {stories.length > 0 && (
        <StoryViewer
          stories={stories}
          visible={visible}
          onClose={handleClose}
        />
      )}
    </LinearGradient>
  );
};

export default ProfilePhoto;
