import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Contants from "expo-constants";
import { Image } from "expo-image";
import { handleLogin } from "../services/authService";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const LoginScreen = ({ route, navigation }: props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const Login = async () => {
    if (!email || !password) return alert("Email e a Senha são obrigatórias!");

    try {
      await handleLogin(email, password);
      navigation.navigate("Main", { title: "Main" });
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

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
      <Text className="text-5xl text-zinc-900 py-5">
        Olá, Bem-vindo de volta!
      </Text>
      <View className="flex flex-col gap-2">
        <View>
          <Text className="text-zinc-700 mb-1">Email</Text>
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-3 mb-3"
            placeholder="Teu Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View className="mt-2">
          <Text className="text-zinc-700 mb-1">Password</Text>
          <View className="relative">
            <TextInput
              className="border border-zinc-300 rounded-lg px-4 py-3"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={isVisiblePassword}
              // keyboardType="visible-password"
            />

            <Icon
              onPress={() => {
                setIsVisiblePassword(!isVisiblePassword);
              }}
              name="eye-off-outline"
              color={"black"}
              size={22}
              className="absolute right-4 top-3"
            />
          </View>
        </View>
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
            Login();
            // navigation.navigate("Main", { title: "ad" });
          }}
          className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-stretch">
        <Text className="text-center text-zinc-400 pb-3">Ou Entrar Com</Text>

        <View className="flex-row gap-4 justify-center items-stretch mb-4 mt-1">
          <View>
            <Pressable
              onPress={() => alert("redirecionar para google provider")}
              className="py-4 px-5 bg-zinc-300/50 rounded-lg flex-row justify-center items-center gap-2"
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
              className="py-4 px-5 bg-zinc-300/50 rounded-lg flex-row justify-center items-center gap-2"
            >
              <Icon name="logo-facebook"></Icon>
              <Text className="text-zinc-400">Facebook</Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-row justify-center items-center">
          <Text className=" text-zinc-400 text-center flex-row justify-center items-center">
            Não tem uma conta?
          </Text>
          <Pressable
            className="flex-row justify-center items-center"
            onPress={() =>
              navigation.navigate(ScreenNames.ChooseUserScreen, {
                title: "Choose user profile",
              })
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
