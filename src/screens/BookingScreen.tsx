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

type appointmentType = {
  id: number;
  doctor: string;
  date: string;
  time: string;
};

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames.Booking>;

const BookingScreen = ({ route, navigation }: props) => {
  const [appointmentCounter, setAppontmentCounter] = useState({ count: 0 });
  const [appointments, setAppointments] = useState([
    {
      id: "",
      name: "",
      description: "",
      dateAppointment: "",
      type: "",
      statusAppointment: "",
      note: "",
      createdAt: "",
    },
  ]);

  const handleViewDetails = (id: number) => {
    console.log("Exibindo detalhes da consulta:", id);
  };

  const fetchAppointment = () => {
    api
      .get("/appointments/all")
      .then(({ data: res }) => {
        setAppointments(res.data[1]);
        console.log(res.data[1]);
        setAppontmentCounter(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

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
          Minhas Consultas
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-4 p-3">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-zinc-400 text-lg">
              Todas Consultas(
              {appointmentCounter.count})
            </Text>
            <Text className="text-zinc-400 text-lg">
              <Icon name="ellipsis-horizontal-sharp" color={"#999"} size={24} />
            </Text>
          </View>
          {appointmentCounter.count ? (
            appointments.map((item) => (
              <View
                key={item.id}
                className="bg-blue-500/40 p-4 rounded-lg mb-4 flex-row justify-between items-stretch"
              >
                <View className="flex-col gap-3">
                  <Text className="text-black font-semibold text-[13px]">
                    Nome: {item.name}
                  </Text>
                  <Text className="text-zinc-700">
                    Descrição: {item.description}
                  </Text>
                  <Text className="text-zinc-700">Nota: {item.note}</Text>
                  <Text className="text-zinc-700">Tipo: {item.type}</Text>
                  <Text className="text-zinc-700">
                    Data da Consulta: {item.dateAppointment}
                  </Text>
                  <Text className="text-zinc-700">
                    status: {item.statusAppointment}
                  </Text>
                  {/* <Text className="text-zinc-700">status: {item.}</Text> */}
                </View>
                <Text className="text-zinc-500 text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
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
                Adicione um <Text className="font-bold">consultas</Text> para
                poder vê-los!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingScreen;
