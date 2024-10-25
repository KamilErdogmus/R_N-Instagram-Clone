import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { useEffect, useRef, useState } from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { Text, Dimensions } from "react-native";
import Modal from "react-native-modal";

interface StoryContent {
  uri: string;
  type: "image" | "video";
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const STORY_IMAGE_DURATION = 5000;

const StoryViewer = ({
  stories,
  visible,
  onClose,
}: {
  stories: StoryContent[];
  visible: boolean;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const [imageViewVisible, setImageViewVisible] = useState<boolean>(false);
  const videoRef = useRef<Video | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const currentStory = stories[currentIndex];

  const moveToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setImageViewVisible(false);
    setCurrentIndex(0);
    setProgress(0);
    setIsPaused(false);
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setImageViewVisible(true);
      }, 100);
    } else {
      setImageViewVisible(false);
    }
  }, [visible]);

  const handleVideoStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      moveToNextStory();
    }
  };

  const startProgressTimer = () => {
    if (currentStory?.type === "image" && imageViewVisible) {
      let startTime = Date.now();
      let interval = 16;

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      progressInterval.current = setInterval(() => {
        if (!isPaused) {
          const elapsed = Date.now() - startTime;
          const newProgress = (elapsed / STORY_IMAGE_DURATION) * 100;

          if (newProgress >= 100) {
            moveToNextStory();
            clearInterval(progressInterval.current!);
          } else {
            setProgress(newProgress);
          }
        }
      }, interval);
    }
  };

  useEffect(() => {
    if (visible && currentStory && imageViewVisible) {
      if (currentStory.type === "image") {
        setProgress(0);
        startProgressTimer();
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, visible, isPaused, currentStory, imageViewVisible]);

  const handlePress = () => {
    setIsPaused((prev) => !prev);
    if (currentStory?.type === "video" && videoRef.current) {
      isPaused ? videoRef.current.playAsync() : videoRef.current.pauseAsync();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  if (!currentStory || !visible) return null;

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={1}
      onBackButtonPress={handleClose}
      onBackdropPress={handleClose}
      style={{ margin: 0 }}
    >
      <View className="flex-1 bg-black">
        {currentStory.type === "image" ? (
          <ImageView
            images={[{ uri: currentStory.uri }]}
            imageIndex={0}
            visible={imageViewVisible}
            onRequestClose={handleClose}
            backgroundColor="black"
            swipeToCloseEnabled={false}
            presentationStyle="overFullScreen"
          />
        ) : (
          <Video
            ref={videoRef}
            source={{ uri: currentStory.uri }}
            shouldPlay={!isPaused}
            isLooping={false}
            isMuted={isMuted}
            resizeMode={ResizeMode.COVER}
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
            }}
            useNativeControls={false}
            onPlaybackStatusUpdate={handleVideoStatus}
          />
        )}

        <View className="absolute top-10 w-full flex-row px-2 gap-1">
          {stories.map((_, index) => (
            <View
              key={index}
              className="flex-1 h-1 rounded-full overflow-hidden bg-gray-600"
            >
              <View
                className="h-full bg-white"
                style={{
                  width:
                    index < currentIndex
                      ? "100%"
                      : index === currentIndex
                      ? `${progress}%`
                      : "0%",
                  // @ts-ignore
                  transition: "width 0.1s linear",
                }}
              />
            </View>
          ))}
        </View>

        <View className="absolute inset-0 flex-row">
          <TouchableOpacity
            onPress={() => {
              if (currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
                setProgress(0);
              }
            }}
            className="w-1/3 h-full"
            activeOpacity={1}
          />
          <TouchableOpacity
            onPress={handlePress}
            className="w-1/3 h-full"
            activeOpacity={1}
          />
          <TouchableOpacity
            onPress={moveToNextStory}
            className="w-1/3 h-full"
            activeOpacity={1}
          />
        </View>

        <View className="absolute top-12 w-full flex-row justify-between px-4">
          {currentStory.type === "video" && (
            <TouchableOpacity onPress={toggleMute}>
              <Feather
                name={isMuted ? "volume-x" : "volume-2"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleClose} className="ml-auto">
            <Text className="text-white text-xl">✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StoryViewer;
