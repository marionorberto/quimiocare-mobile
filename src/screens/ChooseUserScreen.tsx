import { View, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenName from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { EnumTypeUser } from "../constants/enums";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.ChooseUserScreen
>;

const ChooseUserScreen = ({ route, navigation }: props) => {
  const [userType, setUserType] = useState(EnumTypeUser.paciente);
  const [userTypeDoctorButtonPressed, setUserTypeDoctorButtonPressed] =
    useState(false);
  const [userTypePatientButtonPressed, setUserTypePatientButtonPressed] =
    useState(false);

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
          Voltar
        </Text>
      </View>

      <View className="flex-col justify-center items-center gap-4 mt-10">
        <Text className="text-5xl text-zinc-900 py-5">
          Escolha perfil desejado!
        </Text>
        <TouchableOpacity
          className={`bg-zinc-200 p-4 rounded-lg mb-2 w-80 ${userTypePatientButtonPressed ? "bg-zinc-400 border-2 border-zinc-400" : ""}`}
          onPress={() => {
            setUserType(EnumTypeUser.paciente);
            setUserTypePatientButtonPressed(!userTypePatientButtonPressed);
            setUserTypeDoctorButtonPressed(false);
          }}
        >
          <Text className="text-zinc-800 font-bold text-center text-3xl">
            🧑🏾‍🦱Paciente
          </Text>
          <Text className="text-zinc-500 text-sm mt-1 text-center">
            Poderás ter uma experiència que te ajudará gerir o teu progresso com
            a doença
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-zinc-200 p-4 rounded-lg mb-2 w-80 ${userTypeDoctorButtonPressed ? "bg-zinc-400 border-2 border-zinc-400" : ""}`}
          onPress={() => {
            setUserType(EnumTypeUser.doctor);
            setUserTypeDoctorButtonPressed(!userTypeDoctorButtonPressed);
            setUserTypePatientButtonPressed(false);
          }}
        >
          <Text className="text-zinc-800 font-bold text-center text-3xl">
            👨🏽‍⚕️Doctor
          </Text>
          <Text className="text-zinc-500 text-sm mt-1 text-center">
            Poderás auxiliar pessoas que estejam a passar por uma doença!
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center gap-4 mt-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-zinc-300 p-4 rounded-lg"
        >
          <Text className="text-zinc-900">Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!userTypeDoctorButtonPressed && !userTypePatientButtonPressed) {
              Alert.alert(
                "Perfil de Usuário",
                "Deve selecionar pelo menos um perfil para avançar!"
              );
              return;
            }
            navigation.navigate("Register", {
              title: "Página de Registro",
              userType: userType,
            });
          }}
          className="bg-blue-500 p-4 rounded-lg"
        >
          <Text className="text-white">Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseUserScreen;
