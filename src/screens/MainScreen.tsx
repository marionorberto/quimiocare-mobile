import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../constants/types";
import Modal from "../components/Modal";
import api from "../services/api";

type props = NativeStackScreenProps<BottomTabParamList>;

const MainScreen = ({ navigation, route }: props) => {
  const [openModalAddMedication, setOpenModalAddMedication] = useState(false);
  const [openModalAddSymptom, setOpenModalAddSymptom] = useState(false);
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState(0);
  const [description, setDescription] = useState("");
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [notes, setNotes] = useState("");
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tipsData, setTipsData] = useState({
    id: "",
    description: "",
    category: {
      id: "",
      description: "",
      createdAt: "",
      updateAt: "",
    },
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    await api
      .get("/tips/tip")
      .then(({ data: res }) => {
        setTipsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View className="">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: Contants.statusBarHeight,
          backgroundColor: "white",
          paddingBottom: 20,
        }}
      >
        <View className="flex-row justify-between items-center px-4  pt-8">
          <View className="flex-row justify-start items-strech gap-3">
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                alignContent: "center",
                borderWidth: 2,
                borderColor: "#fff",
                backgroundColor: "#ccc",
              }}
              source={require("../../assets/user.png")}
            />
          </View>
          <View className="p-[6px] rounded-full relative bg-slate-300/30">
            <Pressable
              onPress={() => {
                navigation.navigate(ScreenNames.Notification);
              }}
            >
              <Text>
                <Icon
                  name="notifications-outline"
                  size={28}
                  color={"#505050"}
                />
              </Text>
            </Pressable>
            <View className="bg-red-500 absolute top-1 right-2 rounded-xl h-2 w-2"></View>
          </View>
        </View>
        <View className="flex-row justify-start items-center gap-3 rounded-full bg-zinc-100 p-3 w-[13rem] mt-5 ms-3">
          <View className="flex-1 justify-center items-center rounded-full bg-white p-[1px]">
            <TouchableHighlight
              onPress={() => alert("Deve mostrar apenas dados de hoje")}
            >
              <Text className="font-bold text-base text-black p-1">Hoje</Text>
            </TouchableHighlight>
          </View>
          <View className="flex-1 justify-center items-center rounded-xl p-1">
            <TouchableHighlight
              onPress={() => alert("Deve mostrar apenas dados semanais")}
            >
              <Text className="font-bold text-base text-black">Semana</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View className="flex-row justify-center gap-2 mt-3">
          <View className="grid-cols-2 grid-row-2  gap-2 mt-3">
            <TouchableHighlight
              onPress={() => {
                // navigation.navigate("Medic");
              }}
            >
              <View className="bg-zinc-300/50 rounded-3xl  w-48 h-32 p-3 flex-col justify-between">
                <View className="p-1 flex-row justify-between items-center">
                  <Text className="font-bold text-lg">Remédios</Text>
                  <View className="bg-white rounded-full p-2">
                    <Icon
                      name="water-outline"
                      color={"rgb(148 163 184 / 0.6)"}
                    />
                  </View>
                </View>
                <View className="flex-row justify-start items-center gap-1">
                  <Text className="text-black text-2xl font-bold">45</Text>
                  <Text className="text-zinc-500"></Text>
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                alert("abrir a pagina correspondente");
              }}
            >
              <View className="bg-blue-500 rounded-3xl  w-48 h-32 p-3 flex-col justify-between">
                <View className="p-1 flex-row justify-between items-center">
                  <Text className="font-bold text-lg text-white/95">
                    Consultas
                  </Text>
                  <View className="bg-white rounded-full p-2">
                    <Text>
                      <Icon
                        name="thermometer-outline"
                        color={"rgb(148 163 184 / 0.6)"}
                      />
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-start items-center gap-1">
                  <Text className="text-white/90 text-2xl font-bold">55</Text>
                  <Text className="text-white/90"></Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View className="grid-cols-2 grid-row-2  gap-2 mt-3 ">
            <TouchableHighlight
              onPress={() => {
                alert("abrir a pagina correspondente");
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
                  <Text className="text-white text-2xl font-bold">45</Text>
                  <Text className="text-white"></Text>
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                alert("abrir a pagina correspondente");
              }}
            >
              <View className="bg-slate-300 rounded-3xl  w-48 h-32 p-3 flex-col justify-between">
                <View className="p-1 flex-row justify-between items-center">
                  <Text className="font-bold text-lg">Relatórios</Text>
                  <View className="bg-white rounded-full p-2">
                    <Icon
                      name="receipt-outline"
                      color={"rgb(148 163 184 / 0.6)"}
                    />
                  </View>
                </View>
                <View className="flex-row justify-start items-center gap-1">
                  <Text className="text-black text-2xl font-bold">80</Text>
                  <Text className="text-zinc-600"></Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View className="mt-5 border-2 border-zinc-300 p-4">
          <View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row justify-start">
                <Text>💡</Text>
                <Text className="font-bold text-black  text-lg ps-2">
                  Dica Do Dia
                </Text>
              </View>
              <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[7px]">
                {tipsData.category.description}
              </Text>
            </View>
            <Text className="p-3 text-base">{tipsData.description}</Text>
          </View>
        </View>
        <View className="mt-5">
          <Pressable
            onPress={() => {
              setOpenModalAddSymptom(true);
            }}
          >
            <View className="rounded-lg border-2 border-zinc-300 p-4 mx-2">
              <View className="flex-row justify-between items-center">
                <View className="flex-row justify-start items-center gap-2">
                  <Text>
                    <Icon name="menu-outline" color={"black"} size={24} />
                  </Text>
                  <Text className="text-black font-semibold">
                    Adicionar novo sintoma
                  </Text>
                </View>
                <Text className="border-zinc-100 border-2 rounded-lg">
                  <Icon name="add-outline" color={"black"} size={23} />
                </Text>
              </View>
              <Modal isOpen={openModalAddSymptom} withInput={false}>
                <View className="p-6 bg-white rounded-2xl w-full max-w-md shadow-lg">
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-semibold text-zinc-900">
                      Adicionar Sintoma
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setOpenModalAddSymptom(false);
                      }}
                    >
                      <Icon name="close" size={24} color="#4A4A4A" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-zinc-700 mb-1">Nome do sintoma</Text>
                  <TextInput
                    className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
                    placeholder="Ex: Náusea, Fadiga..."
                    value={symptom}
                    onChangeText={setSymptom}
                  />
                  <Text className="text-zinc-700 mb-1">Descrição</Text>
                  <TextInput
                    className="border border-zinc-300 rounded-lg px-4 py-2 mb-3 h-20"
                    placeholder="Detalhe os sintomas, duração, intensidade..."
                    multiline
                    value={description}
                    onChangeText={setDescription}
                  />
                  <Text className="text-zinc-700 mb-1">Intensidade</Text>
                  <View className="flex-row gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <TouchableOpacity
                        key={level}
                        onPress={() => setSeverity(level)}
                      >
                        <Icon
                          name={level <= severity ? "star" : "star-outline"}
                          size={24}
                          color={level <= severity ? "#3B82F6" : "#D1D5DB"}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TouchableOpacity
                    className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
                    onPress={() => {
                      onSaveSymptoms({ symptom, severity, description });
                      setOpenModalAddSymptom(false);
                    }}
                  >
                    <Icon
                      name="save"
                      size={20}
                      color="white"
                      className="mr-2"
                    />
                    <Text className="text-white text-center font-semibold">
                      Salvar Sintoma
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setOpenModalAddMedication(true);
            }}
          >
            <View className="rounded-lg border-2 border-zinc-300 p-4 mx-2 mt-3">
              <View className="flex-row justify-between items-center">
                <View className="flex-row justify-start items-center gap-2">
                  <Text>
                    <Icon name="menu-outline" color={"black"} size={24} />
                  </Text>
                  <Text className="text-black font-semibold">
                    Adicionar novo Medicamento
                  </Text>
                </View>
                <Text className="border-zinc-100 border-2 rounded-lg">
                  <Icon name="add-outline" color={"black"} size={23} />
                </Text>
              </View>
              <Modal isOpen={openModalAddMedication} withInput={false}>
                <View className="p-6 bg-white rounded-2xl w-full max-w-md shadow-lg">
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-semibold text-zinc-900">
                      Adicionar Medicamento
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setOpenModalAddMedication(false);
                      }}
                    >
                      <Icon name="close" size={24} color="#4A4A4A" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-zinc-700 mb-1">
                    Nome do Medicamento
                  </Text>
                  <TextInput
                    className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
                    placeholder="Ex: Paracetamol, Ibuprofeno..."
                    value={medicationName}
                    onChangeText={setMedicationName}
                  />
                  <Text className="text-zinc-700 mb-1">Dosagem</Text>
                  <TextInput
                    className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
                    placeholder="Ex: 500mg, 1 comprimido..."
                    value={dosage}
                    onChangeText={setDosage}
                  />
                  <Text className="text-zinc-700 mb-1">Notas (Opcional)</Text>
                  <TextInput
                    className="border border-zinc-300 rounded-lg px-4 py-2 mb-3 h-20"
                    placeholder="Observações sobre o uso..."
                    multiline
                    value={notes}
                    onChangeText={setNotes}
                  />
                  <Text className="text-zinc-700 mb-1">
                    Horário do Lembrete
                  </Text>
                  <TouchableOpacity
                    className="border border-zinc-300 rounded-lg px-4 py-3 flex-row items-center justify-between mb-3"
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text className="text-zinc-700">
                      {reminderTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                    <Icon name="time-outline" size={20} color="#3B82F6" />
                  </TouchableOpacity>

                  {/* {showTimePicker && (
                    <DateTimePicker
                      value={reminderTime}
                      mode="time"
                      display="default"
                      onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) setReminderTime(selectedTime);
                      }}
                    />
                  )} */}
                  <TouchableOpacity
                    className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
                    onPress={() => {
                      onSaveMedication({
                        medicationName,
                        dosage,
                        notes,
                        reminderTime,
                      });

                      setOpenModalAddMedication(false);
                    }}
                  >
                    <Icon
                      name="save"
                      size={20}
                      color="white"
                      className="mr-2"
                    />
                    <Text className="text-white text-center font-semibold">
                      Salvar Medicamento
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const onSaveSymptoms = ({
  symptom,
  severity,
  description,
}: {
  symptom: string;
  severity: number;
  description: string;
}) => {
  console.log({ symptom, severity, description });
};

const onSaveMedication = ({
  medicationName,
  dosage,
  notes,
  reminderTime,
}: {
  medicationName: string;
  dosage: string;
  notes: string;
  reminderTime: Date;
}) => {
  console.log({
    medicationName,
    dosage,
    notes,
    reminderTime,
  });
};

export default MainScreen;
