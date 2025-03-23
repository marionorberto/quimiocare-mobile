import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Contants from "expo-constants";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const VerificationPasswordScreen = ({ route, navigation }: props) => {
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-stretch items-center px-10 pt-6"
    >
      <ScrollView>
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-10">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={28}
              color={"#505050"}
            ></Icon>
          </Pressable>
        </View>
        <Text className="text-3xl text-black py-5 mb-4">
          Introduza o código de verificação!
        </Text>
        <View className="flex flex-col gap-2">
          <View className="flex-row justify-between items-center gap-2">
            <TextInput className="bg-zinc-300/50 rounded-lg w-20 h-20 text-center text-3xl font-bold" />
            <TextInput className="bg-zinc-300/50 rounded-lg w-20 h-20 text-center text-3xl font-bold" />
            <TextInput className="bg-zinc-300/50 rounded-lg w-20 h-20 text-center text-3xl font-bold" />
            <TextInput className="bg-zinc-300/50 rounded-lg w-20 h-20 text-center text-3xl font-bold" />
          </View>
          <View className="my-4 flex-1 justify-center items-center gap-2">
            <View className="flex-row justify-center items-center gap-2">
              <Text className="text-zinc-300 pb-2 text-sm">
                Reenviar o código dentro de
              </Text>
              <Text className="pb-2 text-blue-500 text-sm font-semibold">
                as
              </Text>
            </View>
            <TouchableOpacity className="bg-zinc-300/40 rounded-lg w-24 flex-row justify-center items-center gap-2">
              <View className="flex-row justify-center items-center gap-2">
                <Text className="text-zinc-400 text-sm font-semibold ">
                  Reenviar
                </Text>
                <Icon name="send-outline" color={"#71717a"} size={18} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.RedefinePasswordScreen, {
                title: "Main",
              });
            }}
            className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25 mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Verificar
            </Text>
          </TouchableOpacity>
        </View>
        {/*
        <View
          className="grid grid-cols-3 grid-rows-4 place-items-center gap-y-4 mt-3"
          style={{
            gridTemplateColumns: " repeat(3, minmax(0, 1fr))",
            gridTemplateRows: "repeat(4, minmax(0, 1fr))",
          }}
        >
          <View className="flex-row justify-center items-center gap-3">
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">1</Text>
            </TouchableOpacity>

            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">2</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">3</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center items-center gap-3">
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">4</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">5</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">6</Text>
            </TouchableOpacity>
          </View>

           <View className="flex-row justify-center items-center gap-3">
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">7</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">8</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">9</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center items-center gap-3">
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">*</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text className="font-semibold text-zinc-500 text-2xl">0</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" rounded-lg w-20 h-20 bg-zinc-300/50 flex-1 justify-center items-center">
              <Text>
                <Icon name="remove-outline" color={"#71717a"} size={30} />
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default VerificationPasswordScreen;
