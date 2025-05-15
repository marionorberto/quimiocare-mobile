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
import { TextInput, Switch } from "react-native";
import { useTheme } from "../helpers/theme-context";
import { moodDayFeeling } from "../constants/data";
import { handleIsUserLoggedIn } from "../services/authService";
import { handleSaveDaily } from "../services/daily/create-daily";
import { Picker } from "@react-native-picker/picker";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const ActivityRegisterScreen = ({ route, navigation }: props) => {
  const [painLevel, setPainLevel] = useState("");
  const [collateralEffect, setCollateralEffect] = useState("");
  const [sleepWell, setSleepWell] = useState(false);
  const [emoccioanlState, setemoccioanlState] = useState("");
  const [hidratedToday, sethidratedToday] = useState(false);
  const [feedToday, setFeedToday] = useState(false);
  const [exercicesToday, setExercicesToday] = useState(false);
  const [tiredLevelToday, setTiredLevelToday] = useState("");
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("normal");

  const onSaveDaily = () => {
    handleSaveDaily(
      painLevel,
      collateralEffect,
      sleepWell,
      emoccioanlState,
      hidratedToday,
      feedToday,
      exercicesToday,
      tiredLevelToday,
      note
    );

    navigation.navigate("Main", { title: "" });
    alert("Registo diário registrado com sucesso ✨!");
  };

  const moodFeeling = moodDayFeeling;
  const { theme, toggleTheme } = useTheme();
  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        backgroundColor: theme === "dark" ? undefined : "#f1f1f1",
      }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-4 ${theme === "dark" ? "bg-neutral-900" : ""}`}
    >
      <View className="flex-row justify-start items-center gap-10 px-4 mb-4">
        <View
          className={`border-[1px] p-[3px] rounded-md ${theme === "dark" ? "bg-neutral-900 border-zinc-600" : "bg-white border-zinc-200"}`}
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
          className={`text-xl self-center text-center font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Registo de Actividades
        </Text>
      </View>
      <ScrollView
        horizontal={false}
        className={` bg-[#f1f1f1] px-4 py-6 ${theme === "dark" ? "bg-neutral-900" : ""}`}
      >
        <View
          className={`flex-row items-center justify-between mb-4 mt-4 border bg-white border-zinc-300 px-4 py-3 rounded-lg ${theme === "dark" ? "border-zinc-700" : ""}`}
        >
          <Text
            className={`text-zinc-900 font-bold ${theme === "dark" ? "text-white" : ""}`}
          >
            Bebi co os seus comprimidos?
          </Text>
          <Switch value={sleepWell} onValueChange={setSleepWell} />
        </View>

        <View
          className={`flex-row items-center justify-between mb-4 mt-2 border bg-white border-zinc-300 px-4 py-3 rounded-lg ${theme === "dark" ? "border-zinc-700" : ""}`}
        >
          <Text
            className={`text-zinc-900 font-bold ${theme === "dark" ? "text-white" : ""}`}
          >
            Novo sintoma Hoje?
          </Text>
          <Switch value={sleepWell} onValueChange={setSleepWell} />
        </View>

        <Text
          className={`text-zinc-900 font-bold mb-1 ${theme === "dark" ? "text-white" : ""}`}
        >
          Quantos comprimidos tomaste?
        </Text>

        <Picker
          className="border border-zinc-300 rounded-lg px-4 py-3 mb-4"
          style={{ color: "#27272a", backgroundColor: "white" }}
          selectedValue={tiredLevelToday}
          onValueChange={(itemValue) => setTiredLevelToday(itemValue)}
        >
          <Picker.Item label="Quantos comprimidos tomaste?" value="" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="+7" value="7" />
        </Picker>

        <TouchableOpacity
          onPress={() => {
            onSaveDaily();
          }}
          className={`bg-blue-600 py-4 rounded-xl items-center`}
        >
          <Text className={`text-white text-lg font-semibold`}>
            Registrar Actividades
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-white py-4 rounded-xl items-center mb-20 mt-3`}
        >
          <Text
            onPress={() => navigation.goBack()}
            className={`text-blue-500 text-lg font-semibold`}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ActivityRegisterScreen;
