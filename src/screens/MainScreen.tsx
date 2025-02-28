import { View, Text, Pressable, ScrollView } from "react-native";
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

const MainScreen = ({ navigation, route }: props) => {
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch pt-6"
    >
      <View className="flex-row justify-between items-center px-4  pt-8">
        <View className="mt-3 flex-row justify-start items-strech gap-3">
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              alignContent: "center",
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: "#ccc",
            }}
            source={require("../../assets/user.png")}
          ></Image>
          <View>
            <Text className="text-lg text-zinc-400">Olá 👋🏽, Bom Dia!</Text>
            <Text className="text-black font-semibold text-2xl">
              Mário Norberto
            </Text>
          </View>
        </View>
        <View className="border-[1px] border-zinc-300 p-[2px] rounded-md relative bg-white">
          <Pressable
            onPress={() => {
              navigation.navigate(ScreenNames.Notification);
            }}
          >
            <Icon
              name="notifications-outline"
              size={28}
              color={"#505050"}
            ></Icon>
          </Pressable>
          <View className="bg-red-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
        </View>
      </View>

      <View className="w-full bg-white rounded-t-3xl mt-4 p-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="font-semibold text-lg text-black mt-2">
            Resumo Do Dia
          </Text>
          <View className="flex-row justify-start gap-3">
            <View className="grid-cols-2 grid-row-2  gap-2 mt-3">
              <View className="rounded-3xl bg-orange-500/50 w-48 h-32 p-2"></View>
              <View className="rounded-3xl bg-violet-500/50 w-48 h-32 p-2"></View>
            </View>
            <View className="grid-cols-2 grid-row-2  gap-2 mt-3 ">
              <View className="rounded-3xl bg-blue-500/50 w-48 h-32 p-2"></View>
              <View className="rounded-3xl bg-indigo-500/50 w-48 h-32 p-2"></View>
            </View>
          </View>

          <View className="flex-row justify-start items-center  mt-2 p-4 rounded-lg gap-3">
            <View className="flex-1 justify-center items-center bg-blue-200/20  h-[5rem] rounded-xl">
              <Icon
                name="calendar-outline"
                color={"#3b82f6"}
                size={30}
                style={{ fontWeight: "bold" }}
              ></Icon>
            </View>
            <View>
              <Text className="font-bold text-xl">Última Consulta Marcada</Text>
              <Text className="font-semibold  text-zinc-500 text-lg">
                Radiologia
              </Text>
              <Text className="text-zinc-400">08h:00</Text>
            </View>
          </View>

          <View className="flex-row justify-start items-center  mt-2 p-4 rounded-lg gap-3">
            <View className="flex-1 justify-center items-center bg-blue-200/20 max-w-20 h-[5rem] rounded-xl">
              <Icon
                name="bandage-outline"
                color={"#3b82f6"}
                size={30}
                style={{ fontWeight: "bold" }}
              ></Icon>
            </View>
            <View>
              <Text className="font-bold text-xl">Próximo Remédio</Text>
              <Text className="font-semibold  text-zinc-500 text-lg">
                Paracetamol - 500mg
              </Text>
              <Text className="text-zinc-400">Às 10h:30</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-strect bg-zinc-200/20 mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4 ">
              <View className="rounded-lg bg-zinc-300/50 w-12 h-12 flex-1 justify-center items-center">
                <Text>
                  <Icon name="add-outline" color={"black"} size={30}></Icon>
                </Text>
              </View>
              <View>
                <Text className="text-lg font-semibold text-black">
                  Adicionar Sintoma
                </Text>
                <Text className="text-sm font-semibold text-zinc-300">
                  Regista um novo sintoma
                </Text>
              </View>
            </View>
            <Text className="text-[12px] text-blue-500">Ver Todos</Text>
          </View>

          <View className="flex-row justify-between items-strect bg-zinc-200/20 mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4 ">
              <View className="rounded-lg bg-zinc-300/50 w-12 h-12 flex-1 justify-center items-center">
                <Icon name="add-outline" color={"#515151"} size={30}></Icon>
              </View>
              <View>
                <Text className="text-lg font-semibold text-black">
                  Adicionar Remédio
                </Text>
                <Text className="text-sm font-semibold text-zinc-300">
                  Regista um novo remédio
                </Text>
              </View>
            </View>
            <Text className="text-[12px] text-blue-500">Ver Todos</Text>
          </View>

          <View className="rounded-lg p-4 mt-2 mx-auto">
            <Text className="text-xl font-bold text-black">Novos Artigos</Text>
            <ScrollView horizontal={true}>
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
            <ScrollView horizontal={true}>
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
            <Text className="text-xl font-bold text-black">Grupo de Apoio</Text>
            <ScrollView horizontal={true} className="gap-2 pt-3">
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
                <Text className="text-black font-semibold text-lg mt-1">
                  5+
                </Text>
              </View>
            </ScrollView>

            <View className="flex-row justify-between items-center my-4">
              <Text className="text-xl font-semibold text-zinc-400">
                Posts recentes
              </Text>
              <Text className="text-sm font-bold text-blue-400">Ver Todos</Text>
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
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainScreen;
