import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video, Audio, AVPlaybackStatus, ResizeMode } from "expo-av";
import { Feather } from "@expo/vector-icons";

interface HighlightViewerProps {
  stories: Array<{
    uri: string;
    type: "image" | "video";
  }>;
  visible: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const STORY_DURATION = 5000;

const HighlightViewer: React.FC<HighlightViewerProps> = ({
  stories,
  visible,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<Video>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const currentStory = stories[currentIndex];

  useEffect(() => {
    (async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const moveToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      handleClose();
    }
  };

  const moveToPreviousStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.stopAsync();
    }
    setCurrentIndex(0);
    setProgress(0);
    setIsPaused(false);
    onClose();
  };

  useEffect(() => {
    if (visible && currentStory?.type === "image" && !isPaused) {
      let startTime = Date.now();

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      progressInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / STORY_DURATION) * 100;

        if (newProgress >= 100) {
          moveToNextStory();
        } else {
          setProgress(newProgress);
        }
      }, 16);

      return () => {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      };
    }
  }, [currentIndex, visible, isPaused, currentStory]);

  const handleVideoStatus = (status: AVPlaybackStatus) => {
    if ("isLoaded" in status && status.isLoaded) {
      if (status.didJustFinish) {
        moveToNextStory();
      }
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (currentStory?.type === "video" && videoRef.current) {
      isPaused ? videoRef.current.playAsync() : videoRef.current.pauseAsync();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  if (!visible || !currentStory) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View className="flex-1 bg-black">
        <View className="absolute top-10 w-full flex-row px-2 gap-1 z-10">
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
                }}
              />
            </View>
          ))}
        </View>

        {currentStory.type === "image" ? (
          <Image
            source={{ uri: currentStory.uri }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            resizeMode="contain"
          />
        ) : (
          <Video
            ref={videoRef}
            source={{ uri: currentStory.uri }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            shouldPlay={!isPaused}
            isLooping={false}
            isMuted={isMuted}
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={handleVideoStatus}
          />
        )}

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
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="absolute inset-0 flex-row">
          <TouchableOpacity
            className="w-1/3 h-full"
            onPress={moveToPreviousStory}
          />
          <TouchableOpacity className="w-1/3 h-full" onPress={togglePause} />
          <TouchableOpacity
            className="w-1/3 h-full"
            onPress={moveToNextStory}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HighlightViewer;
