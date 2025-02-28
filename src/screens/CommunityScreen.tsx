import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Contants from "expo-constants";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomTabParamList } from "../constants/types";
import { Image } from "expo-image";

type props = NativeStackScreenProps<BottomTabParamList>;

const CommunityScreen = ({ navigation, route }: props) => {
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-strecth items-center w-full"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-start items-center gap-10 px-4 w-full">
          <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white mt-5">
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-back-outline"
                size={20}
                color={"#505050"}
              ></Icon>
            </Pressable>
          </View>
          <Text className="text-xl self-center text-center text-black font-bold">
            Comunidade de apoio
          </Text>
        </View>
        <View className="rounded-lg p-4 mt-2 mx-auto">
          <Text className="text-xl font-bold text-black">Grupo de Apoio</Text>
          <ScrollView
            horizontal={true}
            className="gap-2 pt-3"
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Mário
              </Text>
            </View>
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Joaquina
              </Text>
            </View>
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Estefânia
              </Text>
            </View>

            <View className="flex-1 justify-center items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <Text className="text-black font-semibold text-lg mt-1">5+</Text>
            </View>
          </ScrollView>
        </View>

        <View className="flex-row justify-between items-center my-4 px-4">
          <Text className="text-xl font-semibold text-zinc-400">
            Posts recentes
          </Text>
          <Text className="text-sm font-bold text-blue-400">Ver Todos</Text>
        </View>
        <ScrollView
          horizontal={true}
          className="px-4"
          showsHorizontalScrollIndicator={false}
        >
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="rounded-lg p-4 mt-2 mx-auto">
          <Text className="text-xl font-bold text-black">Novos Artigos</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row justify-center items-center bg-green-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-green-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-green-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-green-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
          </ScrollView>
        </View>
        <View className="rounded-lg p-4 mt-2 mx-auto">
          <Text className="text-xl font-bold text-black">Novas Dicas</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row justify-center items-center bg-zinc-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                VIDEO
              </Text>
              <View className="text-black font-light bg-zinc-300/35 rounded-2xl px-4 py-2 absolute top-2 right-3">
                <Icon name="expand-outline" color={"black"} size={25}></Icon>
              </View>
            </View>
            <View className="flex-row justify-center items-center bg-zinc-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                VIDEO
              </Text>
              <View className="text-black font-light bg-zinc-300/35 rounded-2xl px-4 py-2 absolute top-2 right-3">
                <Icon name="expand-outline" color={"black"} size={25}></Icon>
              </View>
            </View>
            <View className="flex-row justify-center items-center bg-zinc-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                VIDEO
              </Text>
              <View className="text-black font-light bg-zinc-300/35 rounded-2xl px-4 py-2 absolute top-2 right-3">
                <Icon name="expand-outline" color={"black"} size={25}></Icon>
              </View>
            </View>
            <View className="flex-row justify-center items-center bg-zinc-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                VIDEO
              </Text>

              <View className="text-black font-light bg-zinc-300/35 rounded-2xl px-4 py-2 absolute top-2 right-3">
                <Icon name="expand-outline" color={"black"} size={25}></Icon>
              </View>
            </View>
          </ScrollView>
        </View>

        <View className="rounded-lg p-4 mt-2 mx-auto">
          <View className="flex-col justify-center items-center gap-3">
            <View className="flex-row justify-between items-center bg-green-400/15  p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    alignContent: "center",
                    borderWidth: 2,
                    borderColor: "#fff",
                    backgroundColor: "#ccc",
                  }}
                  source={require("../../assets/whatsapp-icon.png")}
                ></Image>
                <Text className="text-lg font-semibold text-black">
                  Ir Comunidade Do whatsapp
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
            <View className="flex-row justify-between items-center bg-blue-500  p-4 rounded-lg text-white">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="logo-facebook" color={"white"} size={28}></Icon>

                <Text className="text-lg font-semibold text-white">
                  Ir Comunidade Do Facebook
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#fff"}
                size={30}
              ></Icon>
            </View>
            <View className="flex-row justify-between items-center bg-blue-400  p-4 rounded-lg text-white">
              <View className="flex-row justify-between items-center gap-4 ">
                <View className="-rotate-45">
                  <Icon name="send-sharp" color={"white"} size={28}></Icon>
                </View>
                <Text className="text-lg font-semibold text-white">
                  Ir Comunidade Do Telegram
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#fff"}
                size={30}
              ></Icon>
            </View>
          </View>
        </View>

        {/* <View className="py-3 w-full flex-col items-start justify-center px-4">
        <View className="relative w-[80%]">
          <TextInput
            placeholder="Pesquisa pela comunidade"
            className="py-4 px-4 ps-7 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
          ></TextInput>
          <View className="absolute left-2 top-4">
            <Icon name="search-outline" color={"black"} size={15}></Icon>
          </View>
        </View>

        <View className="mt-3 flex-col items-start justify-center">
          <Text className="text-lg self-center text-start text-black font-bold mb-3 ">
            Publicações em destaques
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View className="flex-col justify-center items-start gap-3">
        <View className="flex-row justify-between items-center bg-green-400/15  p-4 rounded-lg">
          <View className="flex-row justify-between items-center gap-4">
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                alignContent: "center",
                borderWidth: 2,
                borderColor: "#fff",
                backgroundColor: "#ccc",
              }}
              source={require("../../assets/whatsapp-icon.png")}
            ></Image>
            <Text className="text-lg font-semibold text-black">
              Ir Comunidade Do whatsapp
            </Text>
          </View>
          <Icon
            style={{ alignSelf: "flex-end" }}
            name="chevron-forward-outline"
            color={"#999"}
            size={30}
          ></Icon>
        </View>
        <View className="flex-row justify-between items-center bg-blue-500  p-4 rounded-lg text-white">
          <View className="flex-row justify-between items-center gap-4">
            <Icon name="logo-facebook" color={"white"} size={28}></Icon>

            <Text className="text-lg font-semibold text-white">
              Ir Comunidade Do Facebook
            </Text>
          </View>
          <Icon
            style={{ alignSelf: "flex-end" }}
            name="chevron-forward-outline"
            color={"#fff"}
            size={30}
          ></Icon>
        </View>
        <View className="flex-row justify-between items-center bg-blue-400  p-4 rounded-lg text-white">
          <View className="flex-row justify-between items-center gap-4 ">
            <View className="-rotate-45">
              <Icon name="send-sharp" color={"white"} size={28}></Icon>
            </View>
            <Text className="text-lg font-semibold text-white">
              Ir Comunidade Do Telegram
            </Text>
          </View>
          <Icon
            style={{ alignSelf: "flex-end" }}
            name="chevron-forward-outline"
            color={"#fff"}
            size={30}
          ></Icon>
        </View>
      </View> */}
      </ScrollView>
    </View>
  );
};

export default CommunityScreen;
