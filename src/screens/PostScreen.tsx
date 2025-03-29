import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Contants from "expo-constants";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const PostScreen = ({ route, navigation }: props) => {
  const [email, setEmail] = useState("");

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-1 justify-center items-stretch px-10 pt-6 pb-8"
    >
      <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-8 text-center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={22} color={"#505050"}></Icon>
        </Pressable>
      </View>
      <Text className="text-5xl text-zinc-900 py-5">Post single page!</Text>
    </View>
  );
};

export default PostScreen;
