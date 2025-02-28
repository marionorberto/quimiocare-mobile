import { Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScreenNames from "../constants/ScreenName";
import { BottomTabParamList } from "../constants/types";
import Icons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../screens/ProfileScreen";
import CommunityScreen from "../screens/CommunityScreen";
import MedicalScreen from "../screens/MedicalScreen";
import MainScreen from "../screens/MainScreen";
import SettingsScreen from "../screens/settingsScreen";
import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./RootStackParamsList";

const Tab = createBottomTabNavigator<BottomTabParamList>();

// type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const TabRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        animation: "shift",
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#71717a",
        tabBarLabelPosition: "below-icon",
        tabBarActiveBackgroundColor: "rgb(96 165 250 / 0.3)",
        tabBarLabelStyle: { color: "#a1a1aa" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={ScreenNames.Main}
        component={MainScreen}
        options={{
          tabBarLabel: ({ color, focused }) => {
            return focused ? (
              <View className="h-1 w-4 rounded-xl mt-1  bg-black"></View>
            ) : (
              ""
            );
          },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <Icons name="home-sharp" color={color} size={size}></Icons>
            ) : (
              <Icons name="home-outline" color={color} size={size}></Icons>
            );
          },
        }}
      />
      <Tab.Screen
        name={ScreenNames.Community}
        component={CommunityScreen}
        options={{
          tabBarLabel: ({ color, focused }) => {
            return focused ? (
              <View className="h-1 w-4 rounded-xl mt-1  bg-black"></View>
            ) : (
              ""
            );
          },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <Icons
                name="accessibility-sharp"
                color={color}
                size={size}
              ></Icons>
            ) : (
              <Icons
                name="accessibility-outline"
                color={color}
                size={size}
              ></Icons>
            );
          },
        }}
      />
      <Tab.Screen
        name={ScreenNames.Medical}
        component={MedicalScreen}
        options={{
          tabBarLabel: ({ color, focused }) => {
            return focused ? (
              <View className="h-1 w-4 rounded-xl mt-1  bg-black"></View>
            ) : (
              ""
            );
          },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <Icons name="medkit-sharp" color={color} size={size}></Icons>
            ) : (
              <Icons name="medkit-outline" color={color} size={size}></Icons>
            );
          },
        }}
      />
      <Tab.Screen
        name={ScreenNames.Setting}
        component={SettingsScreen}
        options={{
          tabBarLabel: ({ color, focused }) => {
            return focused ? (
              <View className="h-1 w-4 rounded-xl mt-1  bg-black"></View>
            ) : (
              ""
            );
          },
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <Icons name="settings-sharp" color={color} size={size}></Icons>
            ) : (
              <Icons name="settings-outline" color={color} size={size}></Icons>
            );
          },
        }}
      />
      <Tab.Screen
        name={ScreenNames.Profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color, focused }) => {
            return focused ? (
              <View className="h-1 w-4 rounded-xl mt-1  bg-black"></View>
            ) : (
              ""
            );
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              style={{
                width: 25,
                height: 25,
                borderRadius: 50,
                alignContent: "center",
                borderWidth: 2,
                borderColor: "#60a5fa",
                backgroundColor: "#ccc",
              }}
              source={require("../../assets/user.png")}
            ></Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
