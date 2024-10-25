import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../Utils/api";

// Screens
import HomeScreen from "../Screens/Tabs/HomeScreen";
import Login from "../Screens/Stack/Login";
import SignUp from "../Screens/Stack/SignUp";
import ReelsScreen from "../Screens/Tabs/ReelsScreen";
import SearchScreen from "../Screens/Tabs/SearchScreen";
import ProfileScreen from "../Screens/Tabs/ProfileScreen";
import PostDetailScreen from "../Screens/Stack/PostDetailScreen";
import UsersScreen from "../Screens/Stack/UsersScreen";

// Components
import ProfilePhoto from "../Components/ProfilePhoto";
import {
  Home,
  HomeField,
  Reels,
  ReelsField,
  Search,
  SearchField,
} from "../Utils/Icons";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  HomeTabs: { username: string };
  PostDetail: { id: string; username: string };
  SearchPage: undefined;
  UsersPage: { username: string };
  Profile: { username: string };
};

export type TabParamList = {
  Home: { username: string };
  Search: undefined;
  Reels: undefined;
  Profile: { username: string };
  PostDetail: { id: string; username: string };
  UsersPage: { username: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type TabRouteProp = RouteProp<RootStackParamList, "HomeTabs">;

interface UserInfo {
  profile_pic_url_hd: string;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

interface TabNavigatorProps {
  route: TabRouteProp;
}

const TabNavigator = ({ route }: TabNavigatorProps) => {
  const { username } = route.params;

  const { data } = useQuery<UserInfo>({
    queryKey: ["pp", username],
    queryFn: () => getInfo(username),
    enabled: !!username,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <HomeField size={30} /> : <Home size={30} />,
        }}
        name="Home"
        component={HomeScreen}
        initialParams={{ username }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SearchField size={30} /> : <Search size={30} />,
        }}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ReelsField size={30} /> : <Reels size={30} />,
        }}
        name="Reels"
        component={ReelsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <ProfilePhoto size={30} src={data?.profile_pic_url_hd as string} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
        initialParams={{ username }}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null }}
        name="PostDetail"
        component={PostDetailScreen}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null }}
        name="UsersPage"
        component={UsersScreen}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default Router;
