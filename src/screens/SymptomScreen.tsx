import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="rounded-lg border-2 bg-white border-zinc-100 p-3 py-2 mx-4 w-72 mt-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center gap-2">
              <Text className="text-black font-semibold">
                Adicionar novo sintoma
              </Text>
            </View>
            <Text className="  rounded-lg">
              <Icon name="add-circle-outline" color={"black"} size={23} />
            </Text>
          </View>
        </View>
        <View className="mx-4 mt-4 p-3">
          <View className="flex-row justify-start items-center mb-3">
            <Text className="text-zinc-400 text-base">
              Últimos Sintomas(
              {symptomsCounter.count})
            </Text>
          </View>
          {symptomsCounter.count ? (
            symptoms.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="p-4 bg-white rounded-lg flex-row items-center mb-3 relative"
              >
                <Text>
                  <Icon
                    name={"fitness-outline"}
                    size={24}
                    color="#2563EB"
                    className="mr-4"
                  />
                </Text>
                <View key={item.id} className="overflow-hidden text-wrap ps-3">
                  <Text className="text-zinc-900 font-medium">{item.name}</Text>
                  <Text className="text-zinc-900 font-medium flex-row justify-start items-center mt-1">
                    <Text className="text-zinc-500 pe-4">
                      severidade - {item.severity}/5
                    </Text>
                    <Icon name={"bicycle-outline"} size={14} color="#2563EB" />
                  </Text>
                  <Text className="text-zinc-600 overflow-x-hidden text-wrap text-sm mt-2">
                    {item.description}
                  </Text>
                </View>
                <View className="absolute top-3 right-6 rounded-full h-7 w-6 flex-row gap-2">
                  <Text>
                    <Icon name={"create-outline"} size={14} color="#2563EB" />
                  </Text>
                  <Text>
                    <Icon name={"trash-outline"} size={14} color="#2563EB" />
                  </Text>
                </View>
              </TouchableOpacity>
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
