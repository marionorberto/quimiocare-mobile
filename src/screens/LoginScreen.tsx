import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Contants from "expo-constants";
import { Image } from "expo-image";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const LoginScreen = ({ route, navigation }: props) => {
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-1 justify-center items-stretch px-10 pt-6 pb-8"
    >
      <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-10 text-center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={28} color={"#505050"}></Icon>
        </Pressable>
      </View>
      <Text className="text-5xl text-zinc-400 py-5">
        Olá, Bem-vindo de volta!
      </Text>
      <View className="flex flex-col gap-2">
        <View>
          <Text className="text-zinc-400 text-lg pb-2">Email</Text>
          <TextInput
            placeholder="Teu Email"
            className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
          ></TextInput>
        </View>
        <View className="mt-2">
          <Text className="text-zinc-400 pb-2">Password</Text>
          <TextInput
            placeholder="Password"
            className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
          ></TextInput>
        </View>
        <View></View>
        <View>
          <Pressable
            className="flex-row justify-end items-center my-3"
            onPress={() =>
              navigation.navigate(ScreenNames.Forgot, { title: "Forgot" })
            }
          >
            <Text className="text-blue-400 ps-2">Esqueceu a Password</Text>
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNames.Main, { title: "MainScreen" });
          }}
          className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-stretch">
        <Text className="text-center text-zinc-300 pb-3">Ou Entrar Com</Text>

        <View className="flex-row gap-4 justify-center items-stretch mb-4 mt-1">
          <View>
            <Pressable
              onPress={() => alert("redirecionar para google provider")}
              className="py-4 px-5 bg-zinc-200/50 rounded-lg flex-row justify-center items-center gap-2"
            >
              <Image
                source={require("../../assets/icon-google.svg")}
                style={{ width: 20, height: 20 }}
              />
              <Text className="text-zinc-400">Google</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => alert("redirecionar para Facebook provider")}
              className="py-4 px-5 bg-zinc-200/50 rounded-lg flex-row justify-center items-center gap-2"
            >
              <Icon name="logo-facebook"></Icon>
              <Text className="text-zinc-400">Facebook</Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-row justify-center items-center">
          <Text className=" text-zinc-300 text-center flex-row justify-center items-center">
            Não tem uma conta?
          </Text>
          <Pressable
            className="flex-row justify-center items-center"
            onPress={() =>
              navigation.navigate(ScreenNames.Register, { title: "Register" })
            }
          >
            <Text className="text-blue-400 ps-2">Registar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
