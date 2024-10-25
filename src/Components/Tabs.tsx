import { View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Grid, IGTV, Profile, Reels } from "../Utils/Icons";

const Tabs = ({ IGTV_count }: { IGTV_count: number }) => {
  const [activeTab, setActiveTab] = useState<string>("Grid");
  return (
    <View className="flex-row justify-around items-center flex-1 m-2">
      <View className=" flex-1">
        <TouchableOpacity
          className={`flex-1 justify-center w-full items-center border-b-2 ${
            activeTab === "Grid" ? "border-black" : "border-white"
          }`}
          onPress={() => setActiveTab("Grid")}
        >
          <Grid size={35} />
        </TouchableOpacity>
      </View>
      <View className=" flex-1">
        <TouchableOpacity
          className={`flex-1 justify-center w-full items-center border-b-2 ${
            activeTab === "Reels" ? "border-black" : "border-white"
          }`}
          onPress={() => setActiveTab("Reels")}
        >
          <Reels size={35} />
        </TouchableOpacity>
      </View>
      {IGTV_count > 0 && (
        <View className=" flex-1">
          <TouchableOpacity
            className={`flex-1 justify-center w-full items-center border-b-2 ${
              activeTab === "IGTV" ? "border-black" : "border-white"
            }`}
            onPress={() => setActiveTab("IGTV")}
          >
            <IGTV size={35} />
          </TouchableOpacity>
        </View>
      )}
      <View className=" flex-1">
        <TouchableOpacity
          className={`flex-1 justify-center items-center border-b-2 ${
            activeTab === "Profile" ? "border-black" : "border-white"
          }`}
          onPress={() => setActiveTab("Profile")}
        >
          <Profile size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tabs;
