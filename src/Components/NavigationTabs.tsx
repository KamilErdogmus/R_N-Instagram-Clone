import { View, TouchableOpacity } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import { Share, Comment, Bookmark } from "../Utils/Icons";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Comments from "./Comments";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const NavigationTabs = ({
  postID,
  username,
}: {
  postID: string;
  username: string;
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  // @ts-ignore
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View className="flex-row justify-between items-center px-4">
      <View className="flex-row">
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          {liked ? (
            <AntDesign name="heart" size={30} color="red" />
          ) : (
            <AntDesign name="hearto" size={30} color="black" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePresentModalPress}>
          <Comment size={30} />
        </TouchableOpacity>

        <Share size={30} />
      </View>

      <Bookmark size={30} />

      <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["95%"]}>
        <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <SafeAreaView>
            <Comments postID={postID} username={username} />
          </SafeAreaView>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

export default NavigationTabs;
