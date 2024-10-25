import { Text } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const SharedTime = ({ time }: { time: number }) => {
  return (
    <Text className="text-base text-zinc-500 px-4">
      {dayjs(time / 1000).fromNow()}
    </Text>
  );
};

export default SharedTime;
