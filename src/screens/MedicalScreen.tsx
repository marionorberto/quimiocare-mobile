import {
  View,
  Text,
  Pressable,
  ScrollView,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Contants from "expo-constants";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../constants/types";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { List } from "react-native-paper";

type props = NativeStackScreenProps<BottomTabParamList>;

const MedicalScreen = ({ route, navigation }: props) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full px-4 pt-8 pb-10"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-start items-center gap-10">
          <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-back-outline"
                size={20}
                color={"#505050"}
              ></Icon>
            </Pressable>
          </View>
          <Text className="text-xl self-center text-center text-black font-bold">
            Controle Médico
          </Text>
        </View>
        <View className="mt-6 bg-white rounded-xl p-4 pb-1">
          <Text className="text-3xl fonb-semibold  text-zinc-900 mx-4">
            Olá Joaquina, Como está se sentindo hoje?
          </Text>
          <View className=" flex-row justify-center items-center gap-2 mt-4">
            <View className="flex-col justify-center items-center gap-0">
              <Text className="text-[3rem]">☺️</Text>
              <View className="w-20 h-11 rounded-lg flex-col justify-stretch items-center">
                <Text className="text-zinc-700 font-semibold">Bem</Text>
              </View>
            </View>
            <View className="flex-col justify-center items-center gap-0">
              <Text className="text-[3rem]">😑</Text>

              <View className="w-20 h-11 rounded-lg flex-col justify-stretch items-center">
                <Text className="text-zinc-700 font-semibold">Normal</Text>
              </View>
            </View>
            <View className="flex-col justify-center items-center gap-0">
              <Text className="text-[3rem]">😣</Text>

              <View className="w-20 h-11 rounded-lg flex-col justify-stretch items-center">
                <Text className="text-zinc-700 font-semibold">Mal</Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View>
          <View className="mt-5 h-72 w-96">
            <View className="border-2 border-zinc-200 rounded-2xl p-3 pb-2">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-xl">
                  Joaquina, Como você se sente hoje comparado à ontem?
                </Text>
              </View>
              <View className="flex-row justify-start items-center gap-3 mt-3 border-y-2 border-zinc-300 py-3">
                <ScrollView horizontal={true}>
                  <Text className="text rounded-lg px-2 py-2 bg-blue-400/20 text-blue-500 font-bold text-nowrap me-2">
                    Muito Bem
                  </Text>
                  <Text className="text rounded-lg px-2 py-2 bg-blue-400/15 text-blue-500 font-bold me-2">
                    Bem
                  </Text>
                  <Text className="text rounded-lg px-2 py-2 bg-zinc-400/20 text-zinc-500 font-bold me-2">
                    Normal
                  </Text>
                  <Text className="text rounded-lg px-2 py-2 bg-red-400/15 text-red-500 font-bold me-2">
                    Mal
                  </Text>
                  <Text className="text rounded-lg px-2 py-2 bg-red-400/20 text-red-500 font-bold text-nowrap me-2">
                    Muito Mal
                  </Text>
                </ScrollView>
              </View>
              <View className="flex-col justify-center items-start py-3 gap-2">
                <Text className="text-black font-semibold">Resposta:</Text>
                <TouchableOpacity className=" bg-blue-600 rounded-lg px-3 py-2 flex-row gap-1">
                  <Icon name="send-outline" size={20} color={"white"}></Icon>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View> */}

        <View className="flex-row justify-start items-center">
          <Text className="mt-6 font-bold text-lg">Lembretes</Text>
        </View>
        <View className="flex-row justify-start items-center  mt-2 p-4 rounded-lg gap-3 bg-zinc-50">
          <View className="flex-1 justify-center items-center bg-blue-300/20 max-w-20 h-[5rem] rounded-xl">
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

        <View className="flex-row justify-start items-center  mt-2 p-4 rounded-lg gap-3 bg-zinc-50">
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

        <View className="flex-row justify-between items-strect bg-zinc-50 mt-2 p-4 rounded-lg">
          <View className="flex-row justify-between items-center gap-4 ">
            <View className="rounded-lg bg-zinc-300/50 w-12 h-12 flex-1 justify-center items-center">
              <Icon name="add-outline" color={"black"} size={25}></Icon>
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

        <View className="flex-row justify-between items-strect bg-zinc-50 mt-2 p-4 rounded-lg">
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

        <View className="mt-8">
          <Text className="font-semibold text-lg">Histórico De Saúde</Text>

          <List.Section title="">
            <List.Accordion
              title="Histórico De Saúde"
              left={(props) => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="Histórico De Consultas" />
              <List.Item title="Consultar Sintomas" />
              <List.Item title="elatórios Médicos" />
            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalScreen;
