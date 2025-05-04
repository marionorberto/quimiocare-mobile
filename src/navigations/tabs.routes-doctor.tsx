import { Alert, TouchableOpacity, View } from "react-native";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
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
import LibraryScreen from "../screens/LibraryScreen";
import api from "../services/api";
import { API_URL, API_URL_UPLOAD } from "../constants/data";
import MainMedicoScreen from "../screens/MainMedicoScreen";
import ProfileMedicoScreen from "../screens/ProfileMedicoScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const ButtonSearchCostumized = ({ children }: { children: ReactElement }) => {
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "red",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>;
};

const TabDoctorRoutes = () => {
  const [userImg, setUserImg] = useState("");
  useEffect(() => {
    fetchImgUser();
  });

  const fetchImgUser = async () => {
    try {
      api
        .get(`${API_URL}/profiles/single/doctor`)
        .then(({ data: response }) => {
          setUserImg(`http://${API_URL_UPLOAD}:3000/${response.data.urlImg}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      Alert.alert("Erro", "erro tentando pegar os dados de perfil");
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="MainMedicoScreen"
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
        name={ScreenNames.MainMedicoScreen}
        component={MainMedicoScreen}
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
        name={ScreenNames.ProfileMedicoScreen}
        component={ProfileMedicoScreen}
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
              source={{ uri: userImg }}
            ></Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabDoctorRoutes;
