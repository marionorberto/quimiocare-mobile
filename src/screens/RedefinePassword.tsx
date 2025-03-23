import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Contants from "expo-constants";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const RedefineScreenPassword = ({ route, navigation }: props) => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleRedefine = () => {
    alert("metodo ainda não implementado!");
    navigation.navigate("Login", { title: "login" });
  };

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-1 justify-center items-stretch px-10 pt-6 pb-8"
    >
      <Text className="text-5xl text-zinc-900 py-5">
        Redifina a sua Password!
      </Text>
      <View className="flex flex-col gap-2">
        <View className="mt-2">
          <Text className="text-zinc-700 mb-1">Password</Text>
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-3"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            keyboardType="visible-password"
          />
        </View>
        <View className="mt-2">
          <Text className="text-zinc-700 mb-1">Repete a Password</Text>
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-3"
            placeholder="Password"
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            keyboardType="visible-password"
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleRedefine();
          }}
          className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25"
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
