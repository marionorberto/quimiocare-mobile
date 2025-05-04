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

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const DailScreen = ({ route, navigation }: props) => {
  const [painLevel, setPainLevel] = useState("");
  const [collateralEffect, setCollateralEffect] = useState("");
  const [sleepWell, setSleepWell] = useState(false);
  const [emotionalState, setEmotionalState] = useState("");
  const [hydratedToday, setHydratedToday] = useState(false);
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
      emotionalState,
      hydratedToday,
      feedToday,
      exercicesToday,
      tiredLevelToday,
      note
    );

    navigation.navigate("Medical", { title: "" });
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
          Registo diário
        </Text>
      </View>
      <ScrollView
        horizontal={false}
        className={` bg-[#f1f1f1] px-4 py-6 ${theme === "dark" ? "bg-neutral-900" : ""}`}
      >
        <Text
          className={`text-2xl font-bold text-zinc-900 mb-6 ${theme === "dark" ? "text-white" : ""}`}
        >
          Como se sente hoje? ☺️
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className=" mt-3"
        >
          {moodFeeling.map((val) => (
            <Pressable
              key={val.description}
              onPress={() => {
                setFilter(val.description.toLowerCase());
              }}
            >
              <View
                key={val.description}
                className={`flex-col justify-center items-center gap-0 p-4 rounded-xl border-2 border-zinc-400/30 w-24 h-24 me-4 ${filter == val.description.toLowerCase() ? "bg-blue-500/60" : ""} `}
              >
                <View key={val.description}>
                  <Text className="text-[2rem] text-center">{val.emoji}</Text>
                  <View className="w-20 h-11 rounded-2xl flex-col justify-stretch items-center">
                    <Text className="text-slate-700 font-semibold">
                      {val.description}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* <TextInput
          className={`bg-zinc-100 text-zinc-900 px-4 py-2 rounded-lg mb-4 ${theme === "dark" ? "bg-zinc-800 text-white" : ""}`}
          keyboardType="numeric"
          value={painLevel}
          onChangeText={setPainLevel}
          placeholder="Ex: 5"
          placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
        /> */}

        <Text
          className={`text-zinc-900 mt-4 mb-1 ${theme === "dark" ? "text-white" : ""}`}
        >
          Efeitos colaterais💊
        </Text>
        <TextInput
          className={`bg-white text-zinc-900 px-4 py-5 rounded-lg mb-4 ${theme === "dark" ? "bg-zinc-800 text-white" : ""}`}
          value={collateralEffect}
          onChangeText={setCollateralEffect}
          placeholder="Ex: Náuseas"
          placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
        />

        <View
          className={`flex-row items-center justify-between mb-4 border border-zinc-300 px-4 py-3 rounded-lg ${theme === "dark" ? "border-zinc-700" : ""}`}
        >
          <Text
            className={`text-zinc-900 ${theme === "dark" ? "text-white" : ""}`}
          >
            Dormiu bem? 😴
          </Text>
          <Switch value={sleepWell} onValueChange={setSleepWell} />
        </View>

        <Text
          className={`text-zinc-900 mb-1 ${theme === "dark" ? "text-white" : ""}`}
        >
          Estado emocional
        </Text>
        <TextInput
          className={`bg-white text-zinc-900 px-4 py-5 rounded-lg mb-4 ${theme === "dark" ? "bg-zinc-800 text-white" : ""}`}
          value={emotionalState}
          onChangeText={setEmotionalState}
          placeholder="Ex: Ansioso, calmo..."
          placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
        />

        <View
          className={`flex-row items-center justify-between mb-4 border border-zinc-300 px-4 py-3 rounded-lg ${theme === "dark" ? "border-zinc-700" : ""}`}
        >
          <Text
            className={`text-zinc-900 ${theme === "dark" ? "text-white" : ""}`}
          >
            Hidratou-se hoje?💧
          </Text>
          <Switch value={hydratedToday} onValueChange={setHydratedToday} />
        </View>

        <View
          className={`flex-row items-center justify-between mb-4 border border-zinc-300 px-4 py-3 rounded-lg ${theme === "dark" ? "border-zinc-700" : ""}`}
        >
          <Text
            className={`text-zinc-900 ${theme === "dark" ? "text-white" : ""}`}
          >
            Alimentou-se bem?☕
          </Text>
          <Switch value={feedToday} onValueChange={setFeedToday} />
        </View>

        <View
          className={`flex-row items-center justify-between mb-4 border border-zinc-300 px-4 py-3 rounded-lg ${theme === "dark" ? "border-zinc-700" : ""}`}
        >
          <Text
            className={`text-zinc-900 ${theme === "dark" ? "text-white" : ""}`}
          >
            Fez exercícios hoje?🏃🏿
          </Text>
          <Switch value={exercicesToday} onValueChange={setExercicesToday} />
        </View>

        <Text
          className={`text-zinc-900 mb-1 ${theme === "dark" ? "text-white" : ""}`}
        >
          Nível de cansaço🥱
        </Text>
        <TextInput
          className={`bg-white text-zinc-900 px-4 py-5 rounded-lg mb-4 ${theme === "dark" ? "bg-zinc-800 text-white" : ""}`}
          value={tiredLevelToday}
          onChangeText={setTiredLevelToday}
          placeholder="Ex: Muito cansado"
          placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
        />

        <Text
          className={`text-zinc-900 mb-1 ${theme === "dark" ? "text-white" : ""}`}
        >
          Observações
        </Text>
        <TextInput
          className={`bg-white text-zinc-900 px-4 py-5 h-24 rounded-lg text-base mb-6 ${theme === "dark" ? "bg-zinc-800 text-white" : ""}`}
          multiline
          textAlignVertical="top"
          value={note}
          onChangeText={setNote}
          placeholder="Escreva algo importante aqui..."
          placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
        />

        <TouchableOpacity
          onPress={() => {
            onSaveDaily();
          }}
          className={`bg-blue-600 py-4 rounded-xl items-center`}
        >
          <Text className={`text-white text-lg font-semibold`}>Registrar</Text>
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

export default DailScreen;
