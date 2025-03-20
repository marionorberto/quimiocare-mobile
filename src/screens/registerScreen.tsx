import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Contants from "expo-constants";
import CheckBox from "expo-checkbox";
import Icon from "react-native-vector-icons/Ionicons";
import { Image } from "expo-image";
import { handleRegister } from "../services/authService";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames.Register>;

const RegisterScreen = ({ route, navigation }: props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const { userType } = route.params;

  const register = async () => {
    if (!agreed) return;
    if (!firstname || !lastname || !email || !password) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    try {
      await handleRegister(firstname, lastname, email, password, userType);
      navigation.navigate("GatherProfileFirstScreen", { title: "Login" });
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
      className="flex-1 justify-center items-stretch px-10 pt-6"
    >
      <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-8 text-center mb-3">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={22} color={"#505050"}></Icon>
        </Pressable>
      </View>
      <ScrollView className="">
        <Text className="text-5xl text-zinc-900 py-5">
          Olá, Registra a sua conta!
        </Text>

        <View className="flex flex-col gap-2">
          <View>
            <Text className="text-zinc-700 mb-1">Primeiro Nome</Text>

            <TextInput
              className="border border-zinc-300 rounded-lg px-4 py-3"
              placeholder="Primeiro Nome"
              value={firstname}
              onChangeText={setFirstname}
              keyboardType="default"
            />
          </View>
          <View className="mt-1">
            <Text className="text-zinc-700 mb-1">Último Nome</Text>
            <TextInput
              className="border border-zinc-300 rounded-lg px-4 py-3"
              placeholder="Último Nome"
              value={lastname}
              onChangeText={setLastname}
              keyboardType="default"
            />
          </View>
          <View className="mt-1">
            <Text className="text-zinc-700 mb-1">Email</Text>
            <TextInput
              className="border border-zinc-300 rounded-lg px-4 py-3"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View className="mt-1">
            <Text className="text-zinc-700 mb-1">Password</Text>
            <TextInput
              className="border border-zinc-300 rounded-lg px-4 py-3"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              keyboardType="visible-password"
            />
          </View>
          <View className="py-4 flex-row justify-center items-stretch gap-2 ms-2">
            {/* <Checkbox style={styles.checkbox} value={} onValueChange={setChecked} /> */}
            <CheckBox
              value={agreed}
              onValueChange={setAgreed}
              className="pt-1 ms-2"
            />
            <Text className="text-zinc-400 pb-2 ">
              Concordo com todos os termos de uso
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              register();
              // navigation.navigate("GatherProfileFirstScreen", { title: "" });
            }}
            className={`text-white ${agreed ? "bg-blue-500" : "bg-zinc-300"} px-5 py-5 rounded-lg ring-1 ring-blue-400/25`}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Registrar
            </Text>
          </TouchableOpacity>
        </View>

        <View className=" pb-12">
          <Text className="text-center text-zinc-400 pb-3 mt-4">
            Ou Registrar Com
          </Text>

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
              Já tem uma conta?
            </Text>
            <Pressable
              className="flex-row justify-center items-center"
              onPress={() =>
                navigation.navigate(ScreenNames.Login, { title: "Login" })
              }
            >
              <Text className="text-blue-400 ps-2">Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
