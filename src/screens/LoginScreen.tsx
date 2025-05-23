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
import { useTheme } from "../helpers/theme-context";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames.Login>;

const LoginScreen = ({ route, navigation }: props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const Login = async () => {
    if (!email || !password)
      return Alert.alert(
        "⚠️ Erro Tentando fazer login",
        "🚫Email e a Senha são obrigatórias, tente novamente!"
      );

    try {
      let { typeUser, idUser, username } = await handleLogin(email, password);

      console.log({ typeUser, idUser, username });
      typeUser = typeUser.toLowerCase();

      if (typeUser == "paciente") {
        navigation.navigate("Main", {
          idUser: idUser,
          username: username,
          typeUser: typeUser,
        });
      } else if (typeUser == "doctor") {
        navigation.navigate("MainMedicoScreen", {
          idUser: idUser,
          username: username,
          typeUser: typeUser,
        });
      } else if (typeUser == "admin") {
        navigation.navigate("AdminMainScreen", {
          idUser: idUser,
          username: username,
          typeUser: typeUser,
        });
      } else {
        alert("usuário inválido");
        navigation.navigate("Login", { title: "sc" });
      }
    } catch (error: any) {
      Alert.alert(
        "⚠️Tentando fazer login",
        `🚫 ${error.response.data.message}`
      );
    }
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className={`flex-1 justify-center items-stretch px-10 pt-6 pb-8 ${theme === "dark" ? "bg-neutral-900" : ""}`}
    >
      <View
        className={`w-8 border-[1px]  p-[3px] rounded-md  ${theme === "dark" ? "bg-neutral-900 border-zinc-600" : "bg-white border-zinc-200"}`}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            color={theme === "dark" ? "#fff" : "#000"}
            name="chevron-back-outline"
            size={22}
          ></Icon>
        </Pressable>
      </View>

      <Text
        className={`text-5xl  py-5 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
      >
        Olá, Bem-vindo de volta!
      </Text>
      <View className="flex flex-col gap-2">
        <View>
          <Text
            className={` mb-1 ${theme === "dark" ? "text-white" : "text-zinc-700"}`}
          >
            Email
          </Text>
          <TextInput
            className={`border border-zinc-300 rounded-lg px-4 py-3 mb-3 ${theme === "dark" ? "placeholder:text-white text-white" : ""}`}
            placeholder="Teu Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View className="mt-2">
          <Text
            className={` mb-1 ${theme === "dark" ? "text-white" : "text-zinc-700"}`}
          >
            Password
          </Text>
          <View className="relative">
            <TextInput
              className={`border border-zinc-300 rounded-lg px-4 py-3  ${theme === "dark" ? "placeholder:text-white text-white" : ""}`}
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
              name={`${isVisiblePassword ? "eye-outline" : "eye-off-outline"}`}
              color={theme === "dark" ? "white" : "black"}
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
        {/* <Text className="text-center text-zinc-400 pb-3">Ou Entrar Com</Text> */}

        {/* <View className="flex-row gap-4 justify-center items-stretch mb-4 mt-1">
          <View>
            <Pressable
              onPress={() => alert("redirecionar para google provider")}
              className="py-4 px-5 bg-zinc-300/50 rounded-lg flex-row justify-center items-center gap-2"
            >
              <Image
                source={require("../../assets/icon-google.svg")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                className={` ${theme === "dark" ? "text-white" : "text-zinc-400"}`}
              >
                Google
              </Text>
            </Pressable>
          </View>
        </View> */}
        <View className="flex-row justify-center items-center mt-1">
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
