import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode, Video } from "expo-av";
import Modal from "react-native-modal";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import Loader from "../../Components/Loader";
import { getAllReels, getSimiliarAcc } from "../../Utils/api";
import { useQuery, useQueries } from "@tanstack/react-query";
import ProfilePhoto from "../../Components/ProfilePhoto";
import { VideoData } from "../../Utils/types";

const { width } = Dimensions.get("window");
const numCol = 3;
const videoSize = (width - (numCol + 1) * 2) / numCol;

interface SimilarAccount {
  username: string;
  profile_pic_url: string;
  id: string;
}

const ReelsScreen = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [followed, setFollowed] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const videoRef = useRef<Video>(null);
  const [mutedVideos, setMutedVideos] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [status, setStatus] = useState({});

  const { data: similiarAcc, isLoading: isLoadingSimilar } = useQuery<
    SimilarAccount[]
  >({
    queryKey: ["similiarAccounts"],
    queryFn: () => getSimiliarAcc(),
    select: (data) => data?.slice(0, 5),
  });

  const usernames = similiarAcc?.map((item: any) => item?.username) || [];

  const reelsQueries = useQueries({
    queries: usernames.map((username: any) => ({
      queryKey: ["allReels", username],
      queryFn: () => getAllReels(username),
      enabled: !!username,
    })),
  });

  const allVideos = reelsQueries
    .map((query) => query.data?.items || [])
    .flat()
    .map((item) => ({
      video_url: item?.video_url,
      id: item?.id,
      user: {
        username: item?.user?.username,
        profile_pic_url: item?.user?.profile_pic_url,
      },
    }))
    .filter((item) => item.video_url && item.video_url.startsWith("http"))
    .slice(0, 15);

  const isLoading =
    isLoadingSimilar || reelsQueries.some((query) => query.isLoading);

  const openModal = (videoData: any) => {
    if (videoData && videoData.video_url) {
      setSelectedVideo(videoData);
      setModalVisible(true);
      setIsVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsVisible(false);
    setLiked(false);
    setFollowed(false);
  };

  const toggleMute = (videoId: string) => {
    setMutedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  useEffect(() => {
    const loadVideo = async () => {
      if (videoRef.current && selectedVideo) {
        try {
          await videoRef.current.loadAsync(
            { uri: selectedVideo.video_url },
            {},
            false
          );
          if (isVisible) {
            await videoRef.current.playAsync();
          } else {
            await videoRef.current.pauseAsync();
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    loadVideo();

    return () => {
      if (videoRef.current) {
        videoRef.current.unloadAsync();
      }
    };
  }, [isVisible, selectedVideo]);

  if (isLoading) {
    return <Loader />;
  }

  const renderVideoGrid = () => (
    <View className="flex-wrap flex-row">
      {allVideos.map((video) => (
        <TouchableOpacity
          className="relative"
          key={video.id}
          onPress={() => openModal(video)}
        >
          <Video
            source={{ uri: video.video_url }}
            resizeMode={ResizeMode.COVER}
            style={{
              width: videoSize,
              height: videoSize * 2,
              borderRadius: 4,
              margin: 1,
            }}
            isLooping
            isMuted={mutedVideos[video.id]}
            onPlaybackStatusUpdate={(status) => setStatus(status)}
            androidImplementation="MediaPlayer"
          />
          <View className="absolute right-3 top-3">
            <MaterialIcons name="video-collection" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderModalContent = () => (
    <View style={{ flex: 1 }}>
      <View className="absolute z-10 top-4 right-4">
        <TouchableOpacity onPress={closeModal}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {selectedVideo && (
        <Pressable
          onPress={() => toggleMute(selectedVideo.id)}
          style={{ flex: 1 }}
        >
          <Video
            source={{ uri: selectedVideo.video_url }}
            resizeMode={ResizeMode.COVER}
            isLooping={isVisible}
            shouldPlay={isVisible}
            ref={videoRef}
            isMuted={mutedVideos[selectedVideo.id]}
            onPlaybackStatusUpdate={(status) => setStatus(status)}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 8,
            }}
          />
          <View className="absolute top-4 left-4 z-[2000]">
            {mutedVideos[selectedVideo.id] ? (
              <Feather name="volume-2" size={24} color="white" />
            ) : (
              <Feather name="volume-x" size={24} color="white" />
            )}
          </View>
        </Pressable>
      )}
      <View className="absolute bottom-0 flex-row z-20 mx-4 mb-4">
        <View className="flex-row flex-1">
          <View className="flex-row items-center justify-center gap-x-2">
            <ProfilePhoto
              size={70}
              src={selectedVideo?.user?.profile_pic_url as string}
            />
            <Text className="text-zinc-100 text-lg">
              {selectedVideo?.user?.username}
            </Text>
          </View>
          <View className="items-center justify-center ml-6">
            <TouchableOpacity
              className="border border-zinc-300 p-2 items-center justify-center rounded-lg bg-transparent ml-2"
              onPress={() => setFollowed(!followed)}
            >
              <Text className="text-zinc-200 text-base">
                {followed ? "Followed" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="gap-y-6">
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            {liked ? (
              <AntDesign name="heart" size={30} color="red" />
            ) : (
              <AntDesign name="hearto" size={30} color="white" />
            )}
          </TouchableOpacity>
          <FontAwesome5 name="comment" size={30} color="white" />
          <Feather name="send" size={30} color="white" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-center text-xl">Related Reels</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderVideoGrid()}
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        style={{ margin: 0 }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={1}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
      >
        {renderModalContent()}
      </Modal>
    </SafeAreaView>
  );
};
export default ReelsScreen;
