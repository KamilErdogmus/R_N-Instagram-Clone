import { useFonts } from "expo-font";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/Router/Router";
import { ActivityIndicator, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const queryClient = new QueryClient();

const App = () => {
  const [fontsLoaded] = useFonts({
    Nova: require("./assets/fonts/proxima/proximanova_regular.ttf"),
    Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <ToastProvider>
              <StatusBar backgroundColor="transparent" />
              <Router />
            </ToastProvider>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
