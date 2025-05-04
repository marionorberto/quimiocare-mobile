import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const HealthHistoryScreen = ({ route, navigation }: props) => {
  const [selectedTab, setSelectedTab] = useState("consultations");

  const consultations = [
    {
      id: 1,
      date: "10/02/2024",
      doctor: "Dr. João Silva",
      diagnosis: "Check-up geral",
    },
    {
      id: 2,
      date: "25/03/2024",
      doctor: "Dra. Maria Souza",
      diagnosis: "Exames laboratoriais",
    },
  ];

  const medications = [
    {
      id: 1,
      name: "Paracetamol",
      dosage: "500mg",
      frequency: "2x ao dia",
      startDate: "10/02/2024",
    },
    {
      id: 2,
      name: "Omeprazol",
      dosage: "20mg",
      frequency: "1x ao dia",
      startDate: "15/03/2024",
    },
  ];

  const healthData = [
    {
      id: 1,
      date: "10/02/2024",
      weight: "70kg",
      bloodPressure: "120/80",
      glucose: "90 mg/dL",
    },
    {
      id: 2,
      date: "25/03/2024",
      weight: "69kg",
      bloodPressure: "118/78",
      glucose: "85 mg/dL",
    },
  ];

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-6"
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
          Relatórios Médicos
        </Text>
      </View>

      <View className="mt-6 px-4">
        {/* Abas de Navegação */}
        <View className="flex-row justify-between mb-4">
          {[
            {
              key: "consultations",
              label: "Consultas",
              icon: "calendar-outline",
            },
            {
              key: "medications",
              label: "Medicamentos",
              icon: "medkit-outline",
            },
            {
              key: "healthData",
              label: "Dados de Saúde",
              icon: "pulse-outline",
            },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setSelectedTab(tab.key)}
              className={`flex-1 items-center py-2 rounded-lg ${
                selectedTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-200"
              }`}
            >
              <Icon
                name={tab.icon}
                size={20}
                color={selectedTab === tab.key ? "white" : "#2563EB"}
              />
              <Text
                className={
                  selectedTab === tab.key
                    ? "text-white font-medium"
                    : "text-zinc-900"
                }
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conteúdo Dinâmico com Scroll */}
        <ScrollView showsVerticalScrollIndicator={false} className="mb-6">
          {selectedTab === "consultations" && (
            <View>
              <Text className="text-lg font-semibold text-zinc-900 mb-2">
                📅 Histórico de Consultas
              </Text>
              {consultations.map((item) => (
                <View key={item.id} className="p-4 bg-zinc-100 rounded-lg mb-3">
                  <Text className="text-zinc-900 font-medium">{item.date}</Text>
                  <Text className="text-zinc-700">👨‍⚕️ {item.doctor}</Text>
                  <Text className="text-zinc-700">📝 {item.diagnosis}</Text>
                </View>
              ))}
            </View>
          )}

          {selectedTab === "medications" && (
            <View>
              <Text className="text-lg font-semibold text-zinc-900 mb-2">
                💊 Histórico de Medicamentos
              </Text>
              {medications.map((item) => (
                <View key={item.id} className="p-4 bg-zinc-100 rounded-lg mb-3">
                  <Text className="text-zinc-900 font-medium">{item.name}</Text>
                  <Text className="text-zinc-700">
                    📏 Dosagem: {item.dosage}
                  </Text>
                  <Text className="text-zinc-700">
                    ⏰ Frequência: {item.frequency}
                  </Text>
                  <Text className="text-zinc-700">
                    📅 Início: {item.startDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {selectedTab === "healthData" && (
            <View>
              <Text className="text-lg font-semibold text-zinc-900 mb-2">
                📊 Dados de Saúde
              </Text>
              {healthData.map((item) => (
                <View key={item.id} className="p-4 bg-zinc-100 rounded-lg mb-3">
                  <Text className="text-zinc-900 font-medium">{item.date}</Text>
                  <Text className="text-zinc-700">⚖️ Peso: {item.weight}</Text>
                  <Text className="text-zinc-700">
                    💖 Pressão: {item.bloodPressure}
                  </Text>
                  <Text className="text-zinc-700">
                    🩸 Glicose: {item.glucose}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HealthHistoryScreen;
