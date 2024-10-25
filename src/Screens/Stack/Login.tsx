import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import Feather from "@expo/vector-icons/Feather";
import Btn from "../../Components/Btn";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../Router/Router";
import { loginSchema } from "../../Utils/Schema";

const Login = () => {
  const navigation = useNavigation<NavigationProps>();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleLogin = (
    values: { username: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    navigation.navigate("HomeTabs", { username: values.username });
    setSubmitting(false);
  };
  return (
    <SafeAreaView className="bg-bg flex-1 justify-between px-4">
      <View className="flex-1 items-center">
        <Image
          className=" scale-[0.5]"
          source={require("../../../assets/logos/colorful-text.png")}
        />
        <Formik
          initialValues={{ username: "mrbeast", password: "Secure!1" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({
            values,
            handleChange,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <View className="w-[100%] mx-4 gap-y-6">
              <TextInput
                className="border border-gray-500 rounded-xl p-2 my-2 w-full"
                placeholder="Username"
                placeholderTextColor={"#000"}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {touched.username && errors.username && (
                <Text style={{ color: "red" }}>{errors.username}</Text>
              )}
              <View className="flex-row items-center relative">
                <TextInput
                  className="border border-gray-500 rounded-xl p-2 my-2 w-full"
                  placeholder="Password"
                  placeholderTextColor={"#000"}
                  secureTextEntry={isVisible}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />

                <Pressable
                  className="justify-center items-center absolute right-4"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Feather name="eye" size={24} color="black" />
                  ) : (
                    <Feather name="eye-off" size={24} color="black" />
                  )}
                </Pressable>
              </View>
              {touched.username && errors.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}
              <View className="flex-row justify-end mb-8">
                <Text className="text-blue-500 text-lg">Forgot password?</Text>
              </View>
              <Btn
                title={isSubmitting ? "Logging in..." : "Login"}
                Fnc={handleSubmit}
                disabled={isSubmitting}
              />
              {isSubmitting && (
                <ActivityIndicator size="small" color="#0000ff" />
              )}
            </View>
          )}
        </Formik>

        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-lg">If you haven't any account, &nbsp;</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-blue-500  text-xl font-roboto">SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="items-center mb-12">
        <Image
          className="scale-[0.6]"
          resizeMode="cover"
          source={require("../../../assets/logos/logoo.png")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
