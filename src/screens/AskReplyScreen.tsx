import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Contants from "expo-constants";
import { Image } from "expo-image";
import { handleLogin } from "../services/authService";
import { useTheme } from "../helpers/theme-context";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const AskReplyScreen = ({ route, navigation }: props) => {
  const { theme } = useTheme();
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-1 justify-center items-stretch px-10 pt-6 pb-8"
    >
      <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-8 text-center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={22} color={"#505050"}></Icon>
        </Pressable>

        <ScrollView>
          <TouchableOpacity className="bg-zinc-200 p-4 rounded-lg mb-3">
            <Text className="text-zinc-800 font-medium">
              "É normal sentir fraqueza depois da quimio?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-1">8 respostas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default AskReplyScreen;
