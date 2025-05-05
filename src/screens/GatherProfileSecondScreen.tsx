import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { Picker } from "@react-native-picker/picker";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { createMedicalInformations } from "../services/medical-information";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const GatherProfileFirstScreen = ({ route, navigation }: props) => {
  const [stage, setStage] = useState<string>("");
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [hospital, setHospital] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [codHospital, setCodHospital] = useState<string>("");
  const [targetSupport, setTargetSupport] = useState<string>("");

  const hospitals = [
    "Intituto IACC",
    "Hospital Américo Boa Vida",
    "Lucréci Paim",
    "Instituto - IPO PORTO(Lubango)",
    "Clínica Sagrada Esperança",
    "Clínica Girassol",
  ];
  const supportWishLevel = ["EMOCIONAL", "MEDICO"];
  const stageList = [
    "estágio 0",
    "estágio I",
    "estágio II",
    "estágio III",
    "estágio IV",
  ];
  const bloodGroupList = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSaveMedicalUserInformation = async () => {
    try {
      if (!stage || !hospital || !targetSupport)
        return Alert.alert("Erro", "Campos não opcionais são obrigatórios");

      await createMedicalInformations(
        stage,
        bloodGroup,
        hospital,
        height,
        weight,
        codHospital,
        targetSupport
      );
      Alert.alert("Sucesso", "Informações Médicas cadastradas com sucesso!");
      navigation.navigate("Login", { title: "login" });
    } catch (error: any) {
      alert(`${error.message.map((error: string) => error)}`);
    }
  };

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        {/* <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={"#505050"}
            ></Icon>
          </Pressable>
        </View> */}
        <Text className="ps-8 text-xl self-center text-center text-black font-bold">
          Informações Médicas
        </Text>
      </View>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="px-10 pb-20">
          <Text className="text-3xl text-zinc-900 py-5">
            Regista os seus dados Médicos!
          </Text>
          <View className="flex flex-col gap-2 pt-7">
            <View>
              <Text className="text-zinc-700 mb-1">
                Código Hospital(Opcional)
              </Text>
              <TextInput
                placeholder="Ex. 1234"
                className="border border-zinc-300 rounded-lg px-4 py-3"
                value={codHospital}
                onChangeText={setCodHospital}
              />
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Estágio do cancer</Text>
              <Picker
                className="border border-zinc-300 rounded-lg px-4 py-3"
                style={{ color: "#999" }}
                selectedValue={stage}
                onValueChange={(itemValue) => setStage(itemValue)}
              >
                <Picker.Item label="Selecione o Estágio" value="" />
                {stageList.map((stage) => (
                  <Picker.Item key={stage} label={stage} value={stage} />
                ))}
              </Picker>
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">
                Grupo Sanguíneo(opcional)
              </Text>
              <Picker
                style={{ color: "#999" }}
                selectedValue={bloodGroup}
                onValueChange={(itemValue) => setBloodGroup(itemValue)}
                className="border border-zinc-300 rounded-lg px-4 py-3"
              >
                <Picker.Item label="Selecione o grupo" value="" />
                {bloodGroupList.map((group) => (
                  <Picker.Item key={group} label={group} value={group} />
                ))}
              </Picker>
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Suporte Desejado</Text>
              <Picker
                style={{ color: "#999" }}
                selectedValue={targetSupport}
                onValueChange={(itemValue) => setTargetSupport(itemValue)}
                className="border border-zinc-300 rounded-lg px-4 py-3"
              >
                <Picker.Item label="Selecione o suporte desejado" value="" />
                {supportWishLevel.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Peso kg(Opcional)</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Ex: 50"
                className="border border-zinc-300 rounded-lg px-4 py-3"
                value={weight}
                onChangeText={(text) => setWeight(text.replace(/[^0-9.]/g, ""))}
              />
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Altura(Opcional)</Text>
              <TextInput
                keyboardType="numeric"
                maxLength={3}
                placeholder="Ex: 1.75"
                className="border border-zinc-300 rounded-lg px-4 py-3"
                value={height}
                onChangeText={(text) => setHeight(text.replace(/[^0-9.]/g, ""))}
              />
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Hospital de tratamento</Text>
              <Picker
                style={{ color: "#999" }}
                selectedValue={hospital}
                onValueChange={(itemValue) => setHospital(itemValue)}
                className="border border-zinc-300 rounded-lg px-4 py-3"
              >
                <Picker.Item label="Selecione o desejado" value="" />
                {hospitals.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleSaveMedicalUserInformation();
              }}
              className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25 mt-4"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Criar Perfil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GatherProfileFirstScreen;
