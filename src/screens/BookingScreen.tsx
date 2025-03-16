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
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type appointmentType = {
  id: number;
  doctor: string;
  date: string;
  time: string;
};

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const BookingScreen = ({ route, navigation }: props) => {
  const [appointments, setAppointments] = useState<appointmentType[]>([
    { id: 1, doctor: "Dr. João Silva", date: "2023-03-10", time: "10:00 AM" },
    { id: 2, doctor: "Dra. Ana Costa", date: "2023-03-12", time: "03:00 PM" },
    { id: 2, doctor: "Dra. Ana Costa", date: "2023-03-12", time: "03:00 PM" },
    { id: 2, doctor: "Dra. Ana Costa", date: "2023-03-12", time: "03:00 PM" },
  ]);

  const handleViewDetails = (id: number) => {
    console.log("Exibindo detalhes da consulta:", id);
  };

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#505050"} />
          </Pressable>
        </View>
        <Text className="text-xl self-center text-center text-black font-bold">
          Consultas Agendadas
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-5 px-4">
          {appointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              onPress={() => handleViewDetails(appointment.id)}
              className="bg-white p-4 rounded-lg mb-4"
            >
              <Text className="text-zinc-900 font-medium">
                {appointment.doctor}
              </Text>
              <Text className="text-zinc-500">{appointment.date}</Text>
              <Text className="text-zinc-500">{appointment.time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingScreen;
