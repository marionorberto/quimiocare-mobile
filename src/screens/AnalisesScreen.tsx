import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../services/api";
import { useTheme } from "../helpers/theme-context";

const lista = [
  { id: 1, tipo: "Paciente", nome: "Maria João", ativo: true },
  { id: 2, tipo: "Médico", nome: "Dr. Paulo Silva", ativo: false },
  { id: 3, tipo: "Admin", nome: "Carlos Lopes", ativo: true },
];

type appointmentType = {
  id: number;
  doctor: string;
  date: string;
  time: string;
};

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

export default function AnalisesScreen({ route, navigation }: props) {
  const dados = [
    {
      id: 1,
      name: "Adesão à Medicação",
      severity: 4,
      description: "80% dos pacientes estão seguindo corretamente.",
    },
    {
      id: 2,
      name: "Presença nas Consultas",
      severity: 3,
      description: "Algumas ausências foram registradas.",
    },
    {
      id: 3,
      name: "Participação nos Tratamentos",
      severity: 5,
      description: "Alta adesão e envolvimento dos pacientes.",
    },
  ];

  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-14 ${theme === "dark" ? "bg-neutral-900" : ""}`}
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View
          className={`border-[1px]  p-[3px] rounded-md  ${theme === "dark" ? "bg-neutral-900 border-zinc-600" : "bg-white border-zinc-200"}`}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={theme === "dark" ? "#fff" : "#505050"}
            />
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center  font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Análises
        </Text>
      </View>
      <ScrollView
        className={`flex-1 px-4 pt-10 ${theme === "dark" ? "bg-neutral-900" : ""}`}
        style={{ backgroundColor: theme === "dark" ? undefined : "#f1f1f1" }}
      >
        <Text className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
          Análises
        </Text>
        {dados.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="p-4 bg-white rounded-lg flex-row items-center mb-3 relative"
          >
            <Text>
              <Icon name="fitness-outline" size={24} color="#2563EB" />
            </Text>
            <View className="overflow-hidden text-wrap ps-3">
              <Text className="text-zinc-900 font-medium">{item.name}</Text>
              <Text className="text-zinc-900 font-medium flex-row justify-start items-center mt-1">
                <Text className="text-zinc-500 pe-4">
                  severidade - {item.severity}/5
                </Text>
                <Icon name="analytics-outline" size={14} color="#2563EB" />
              </Text>
              <Text className="text-zinc-600 text-sm mt-2">
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
