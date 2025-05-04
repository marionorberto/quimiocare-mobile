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
import CheckBox from "expo-checkbox";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const AutorizationScreen = ({ route, navigation }: props) => {
  const handleViewDetails = (id: number) => {
    console.log("Exibindo detalhes da consulta:", id);
  };

  useEffect(() => {}, []);

  const { theme, toggleTheme } = useTheme();
  const [agreed, setAgreed] = useState(false);
  const lista = [
    { id: 1, tipo: "Paciente", nome: "Maria Norberto", ativo: true },
    { id: 2, tipo: "Médico", nome: "Dr. Paulo Silva", ativo: false },
    { id: 4, tipo: "Paciente", nome: "Ana Rosa", asstivo: false },
    { id: 5, tipo: "Médico", nome: "Dra. Luísa Matos", ativo: true },
  ];

  const tipos = ["Paciente", "Médico"];

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start it{ems-center gap-10 px-4">
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
          Autorizações
        </Text>
      </View>

      <ScrollView
        className={` px-4 pt-10 ${theme === "dark" ? "bg-neutral-900" : ""}`}
        style={{ backgroundColor: theme === "dark" ? undefined : "#f1f1f1" }}
      >
        <Text
          className={`text-xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
        >
          Autorizações de Usuários
        </Text>

        {tipos.map((tipo) => (
          <View key={tipo} className="mb-6">
            <Text
              className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-zinc-800"}`}
            >
              {tipo}s
            </Text>

            {lista
              .filter((item) => item.tipo === tipo)
              .map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className={`p-4 rounded-lg flex-row items-center mb-3 relative ${theme === "dark" ? "bg-neutral-800" : "bg-white"}`}
                >
                  <Text>
                    <Icon
                      name={
                        item.tipo === "Médico"
                          ? "medkit-outline"
                          : item.tipo === "Admin"
                            ? "shield-checkmark-outline"
                            : "person-outline"
                      }
                      size={24}
                      color="#2563EB"
                    />
                  </Text>

                  <View className="overflow-hidden text-wrap ps-3">
                    <Text
                      className={`font-medium ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
                    >
                      {item.nome}
                    </Text>
                    <Text
                      className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}
                    >
                      {item.tipo}
                    </Text>
                  </View>

                  <View className="absolute top-5 right-8 rounded-full h-7 w-6 flex-row gap-2">
                    {/* <Icon
                      name={item.ativo ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color="#2563EB"
                    /> */}
                    <CheckBox
                      value={agreed}
                      onValueChange={setAgreed}
                      className="pt-[1px] ms-2"
                    />
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AutorizationScreen;
