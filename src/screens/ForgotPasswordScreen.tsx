import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Constants from "expo-constants";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const ForgotPasswordScreen = ({ route, navigation }: props) => {
  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch px-10 pt-6 pb-8"
    >
      <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-10 text-center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={28} color={"#505050"}></Icon>
        </Pressable>
      </View>
      <Text className="text-3xl text-black mt-6">Recupere a sua password!</Text>
      <View className="flex flex-col gap-2 mt-4">
        <View>
          <Text className="text-zinc-400 text-lg pb-2">Email</Text>
          <TextInput
            placeholder="Teu Email"
            className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNames.VerificationPassword, {
              title: "Verificação de password",
            });
          }}
          className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Submeter
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-7 flex-1 justify-center items-center">
        <Text className="text-zinc-400">
          Voltar?
          <Pressable
            className="ps-2"
            onPress={() =>
              navigation.navigate(ScreenNames.RedefinePasswordScreen, {
                title: "redefinir",
              })
            }
          >
            <Text className="text-blue-400">Login</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  textColor: {
    color: "red",
  },
});
