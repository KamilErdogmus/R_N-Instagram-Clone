import { View, Text } from "react-native";
import React from "react";
import millify from "millify";

const CountDisplay = ({ title, count }: { title: string; count: number }) => {
  return (
    <View className="flex justify-center items-center">
      <Text className="text-2xl font-bold">{millify(count)}</Text>
      <Text className="text-sm">{title}</Text>
    </View>
  );
};

export default CountDisplay;
