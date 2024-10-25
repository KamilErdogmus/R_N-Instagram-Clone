import { Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Loader = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <ActivityIndicator color={"#000"} size={"large"} />
      <Text>Loading...</Text>
    </SafeAreaView>
  );
};

export default Loader;
