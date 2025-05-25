import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";

import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { useTheme } from "../helpers/theme-context";
import api from "../services/api";
import { Image } from "expo-image";
import { EnumEmojis } from "../constants/enums";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.ActivityRegisterScreen
>;

const ActivityRegisterScreen = ({ navigation }: props) => {
  const [allActivities, setActivities] = useState({
    symptoms: [
      {
        id: "",
        name: "",
        description: "",
        severity: 0,
        createdAt: "",
        updatedAt: "",
      },
    ],
    appointments: [
      {
        id: "",
        name: "",
        description: "",
        dateAppointment: "",
        type: "",
        statusAppointment: "",
        note: "",
        createdAt: "",
        updatedAt: "",
      },
    ],
    medications: [
      {
        id: "",
        name: "",
        dosage: "",
        note: "",
        timeReminder: "",
        createdAt: "",
        updatedAt: "",
      },
    ],
  });
  const { theme } = useTheme();

  const fetchLastActivities = () => {
    api
      .get("ativities/lastActivities")
      .then(({ data: res }) => {
        setActivities(res.data);
        res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLastActivities();
  }, []);

  const onSaveActivity = () => {
    // api.post()
    Alert.alert(
      EnumEmojis.OK + "Registar Actividade",
      "A tua actividade foi registrada com sucesso!"
    );
    navigation.goBack();
  };

  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        backgroundColor: theme === "dark" ? undefined : "#f1f1f1",
      }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-4 ${
        theme === "dark" ? "bg-neutral-900" : ""
      }`}
    >
      <View className="flex-row justify-start items-center gap-10 px-4 mb-4">
        <View
          className={`border-[1px] p-[3px] rounded-md ${
            theme === "dark"
              ? "bg-neutral-900 border-zinc-600"
              : "bg-white border-zinc-200"
          }`}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Registo de Atividades
        </Text>
      </View>
      <ScrollView
        horizontal={false}
        className={`px-4 py-6 ${
          theme === "dark" ? "bg-neutral-900" : "bg-[#f1f1f1]"
        }`}
      >
        <View className="flex-row justify-center">
          <TouchableOpacity
            className={` p-4 rounded-lg mb-2 w-80 bg-zinc-200 border-2 border-zinc-300 flex-col items-center`}
            onPress={() => {}}
          >
            <Text className="text-4xl">⚠️</Text>
            <Text className="text-zinc-500 text-lg mt-1 text-center">
              <Text className="text-black font-bold">QUIMIOCARE</Text> precisa
              saber como está indo o seu tratamento. Por Favor confirma os dados
              referentes ao dia de ontem relativamente aos seus tratamentos
              registrados!
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          className={`text-zinc-900 font-bold mb-1 mt-5 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Remédios que deverias tomar ontem 💊
        </Text>
        {allActivities.medications.length > 0 ? (
          allActivities.medications.map((item) => (
            <View
              key={item.id}
              className={`flex-row items-center justify-between mb-4 bg-white border border-zinc-300 rounded-lg px-4 py-3 ${
                theme === "dark" ? "border-zinc-700" : ""
              }`}
            >
              <Text
                className={`text-zinc-900 font-bold ${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                {item.name} 💊
              </Text>
              <Switch
              // value={wentToConsultation}
              // onValueChange={setWentToConsultation}
              />
            </View>
          ))
        ) : (
          <View
            className={`flex-row items-center justify-center mb-4 bg-white border border-zinc-300 rounded-lg px-4 py-3 ${
              theme === "dark" ? "border-zinc-700" : ""
            }`}
          >
            <Text className="text-center text-yellow-500">
              Sem remédios cadastrados de ontem
            </Text>
          </View>
        )}

        <Text
          className={`text-zinc-900 font-bold mb-1 mt-5 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Consultas que deverias ter ido ontem 🩺
        </Text>
        {allActivities.appointments.length > 0 ? (
          allActivities.appointments.map((item) => (
            <View
              key={item.id}
              className={`flex-row items-center justify-between mb-4 bg-white border border-zinc-300 rounded-lg px-4 py-3 ${
                theme === "dark" ? "border-zinc-700" : ""
              }`}
            >
              <Text
                className={`text-zinc-900 font-bold ${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                {item.description} 🩺
              </Text>
              <Switch
              // value={wentToConsultation}
              // onValueChange={setWentToConsultation}
              />
            </View>
          ))
        ) : (
          <View
            className={`flex-row items-center justify-center mb-4 bg-white border border-zinc-300 rounded-lg px-4 py-3 ${
              theme === "dark" ? "border-zinc-700" : ""
            }`}
          >
            <Text className="text-center text-yellow-500">
              Sem consultas cadastradas de ontem
            </Text>
          </View>
        )}

        <Text
          className={`text-zinc-900 font-bold mb-1 mt-5 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Quais Sintomas registados ontem prevalecem 🤒
        </Text>
        {allActivities.symptoms.length > 0 ? (
          allActivities.symptoms.map((item) => (
            <View
              key={item.id}
              className={`flex-row items-center justify-between mb-4 bg-white border border-zinc-300 rounded-lg px-4 py-3 ${
                theme === "dark" ? "border-zinc-700" : ""
              }`}
            >
              <Text
                className={`text-zinc-900 font-bold ${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                {item.description} 🤒
              </Text>
              <Switch
              // value={wentToConsultation}
              // onValueChange={setWentToConsultation}
              />
            </View>
          ))
        ) : (
          <View
            className={`flex-row items-center justify-center mb-4 bg-white border border-zinc-300 rounded-lg px-4 py-3 ${
              theme === "dark" ? "border-zinc-700" : ""
            }`}
          >
            <Text className="text-center text-yellow-500">
              Sem consultas sintomas de ontem
            </Text>
          </View>
        )}
        {allActivities.medications.length ||
        allActivities.appointments.length ||
        allActivities.symptoms.length ? (
          <TouchableOpacity
            onPress={onSaveActivity}
            className="bg-blue-600 py-4 rounded-xl items-center mb-4"
          >
            <Text className="text-white text-lg font-semibold">Registrar</Text>
          </TouchableOpacity>
        ) : (
          ""
        )}

        <TouchableOpacity
          className="bg-white py-4 rounded-xl items-center mb-20 mt-5"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-blue-500 text-lg font-semibold">Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ActivityRegisterScreen;
