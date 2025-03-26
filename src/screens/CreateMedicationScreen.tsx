import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
  Pressable,
  SafeAreaView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { SafeAreaProvider } from "react-native-safe-area-context";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const CreateMedicationScreen = ({ route, navigation }: props) => {
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [times, setTimes] = useState([""]);
  const [totalSupply, setTotalSupply] = useState(0);
  const [refillAt, setRefillAt] = useState(new Date());
  const [refillReminder, setRefillReminder] = useState(new Date());
  const [lastRefillDate, setRefillDate] = useState(new Date());
  const [timeReminder, setTimeReminder] = useState(new Date());
  const [reminderEnable, setReminderEnable] = useState(false);
  const toggleReminderEnable = () =>
    setReminderEnable((previousState) => !previousState);

  const onSetStartDate = (event: any, selectedDate?: Date) => {
    setOpenStartDate(Platform.OS === "ios");
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  return (
    <View className="flex-col justify-center items-stretch">
      <View className="relative w-full h-40 bg-blue-500 ps-10 flex-row justify-start items-center">
        <Text className="text-white text-2xl font-bold mt-5">Novo Remédio</Text>
        <View className="absolute top-10 left-4 border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-8 text-center">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={22}
              color={"#505050"}
            ></Icon>
          </Pressable>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="px-5 pb-32">
        <View className="flex-col justify-stretch items-center gap-2 mt-3 px-3">
          <TextInput
            className="bg-white  shadow-zinc-400 shadow w-full h-16 rounded-md border-none placeholder:text-zinc-500 px-4 text-lg"
            placeholder="Nome do Remédio"
            value={medicationName}
            onChangeText={setMedicationName}
            keyboardType="default"
          />
          <TextInput
            placeholder="Dosage. Ex: 500mg"
            value={dosage}
            onChangeText={setDosage}
            keyboardType="default"
            className="bg-white shadow-zinc-400 shadow w-full h-16 rounded-md border-none placeholder:text-zinc-500 px-4 text-lg mt-2"
          />
        </View>

        <View className="px-4 mt-2">
          <Text className="font-semibold text-2xl my-3 text-black/70">
            Frequência diária
          </Text>
          <View className="grid grid-cols-2  grid-rows-3 place-items-center gap-2 mt-3 px-12 gap-y-5 gap-x-8">
            <View className="flex-row gap-2 justify-center items-center">
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      1
                    </Text>
                    <Text className="text-black text-xl">Uma vez</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      2
                    </Text>
                    <Text className="text-black text-xl">Duas vezes</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row gap-2 justify-center items-center">
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      3
                    </Text>
                    <Text className="text-black text-xl">Três vezes</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      4
                    </Text>
                    <Text className="text-black text-xl">Quarto vezes</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-col justify-center items-center">
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      <Icon
                        name="speedometer-outline"
                        color={"#60a5fa"}
                        size={25}
                      ></Icon>
                    </Text>
                    <Text className="text-black text-xl">A medida</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text className="font-semibold text-2xl my-3 text-black/70 mt-8">
            Tomar durante quanto tempo?
          </Text>

          <View className="grid grid-cols-2  grid-rows-3 place-items-center gap-2 mt-3 px-12 gap-y-5 gap-x-8">
            <View className="flex-row gap-2 justify-center items-center">
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      7
                    </Text>
                    <Text className="text-black text-xl">7 Dias</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      14
                    </Text>
                    <Text className="text-black text-xl">14 Dias</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row gap-2 justify-center items-center">
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      30
                    </Text>
                    <Text className="text-black text-xl">30 Dias</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      90
                    </Text>
                    <Text className="text-black text-xl">90 Dias</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-col justify-center items-center">
              <View>
                <TouchableOpacity className="w-44 h-28 rounded-lg bg-white shadow shadow-zinc-400">
                  <View className="flex-1 justify-center items-center">
                    <Text className="font-semibold text-3xl text-blue-400">
                      <Icon
                        name="infinite-outline"
                        color={"#60a5fa"}
                        size={28}
                      ></Icon>
                    </Text>
                    <Text className="text-black text-xl">Não Definido</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Pressable
            className="mt-7"
            onPress={() => {
              alert("time comeca em");
            }}
          >
            <View className="flex-row justify-between items-center bg-white mt-2 p-5 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <View className="  rounded-full">
                  <Icon
                    name="calendar-outline"
                    color={"black"}
                    size={24}
                  ></Icon>
                </View>
                <Text className="text-lg font-semibold text-black">
                  Começa Em {startDate.toLocaleDateString()}
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
          <Pressable
            className="mt-7"
            onPress={() => {
              alert("time comeca em");
            }}
          >
            <View className="flex-row justify-between items-center bg-white mt-2 p-3 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <View className="flex-col justify-center items-start pe-2">
                  <Text className="text-lg font-semibold text-black">
                    Lembrete
                  </Text>
                  <Text className="text-base text-zinc-400">
                    Seja notificado para o tempo da medicação
                  </Text>
                </View>
              </View>
              <View>
                <SafeAreaProvider>
                  <SafeAreaView>
                    <Switch
                      trackColor={{ false: "#52525b", true: "#2563eb" }}
                      thumbColor={reminderEnable ? "#000" : "#fff"}
                      ios_backgroundColor="#fff"
                      onValueChange={toggleReminderEnable}
                      value={reminderEnable}
                    />
                  </SafeAreaView>
                </SafeAreaProvider>
              </View>
            </View>
          </Pressable>
        </View>

        <View className="flex-col justify-center items-center gap-2 px-4 mt-4">
          <Pressable
            onPress={() => alert("metodo para salvar")}
            className="bg-blue-600 w-full p-4 rounded-2xl flex-1 justify-center items-center"
          >
            <Text className="text-white flex-row justify-center items-center gap-2">
              <Icon name="save-outline" size={20}></Icon>{" "}
              <Text>Adicionar Remédio</Text>
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            className="bg-white w-full p-4 rounded-2xl flex-1 justify-center items-center mt-3 "
          >
            <Text className="text-blue-500">Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateMedicationScreen;
