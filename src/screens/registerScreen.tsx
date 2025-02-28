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

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const RegisterScreen = ({ route, navigation }: props) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-1 justify-center items-stretch px-10 pt-6"
    >
      <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-10 text-center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={28} color={"#505050"}></Icon>
        </Pressable>
      </View>
      <ScrollView className="">
        <Text className="text-5xl text-zinc-400 py-5">
          Olá, Registra a sua conta!
        </Text>

        <View className="flex flex-col gap-2">
          <View>
            <Text className="text-zinc-400 pb-2">Primeiro Nome</Text>
            <TextInput
              placeholder="Primeiro Nome"
              className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
            ></TextInput>
          </View>
          <View>
            <Text className="text-zinc-400 pb-2">Último Nome</Text>
            <TextInput
              placeholder="Último Nome"
              className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
            ></TextInput>
          </View>
          <View>
            <Text className="text-zinc-400 pb-2">Email</Text>
            <TextInput
              placeholder="Email"
              className="active:ring-1 ring-blue-300 ring-offset-1 ring-offset-blue-200 py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
            ></TextInput>
          </View>
          <View>
            <Text className="text-zinc-400 pb-2">Password</Text>
            <TextInput
              placeholder="Password"
              className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
            ></TextInput>
          </View>
          <View className="py-4 flex-row justify-center items-stretch gap-2 ms-2">
            {/* <Checkbox style={styles.checkbox} value={} onValueChange={setChecked} /> */}
            <CheckBox
              value={isChecked}
              onValueChange={setChecked}
              className="pt-1 ms-2"
            />
            <Text className="text-zinc-400 pb-2 opacity-80">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Iste{" "}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.Landing, { title: "Landing" });
            }}
            className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Registrar
            </Text>
          </TouchableOpacity>
        </View>

        <View className=" pb-12">
          <Text className="text-center text-zinc-300 pb-3 mt-4">
            Ou Registrar Com
          </Text>

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
