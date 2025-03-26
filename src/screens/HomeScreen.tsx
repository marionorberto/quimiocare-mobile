import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";

import ScreenNames from "../constants/ScreenName";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const HomeScreen = ({ route, navigation }: props) => {
  return (
    <View className="flex-1 justify-center items-center dark:bg-neutral-900">
      <Image
        style={{ width: 300, height: 150 }}
        className=""
        source={require("../../assets/login.svg")}
      />
      <Text className="font-bold text-black text-3xl mb-3 mt-6 opacity-70 dark:text-white">
        QuimioCare{" "}
      </Text>
      <Text className="text-zinc-400 text-center px-20">
        Monitore os seus sintomas, registre os seus dados médicos e conquiste a
        cura!
      </Text>
      <View className="bg-zinc-200/60 p-4 flex flex-row justify-center items-center rounded-lg mt-14 mb-5">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ScreenNames.ChooseUserScreen, {
              title: "Register",
            })
          }
          className="text-white bg-blue-500 px-7 py-5 rounded-lg"
        >
          <Text className="text-white font-semibold text-lg">Registar</Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            navigation.navigate(ScreenNames.Login, { title: "Login" });
          }}
          className="text-blue-400 bg-white  px-7 py-5 rounded-r-lg"
        >
          <Text className="text-blue-400 font-semibold text-lg">Login</Text>
        </Pressable>
      </View>
      <Text className="text-zinc-400 px-20 text-center">
        Uma app para tornar
        <Text className="text-blue-400"> a tua jornada </Text>
        mais organizada e controlada!
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textColor: {
    color: "red",
  },
});
