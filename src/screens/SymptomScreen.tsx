import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../services/api";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const SymptomsScreen = ({ route, navigation }: props) => {
  const [symptoms, setSymptoms] = useState([
    { id: "", name: "", description: "", severity: 0, createdAt: "" },
  ]);
  const [symptomsCounter, setSymptomCounter] = useState({ count: 0 });

  const [selectedFilter, setSelectedFilter] = useState("day");
  const [newSymptom, setNewSymptom] = useState("");

  const fetchSymptom = () => {
    api
      .get("/symptoms/all")
      .then(({ data: res }) => {
        setSymptoms(res.data[1]);
        console.log(res.data[1]);
        setSymptomCounter(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSymptom();
  }, []);

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
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
          Meus Sintomas
        </Text>
      </View>

      <View className="relative w-64 ms-4 mt-5">
        <TextInput
          placeholder="Pesquisar ..."
          className="bg-white p-3 rounded-lg mb-4 ps-10"
        />
        <View className="absolute left-3 top-2">
          <Icon name="search-outline" color={"#545454"} size={21}></Icon>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="rounded-lg border-2 bg-white border-zinc-100 p-3 py-2 mx-4 w-72">
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center gap-2">
              <Text>
                <Icon name="menu-outline" color={"black"} size={24} />
              </Text>
              <Text className="text-black font-semibold">
                Adicionar novo sintoma
              </Text>
            </View>
            <Text className="border-zinc-100 border-2 rounded-lg">
              <Icon name="add-outline" color={"black"} size={23} />
            </Text>
          </View>
        </View>
        <View className="mx-4 mt-4 p-3">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-zinc-400 text-lg">
              Todos Sintomas(
              {symptomsCounter.count})
            </Text>
            <Text className="text-zinc-400 text-lg">
              <Icon name="ellipsis-horizontal-sharp" color={"#999"} size={24} />
            </Text>
          </View>
          {symptomsCounter.count ? (
            symptoms.map((item) => (
              <View
                key={item.id}
                className="bg-blue-600/50 p-4 rounded-lg mb-4 flex-row justify-between items-stretch"
              >
                <View className="flex-col  items-center">
                  <View className="flex-row justify-between items-center">
                    <View className="rounded-full h-14 w-14 bg-white/30 flex-col justify-center items-center mt-3">
                      <Icon name="sad-outline" color={"white"} size={24} />
                    </View>
                    <View className="flex-col gap-3 ps-6">
                      <Text className="text-white font-bold text-[17px]">
                        Nome - {item.name}
                      </Text>
                      <Text className="text-zinc-100 text-lg">
                        Descrição - {item.description}
                      </Text>
                      <Text className="text-zinc-100 text-lg">
                        Severidade - {item.severity}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-end items-center gap-3">
                    <Icon name="trash-outline" color={"white"} size={23} />
                    <Icon name="create-outline" color={"white"} size={23} />
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="bg-yellow-400/35 w-full p-4 rounded-lg">
              <Text className="text-yellow-600 font-semibold text-sm text-center">
                <Icon
                  name="alert-circle-outline"
                  color={"#ca8a04;"}
                  size={24}
                />
                Adicione um <Text className="font-bold">sintomas</Text> para
                poder vê-los!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SymptomsScreen;

{
  /* Filtro */
}
{
  /* <View className="flex-row justify-between items-center mb-6">
        <Picker
          selectedValue={selectedFilter}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        >
          <Picker.Item label="Hoje" value="day" />
          <Picker.Item label="Semana" value="week" />
          <Picker.Item label="Mês" value="month" />
        </Picker> 
      </View> */
}
