import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
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
import Checkbox from "expo-checkbox";
import { useToast } from "react-native-toast-notifications";
import { signUpSchema } from "../../Utils/Schema";

const SignUp = () => {
  const navigation = useNavigation<NavigationProps>();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(true);
  const toast = useToast();

  const handleSignUp = (
    values: {
      username: string;
      password: string;
      passwordConfirm: string;
      email: string;
      phone: string;
      agree: boolean;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    toast.show("You have been successfully signed up.", {
      type: "normal",
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
    navigation.navigate("Login");
    setSubmitting(false);
  };

  return (
    <SafeAreaView className="bg-bg flex-1 justify-between px-4">
      <View className="flex-1 items-center">
        <Image
          className="h-52 scale-[0.5]"
          source={require("../../../assets/logos/colorful-text.png")}
        />
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            passwordConfirm: "",
            agree: false,
            phone: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={handleSignUp}
        >
          {({
            values,
            handleChange,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setTouched,
            setFieldValue,
          }) => (
            <View className="w-[100%] mx-4 gap-y-4">
              <TextInput
                className="border border-gray-500 rounded-xl p-2  w-full text-base"
                placeholder="Username"
                placeholderTextColor={"#000"}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {touched.username && errors.username && (
                <Text className="text-red-500 mb-2">{errors.username}</Text>
              )}
              <TextInput
                className="border border-gray-500 rounded-xl p-2 my-2 w-full text-base"
                placeholder="Email"
                placeholderTextColor={"#000"}
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text className="text-red-500">{errors.email}</Text>
              )}

              <TextInput
                className="border border-gray-500 rounded-xl p-2 my-2 w-full text-base"
                placeholder="Phone number"
                placeholderTextColor={"#000"}
                keyboardType="numeric"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />

              <View className="flex-row items-center relative ">
                <TextInput
                  className="border border-gray-500 rounded-xl p-2 my-2 w-full text-base font-roboto"
                  placeholder="Password"
                  placeholderTextColor={"#000"}
                  secureTextEntry={isVisible}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />

                <Pressable
                  className="justify-center items-center absolute right-4 "
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Feather name="eye" size={24} color="black" />
                  ) : (
                    <Feather name="eye-off" size={24} color="black" />
                  )}
                </Pressable>
              </View>
              {touched.password && errors.password && (
                <Text className="text-red-500 mt-2">{errors.password}</Text>
              )}

              <View className="flex-row items-center relative">
                <TextInput
                  className="border border-gray-500 rounded-xl p-2 my-2 w-full text-base font-roboto"
                  placeholder="Confirm Password"
                  placeholderTextColor={"#000"}
                  secureTextEntry={isConfirmVisible}
                  onChangeText={handleChange("passwordConfirm")}
                  onBlur={handleBlur("passwordConfirm")}
                  value={values.passwordConfirm}
                />

                <Pressable
                  className="justify-center items-center absolute right-4"
                  onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                >
                  {isConfirmVisible ? (
                    <Feather name="eye" size={24} color="black" />
                  ) : (
                    <Feather name="eye-off" size={24} color="black" />
                  )}
                </Pressable>
              </View>
              {touched.passwordConfirm && errors.passwordConfirm && (
                <Text className="text-red-500">{errors.passwordConfirm}</Text>
              )}
              <View
                className={`flex-row items-center ${
                  touched.agree && errors.agree ? "mb-4" : "mb-16"
                }`}
              >
                <Checkbox
                  color={"blue"}
                  value={values.agree}
                  onValueChange={() => setFieldValue("agree", !values.agree)}
                />
                <Text className="ml-3 text-lg">
                  I agree to the terms and conditions
                </Text>
              </View>
              {touched.agree && errors.agree && (
                <Text className="text-red-500 mb-4">{errors.agree}</Text>
              )}

              <Btn
                title={isSubmitting ? "Signing Up..." : "Sign Up"}
                Fnc={() => {
                  setTouched({
                    username: true,
                    password: true,
                    email: true,
                    phone: true,
                    passwordConfirm: true,
                    agree: true,
                  });
                  handleSubmit();
                }}
                disabled={isSubmitting}
              />
              {isSubmitting && (
                <ActivityIndicator size="small" color="#0000ff" />
              )}
            </View>
          )}
        </Formik>

        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-xl font-semibold">Have an account? &nbsp;</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-blue-500 font-bold text-2xl">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
