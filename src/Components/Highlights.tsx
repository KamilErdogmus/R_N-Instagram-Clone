import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { getHighlightInfo, getHighlights } from "../Utils/api";
import { useQuery } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native-gesture-handler";
import HighlightViewer from "./HighlightViewer";

interface HighlightMedia {
  uri: string;
  type: "image" | "video";
}

interface HighlightItem {
  id: string;
  title: string;
  cover_media: {
    cropped_image_version: {
      url: string;
    };
  };
}

interface HighlightsProps {
  username: string;
}

interface HighlightResponse {
  items: HighlightItem[];
}

interface HighlightInfoResponse {
  data: {
    items: Array<{
      media_type: number;
      image_versions2?: {
        candidates: Array<{ url: string }>;
      };
      thumbnail_url?: string;
      image_versions?: {
        items: Array<{ url: string }>;
      };
      video_versions?: Array<{ url: string }>;
      video_url?: string;
    }>;
  };
}

const Highlights = ({ username }: HighlightsProps) => {
  const [selectedID, setSelectedID] = useState<string>("");
  const [highlights, setHighlights] = useState<HighlightMedia[]>([]);
  const [visible, setIsVisible] = useState(false);

  const { data: highlightsData } = useQuery<HighlightResponse>({
    queryKey: ["highlight", username],
    queryFn: () => getHighlights(username),
  });

  const { data: highlightInfo } = useQuery<HighlightInfoResponse>({
    queryKey: ["highlightInfo", selectedID],
    queryFn: () => getHighlightInfo(selectedID),
    enabled: !!selectedID,
  });

  useEffect(() => {
    if (highlightInfo?.data?.items) {
      const formattedHighlights = highlightInfo.data.items
        .map((item) => {
          if (item.media_type === 1) {
            const imageUrl =
              (item.image_versions2?.candidates &&
                item.image_versions2.candidates[0]?.url) ||
              item.thumbnail_url ||
              (item.image_versions?.items && item.image_versions.items[0]?.url);

            if (imageUrl) {
              return {
                uri: imageUrl,
                type: "image" as const,
              };
            }
          } else if (item.media_type === 2) {
            const videoUrl =
              (item.video_versions && item.video_versions[0]?.url) ||
              item.video_url;

            if (videoUrl) {
              return {
                uri: videoUrl,
                type: "video" as const,
              };
            }
          }
          return null;
        })
        .filter((item): item is HighlightMedia => item !== null);

      if (formattedHighlights.length > 0) {
        setHighlights(formattedHighlights);
        setIsVisible(true);
      }
    }
  }, [highlightInfo]);

  const handlePress = (id: string) => {
    const cleanId = id.replace("highlight:", "").trim();
    setSelectedID(cleanId);
  };

  const handleClose = () => {
    setIsVisible(false);
    setSelectedID("");
    setHighlights([]);
  };

  return (
    <View className="mx-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: 8 }}
      >
        {highlightsData?.items?.map((item, index) => (
          <View key={index} className="items-center justify-center mr-2">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handlePress(item.id)}
            >
              <ProfilePhoto
                src={item.cover_media.cropped_image_version.url}
                size={70}
              />
            </TouchableOpacity>
            <Text className="text-sm">{item.title}</Text>
          </View>
        ))}
      </ScrollView>

      {highlights.length > 0 && visible && (
        <HighlightViewer
          stories={highlights}
          visible={visible}
          onClose={handleClose}
        />
      )}
    </View>
  );
};

export default Highlights;
