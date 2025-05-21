import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Icon from "react-native-vector-icons/Ionicons";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.CreateQuestionScreen
>;
const CreateSymptomScreen = ({ route, navigation }: props) => {
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [times, setTimes] = useState([""]);
  const [totalSupply, setTotalSupply] = useState(0);
  const [refillAt, setRefillAt] = useState(new Date());
  const [refillReminder, setRefillReminder] = useState(new Date());
  const [lastRefillDate, setRefillDate] = useState(new Date());
  const [timeReminder, setTimeReminder] = useState(new Date());
  const [reminderEnable, setReminderEnable] = useState(false);
  return (
    <View>
      <ScrollView>
        <View>
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-3 mb-3"
            placeholder="Nome do remédio"
            value={medicationName}
            onChangeText={setMedicationName}
            keyboardType="default"
          />
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-3 mb-3"
            placeholder="Dosagem. Ex: 500mg"
            value={dosage}
            onChangeText={setDosage}
            keyboardType="default"
          />
        </View>
        <View>
          <Text>Tomar durante quanto tempo?</Text>
          <View className="grid grid-cols-2 grid-rows-3">
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("Symptom", { title: "" });
              }}
            >
              wee
            </TouchableHighlight>
          </View>
          <View className="rounded-lg bg-white">
            <Icon name="alarm-outline" />
            <View></View>
            // put the check
          </View>
          <View>
            <TextInput
              className="bg-white rounded-lg p-4"
              placeholder="Adicione uma nota importante aqui!"
            />
          </View>
        </View>
        <View>
          <Text>Tempo de Medicação</Text>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Symptom", { title: "" });
            }}
          >
            <View className="bg-black rounded-3xl  w-48 h-32 p-3 flex-col justify-between">
              <View className="p-1 flex-row justify-between items-center">
                <Text className="font-bold text-lg text-white/90">
                  Sintomas
                </Text>
                <View className="bg-white rounded-full p-2">
                  <Text>
                    <Icon
                      name="walk-outline"
                      color={"rgb(148 163 184 / 0.6)"}
                    />
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-start items-center gap-1">
                <Text className="text-white"></Text>
              </View>
            </View>
          </TouchableHighlight>
          <View className="rounded-lg bg-white">
            <Icon name="alarm-outline" />
            <View></View>
            // put the check
          </View>
          <View>
            <TextInput
              className="bg-white rounded-lg p-4"
              placeholder="Adicione uma nota importante aqui!"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateSymptomScreen;
