import { View, TextInput, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { More } from "../../Utils/Icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { searchUsers } from "../../Utils/api";
import { useDebounce } from "../../Utils/DebounceFnc";
import QueryCard from "../../Components/QueryCard";

interface SearchResult {
  id: string;
}

const SearchScreen = () => {
  const [focused, setFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [queries, setQueries] = useState<SearchResult[]>([]);
  const debouncedText = useDebounce(query, 1000);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedText) {
        const response = await searchUsers(debouncedText);
        setQueries(response);
      }
    };

    fetchData();
  }, [debouncedText]);

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView>
        {focused ? (
          <View className="flex-row mx-4 justify-between items-center">
            <Ionicons name="arrow-back-sharp" size={30} color="black" />
            <View className="flex-row items-center bg-zinc-200 flex-1 ml-2 rounded-lg p-2">
              <AntDesign name="search1" size={30} color="black" />
              <TextInput
                placeholder="Search..."
                onChangeText={(text) => setQuery(text)}
                className="ml-2 flex-1"
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
              />
            </View>
          </View>
        ) : (
          <View className="flex-row mx-4 justify-between items-center">
            <View className="flex-row items-center bg-zinc-200 flex-1 mr-2 rounded-lg p-2">
              <AntDesign name="search1" size={30} color="black" />
              <TextInput
                placeholder="Search..."
                className="ml-2"
                onChangeText={(text) => setQuery(text)}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
              />
            </View>
            <More size={30} />
          </View>
        )}
        <View className="m-4">
          {queries.map((item) => (
            <View key={item.id}>
              <QueryCard data={item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
