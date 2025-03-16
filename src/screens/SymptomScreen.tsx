import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const SymptomsScreen = ({ route, navigation }: props) => {
  const [symptoms, setSymptoms] = useState([
    { id: 1, symptom: "Náusea", date: "2023-03-10" },
    { id: 2, symptom: "Fadiga", date: "2023-03-11" },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("day");
  const [newSymptom, setNewSymptom] = useState("");

  const handleAddSymptom = () => {
    if (newSymptom) {
      setSymptoms([
        ...symptoms,
        {
          id: symptoms.length + 1,
          symptom: newSymptom,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setNewSymptom("");
    }
  };

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

      {/* Filtro */}
      {/* <View className="flex-row justify-between items-center mb-6">
        <Picker
          selectedValue={selectedFilter}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        >
          <Picker.Item label="Hoje" value="day" />
          <Picker.Item label="Semana" value="week" />
          <Picker.Item label="Mês" value="month" />
        </Picker> 
      </View> */}

      {/* Lista de Sintomas */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {symptoms.map((item) => (
          <View
            key={item.id}
            className="bg-zinc-100 p-4 rounded-lg mb-4 flex-row justify-between items-center"
          >
            <Text className="text-zinc-900">{item.symptom}</Text>
            <Text className="text-zinc-500 text-sm">{item.date}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Adicionar Sintoma */}
      <View className="flex-row items-center bg-zinc-200 p-4 rounded-lg">
        <TextInput
          value={newSymptom}
          onChangeText={setNewSymptom}
          placeholder="Adicionar novo sintoma..."
          className="flex-1 px-4 py-2 bg-white rounded-lg"
        />
        <TouchableOpacity
          onPress={handleAddSymptom}
          className="ml-2 bg-blue-500 p-3 rounded-lg"
        >
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SymptomsScreen;
