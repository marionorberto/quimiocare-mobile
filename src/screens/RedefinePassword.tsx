import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Contants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const RedefineScreenPassword = ({ route, navigation }: props) => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isVisibleForPassword, setIsVisibleForPassword] = useState(false);
  const [isVisibleForRepeatPassword, setIsVisibleForRepeatPassword] =
    useState(false);

  const handleRedefine = () => {
    alert("metodo ainda não implementado!");
    navigation.navigate("Login", { title: "login" });
  };

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch px-10  pb-8 pt-14"
    >
      <Text className="text-xl text-zinc-900 pb-5">
        Redefina a sua Password!
      </Text>
      <View className="flex flex-col gap-2">
        <View className="relative">
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-3"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isVisibleForPassword}
          />

          <Icon
            onPress={() => {
              setIsVisibleForPassword(!isVisibleForPassword);
            }}
            name={`${isVisibleForPassword ? "eye-outline" : "eye-off-outline"}`}
            color={"black"}
            size={22}
            className="absolute right-4 top-3"
          />
        </View>
        <View className="relative">
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-3"
            placeholder="Repete a Password"
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            secureTextEntry={isVisibleForRepeatPassword}
          />

          <Icon
            onPress={() => {
              setIsVisibleForRepeatPassword(!isVisibleForRepeatPassword);
            }}
            name={`${isVisibleForRepeatPassword ? "eye-outline" : "eye-off-outline"}`}
            color={"black"}
            size={22}
            className="absolute right-4 top-3"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleRedefine();
          }}
          className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25 mt-2"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Redefinir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RedefineScreenPassword;
