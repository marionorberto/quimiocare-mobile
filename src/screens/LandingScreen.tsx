import { View, Text, Pressable, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";

import Icons from "react-native-vector-icons/Ionicons";

import ForgotPasswordScreen from "./ForgotPasswordScreen";
import settingsScreen from "./settingsScreen";

import Contants from "expo-constants";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const Tab = createBottomTabNavigator();

const LandingScreen = ({ route, navigation }: props) => {
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-1 justify-center items-stretch px-10 "
    >
      <View className="flex-row justify-between items-center w-full">
        <View className="flex-row justify-start items-stretch">
          <Image
            style={{ width: 35, height: 35 }}
            className="rounded-full"
            source={require("../../assets/user.png")}
          />
          <View className="flex-col items-start justify-center">
            <Text className="text-black font-semibold text-xl">
              Mário Norberto
            </Text>
            <Text className="text-zin-400">Paciente Oncológico</Text>
          </View>
        </View>
        <View className="text-end flex-row justify-end items-center gap.3">
          <Icons name="home" className="text-lg" color={"#e4e4e7"}></Icons>
        </View>
      </View>

      <View className=" w-full bg-zinc-50 flex-row justify-between items-center p-5">
        <Pressable>
          <View className="flex-col justify-center items-center">
            <Icons name="home" className="text-lg" color={"#e4e4e7"}></Icons>
            <Text className="text-zinc-300 text-lg">Início</Text>
          </View>
        </Pressable>
        <Pressable>
          <View className="flex-col justify-center items-center">
            <Icons name="home" className="text-lg" color={"#e4e4e7"}></Icons>
            <Text className="text-zinc-300 text-lg">Início</Text>
          </View>
        </Pressable>
        <Pressable>
          <View className="flex-col justify-center items-center">
            <Icons name="home" className="text-lg" color={"#e4e4e7"}></Icons>
            <Text className="text-zinc-300 text-lg">Início</Text>
          </View>
        </Pressable>
        <Pressable>
          <View className="flex-col justify-center items-center">
            <Icons name="home" className="text-lg" color={"#e4e4e7"}></Icons>
            <Text className="text-zinc-300 text-lg">Perfil</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default LandingScreen;
