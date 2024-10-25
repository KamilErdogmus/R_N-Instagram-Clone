import { Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

interface IBtn {
  title: string;
  Fnc?: () => void;
  disabled?: boolean;
}

const Btn = ({ title = "Click", Fnc, disabled = false }: IBtn) => {
  return (
    <LinearGradient
      className="rounded-xl"
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["#1D92F4", "#59CBFF"]}
    >
      <TouchableOpacity
        onPress={Fnc}
        disabled={disabled}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <Text className="text-white text-center text-2xl p-2 font-semibold">
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Btn;
