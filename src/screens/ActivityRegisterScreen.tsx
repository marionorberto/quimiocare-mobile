import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";

import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { useTheme } from "../helpers/theme-context";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const ActivityRegisterScreen = ({ navigation }: props) => {
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [wentToConsultation, setWentToConsultation] = useState(false);
  const [consultationType, setConsultationType] = useState("");
  const [symptomsPersist, setSymptomsPersist] = useState(false);
  const [notes, setNotes] = useState("");

  const { theme } = useTheme();

  const onSaveActivity = () => {
    // Aqui você pode salvar os dados conforme necessidade
    alert(
      `Salvo:\nRemédio: ${selectedMedicine || "Nenhum"}\nConsulta: ${
        wentToConsultation ? consultationType : "Não foi"
      }\nSintomas persistentes: ${symptomsPersist ? "Sim" : "Não"}\nNotas: ${notes}`
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
        {/* Picker para o remédio tomado */}
        <Text
          className={`text-zinc-900 font-bold mb-1 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Qual remédio tomou hoje? 💊
        </Text>
        <Picker
          className="border border-zinc-300 rounded-lg bg-white px-4 py-3 mb-6"
          style={{ color: "#27272a", backgroundColor: "white" }}
          selectedValue={selectedMedicine}
          onValueChange={(itemValue) => setSelectedMedicine(itemValue)}
        >
          <Picker.Item label="Nenhum" value="" />
          <Picker.Item label="Paracetamol" value="paracetamol" />
          <Picker.Item label="Ibuprofeno" value="ibuprofeno" />
          <Picker.Item label="Amoxicilina" value="amoxicilina" />
          <Picker.Item label="Dipirona" value="dipirona" />
          <Picker.Item label="Outros" value="outros" />
        </Picker>

        {/* Switch para consulta e picker para escolher especialidade */}
        <View
          className={`flex-row items-center justify-between mb-4 bg-white border border-zinc-300 rounded-lg px-4 py-3 ${
            theme === "dark" ? "border-zinc-700" : ""
          }`}
        >
          <Text
            className={`text-zinc-900 font-bold ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            Foi à consulta médica? 🩺
          </Text>
          <Switch
            value={wentToConsultation}
            onValueChange={setWentToConsultation}
          />
        </View>

        {wentToConsultation && (
          <>
            <Text
              className={`text-zinc-900 font-bold mb-1 ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              Qual consulta foi?
            </Text>
            <Picker
              className="border border-zinc-300 rounded-lg bg-white px-4 py-3 mb-6"
              style={{ color: "#27272a", backgroundColor: "white" }}
              selectedValue={consultationType}
              onValueChange={(itemValue) => setConsultationType(itemValue)}
            >
              <Picker.Item label="Selecione a especialidade" value="" />
              <Picker.Item label="Cardiologia" value="cardiologia" />
              <Picker.Item label="Dermatologia" value="dermatologia" />
              <Picker.Item label="Neurologia" value="neurologia" />
              <Picker.Item label="Ortopedia" value="ortopedia" />
              <Picker.Item label="Ginecologia" value="ginecologia" />
              <Picker.Item label="Pediatria" value="pediatria" />
              <Picker.Item label="Outros" value="outros" />
            </Picker>
          </>
        )}

        {/* Switch para sintomas */}
        <View
          className={`flex-row items-center justify-between mb-4 bg-white border border-zinc-300 rounded-lg px-4 py-3 ${
            theme === "dark" ? "border-zinc-700" : ""
          }`}
        >
          <Text
            className={`text-zinc-900 font-bold ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            Os sintomas de ontem permanecem?
          </Text>
          <Switch value={symptomsPersist} onValueChange={setSymptomsPersist} />
        </View>

        {/* Observações */}
        <Text
          className={`text-zinc-900 font-bold mb-1 mt-2 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Observações
        </Text>
        <TextInput
          className={`bg-white text-zinc-900 font-bold px-4 py-5 h-24 rounded-lg text-base mb-6 ${
            theme === "dark" ? "bg-zinc-800 text-white" : ""
          }`}
          multiline
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
          placeholder="Escreva algo importante aqui..."
          placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"}
        />

        {/* Botões */}
        <TouchableOpacity
          onPress={onSaveActivity}
          className="bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          <Text className="text-white text-lg font-semibold">Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white py-4 rounded-xl items-center mb-20"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-blue-500 text-lg font-semibold">Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ActivityRegisterScreen;
