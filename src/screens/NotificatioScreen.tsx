import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import React from "react";
import Contants from "expo-constants";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../constants/types";

type props = NativeStackScreenProps<BottomTabParamList>;

const NotificatioScreen = ({ navigation, route }: props) => {
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch px-4 bg-white pt-6"
    >
      <ScrollView>
        <View className="pb-20">
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center gap-10">
              <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
                <Pressable onPress={() => navigation.goBack()}>
                  <Text>
                    <Icon
                      name="chevron-back-outline"
                      size={20}
                      color={"#505050"}
                    ></Icon>
                  </Text>
                </Pressable>
              </View>
              <Text className="text-xl self-center text-center text-black font-bold">
                Notificações
              </Text>
            </View>

            <Pressable
              onPress={() => {
                navigation.navigate("Setting");
              }}
            >
              <View>
                <Text>
                  <Icon
                    name="settings-outline"
                    color={"black"}
                    size={18}
                  ></Icon>
                </Text>
              </View>
            </Pressable>
          </View>

          <View className="rounded-2xl border-zinc-300 border-2 w-full mt-5 pb-6">
            <View className="rounded-t-2xl border-zinc-300 border-t-2 w-full h-14 bg-zinc-300/40 p-4 flex-row justify-between items-center">
              <View className="flex-row justify-start items-center gap-2">
                <Icon
                  name="notifications-sharp"
                  color={"black"}
                  size={20}
                ></Icon>
                <Text className="font-bold text-lg">Lista de Notificações</Text>
              </View>
              <View className="flex-row justify-end items-center gap-2">
                <Icon name="funnel-outline" color={"black"} size={20}></Icon>

                <Icon
                  name="ellipsis-vertical-outline"
                  color={"black"}
                  size={20}
                ></Icon>
              </View>
            </View>
            <View className="flex-row justify-between items-center mt-3 p-1">
              <Text className="font-semibold ">15 Notificações</Text>
              <View className="relative ">
                <View className="absolute left-1 top-3">
                  <Icon name="search-outline" color={"black"} size={20}></Icon>
                </View>
                <TextInput
                  placeholder="Pesquisa pelo Nome"
                  className="ps-7 py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
                ></TextInput>
              </View>
            </View>
            <View className="flex-row justify-around items-center border-t-2 border-zinc-200 mt-2 pt-2">
              <View className="flex-row justify-center items-center gap-3 border-black border-b-2 pb-2 w-[32%]">
                <Text className="px-2 py-1 bg-white rounded-xl text-zinc-500">
                  4
                </Text>
                <Text className="text-zinc-500 font-bold">Todas</Text>
              </View>
              <View className="flex-row justify-center items-center gap-3 border-black border-b- pb-2 w-[36%]">
                <Text className="px-2 py-1 bg-white rounded-xl text-zinc-500">
                  6
                </Text>
                <Text className="text-zinc-500 font-bold">Arquivadas</Text>
              </View>
              <View className="flex-row justify-center items-center gap-3 border-black border-b- pb-2 w-[32%]">
                <Text className="px-2 py-1 bg-white rounded-xl text-zinc-500">
                  7
                </Text>
                <Text className="text-zinc-500 font-bold">Favoritas</Text>
              </View>
            </View>
            <Pressable onPress={() => alert("notification modal")}>
              <View className="flex-row justify-between items-center mt-4 px-1">
                <View className="flex-row  items-center gap-2">
                  <Icon name="star-outline" color={"black"} size={20}></Icon>
                  <Icon name="save-outline" color={"black"} size={20}></Icon>
                </View>
                <Text className="text-base text-black font-semibold">
                  Lorem ipsum dolor sit amet or ...
                </Text>
                <Icon name="trash-bin-outline" color={"red"} size={20}></Icon>
              </View>
            </Pressable>
            <Pressable onPress={() => alert("notification modal")}>
              <View className="flex-row justify-between items-center mt-4 px-1">
                <View className="flex-row  items-center gap-2">
                  <Icon name="star-outline" color={"black"} size={20}></Icon>
                  <Icon name="save-outline" color={"black"} size={20}></Icon>
                </View>
                <Text className="text-base text-black font-semibold">
                  Lorem ipsum dolor sit amet or ...
                </Text>
                <Icon name="trash-bin-outline" color={"red"} size={20}></Icon>
              </View>
            </Pressable>
            <Pressable onPress={() => alert("notification modal")}>
              <View className="flex-row justify-between items-center mt-4 px-1">
                <View className="flex-row  items-center gap-2">
                  <Icon name="star-outline" color={"black"} size={20}></Icon>
                  <Icon name="save-outline" color={"black"} size={20}></Icon>
                </View>
                <Text className="text-base text-black font-semibold">
                  Lorem ipsum dolor sit amet or ...
                </Text>
                <Icon name="trash-bin-outline" color={"red"} size={20}></Icon>
              </View>
            </Pressable>
            <Pressable onPress={() => alert("notification modal")}>
              <View className="flex-row justify-between items-center mt-4 px-1">
                <View className="flex-row  items-center gap-2">
                  <Icon name="star-outline" color={"black"} size={20}></Icon>
                  <Icon name="save-outline" color={"black"} size={20}></Icon>
                </View>
                <Text className="text-base text-black font-semibold">
                  Lorem ipsum dolor sit amet or ...
                </Text>
                <Icon name="trash-bin-outline" color={"red"} size={20}></Icon>
              </View>
              <Pressable onPress={() => alert("notification modal")}>
                <View className="flex-row justify-between items-center mt-4 px-1">
                  <View className="flex-row  items-center gap-2">
                    <Icon name="star-outline" color={"black"} size={20}></Icon>
                    <Icon name="save-outline" color={"black"} size={20}></Icon>
                  </View>
                  <Text className="text-base text-black font-semibold">
                    Lorem ipsum dolor sit amet or or ...
                  </Text>
                  <Icon name="trash-bin-outline" color={"red"} size={20}></Icon>
                </View>
              </Pressable>
            </Pressable>
          </View>

          <View className="flex-col justify-center items-start mt-6">
            <View>
              <Text className="text-lg font-bold">
                Seu relatório semanal está pronto✨
              </Text>
            </View>
            <View className="flex-row justify-center items-center gap-4 mt-5">
              <View className="bg-zinc-500/20 rounded-xl">GRÁFICO</View>
              <View className="">
                <Text className="text-lg text-zinc-400">Tendência</Text>
                <Text className="text-base rounded-xl bg-blue-300/15 text-blue-500 font-bold py-2 px-3">
                  Sintomas Estáveis
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-col justify-center items-start mt-5 p-2 ">
            <Text className="text-black font-bold text-lg">
              ⚠️ Alertas Importantes
            </Text>
            <View>
              <Text className="text-red-500 py-3 px-2 bg-red-300/15 mt-3">
                "Possível interação medicamentosa detectada! Consulte o seu
                médico!
              </Text>
              <Text className="text-red-500 py-3 px-2 bg-red-300/15 mt-3">
                "Atenção! Sua temperatura está acima do normal. Se persistir,
                procure ajuda médica."
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificatioScreen;
