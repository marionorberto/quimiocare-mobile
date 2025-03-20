import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { List } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { moodDayFeeling } from "../constants/data";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Modal from "../components/Modal";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import api from "../services/api";
import {
  handleSaveAppointment,
  handleSaveMedication,
  handleSaveSymptom,
} from "../services/mainService";
import { Picker } from "@react-native-picker/picker";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const MedicalScreen = ({ route, navigation }: props) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [openModalAddMedication, setOpenModalAddMedication] = useState(false);
  const [openModalAddSymptom, setOpenModalAddSymptom] = useState(false);
  const [openModalAddAppointment, setOpenModalAddAppointment] = useState(false);
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState(0);
  const [description, setDescription] = useState("");
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [notes, setNotes] = useState("");
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showTimePickerAppointment, setShowTimePickerAppointment] =
    useState(false);
  const [nameAppointment, setNameAppointment] = useState("");
  const [descriptionAppointment, setDescriptionAppointment] = useState("");
  const [dateAppointment, setDateAppointment] = useState(new Date());
  const [type, setType] = useState("");
  const [noteAppointment, setNoteAppointment] = useState("");
  const appointments = [
    "Consulta Médica Geral",
    "Consulta Oncológica",
    "Consulta Psicológica",
    "Consulta Nutricional",
    "Consulta de Radioterapia",
    "Consulta de Quimioterapia",
    "Consulta de Exames",
    "Consulta Paliativa",
    "Consulta Cirúrgica",
    "Consulta de Fisioterapia",
  ];

  const data = {
    labels: ["Out", "Dez", "Jan", "Fev", "Mar"],
    datasets: [
      {
        data: [20, 45, 28, 80, 90],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: false,
  };
  const [filter, setFilter] = useState("normal");
  const chartConfig = {
    backgroundGradientFrom: "#3b82f6",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#3b82f6",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgb(147 197 253 / ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const moodFeeling = moodDayFeeling;

  const onSaveMedication = async () => {
    if (!medicationName || !dosage || !reminderTime) {
      alert("Todos os campos não opcionais são obrigatórios!");
      return;
    }
    try {
      await handleSaveMedication(medicationName, dosage, notes, reminderTime);
      alert("Medicação cadastrada com sucesso!");
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };
  const handleTimeChange = (
    event: DateTimePickerEvent,
    date: Date | undefined
  ) => {
    if (date) {
      setReminderTime(date);
    }
    setShowTimePicker(false);
  };

  const onSaveSymptoms = async () => {
    if (!name || !severity || !description) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    try {
      await handleSaveSymptom(name, severity, description);
      alert("Sintoma cadastrado com sucesso!");
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const onSaveAppointment = async () => {
    if (
      !nameAppointment ||
      !descriptionAppointment ||
      !dateAppointment ||
      !type ||
      !noteAppointment
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    try {
      await handleSaveAppointment(
        nameAppointment,
        descriptionAppointment,
        dateAppointment,
        type,
        noteAppointment
      );
      alert("Consulta cadastrado com sucesso!");
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
  };

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full px-4 pt-8 pb-10"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-start items-center gap-10">
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
            Controle Médico
          </Text>
        </View>

        <View className="flex-col justify-center items-center pt-6 relative rounded-2xl bg-blue-500 p-4 px-6 my-4 mt-8 overflow-x-hidden">
          <View className="self-start">
            <View className="flex-row">
              <Text className="font-semibold text-white my-3 text-xl">
                Adesão a Medicação
              </Text>
            </View>
          </View>

          <View className="self-start mt-1 mb-2">
            <View className="flex-row justify-start items-center gap-4">
              <View className="flex-col justify-center items-start gap-1 inline">
                <Text className="font-bold text-4xl text-white">23%</Text>
                <Text className="text-white opacity-50 text-[12px]">
                  Progresso
                </Text>
              </View>
            </View>
          </View>
          <View className="pe-3">
            <LineChart
              data={{
                labels: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar"],
                datasets: [
                  {
                    data: [20, 35, 45, 28, 80, 90],
                    color: () => "rgba(255 255 255 / 0.6)",
                    strokeWidth: 2,
                  },
                ],
              }}
              width={380}
              height={170}
              withVerticalLines={false}
              withOuterLines={false}
              withHorizontalLabels={false}
              getDotColor={() => "rgba(255 255 255 / 0.6)"}
              chartConfig={{
                backgroundGradientFrom: "#3b82f6",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#3b82f6",
                labelColor: () => "rgba(255 255 255 / 0.6)",
                backgroundColor: "#3b82f6",
                backgroundGradientToOpacity: 0.5,
                color: () => "#fff",
                strokeWidth: 4,
                barPercentage: 0.6,
                useShadowColorFromDataset: false,
                propsForDots: {
                  color: "black",
                },
              }}
              bezier
            />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-black text-lg font-semibold">Sumário</Text>
          <View>
            <View className="border-b-2 border-zinc-400/35 py-3 flex-row justify-between items-center">
              <Text className="text-black text-lg font-semibold opacity-50">
                Próximo Remédio
              </Text>
              <View className="flex-row justify-center items-center gap-2 bg-blue-300/40 rounded-xl py-[3px] px-2">
                <Text className="text-[#64748b] text-sm font-semibold">
                  08:30
                </Text>
                <Icon name="eye-outline" color={"#64748b"} size={20}></Icon>
              </View>
            </View>
            <View className="border-b-2 border-zinc-400/35 py-3 flex-row justify-between items-center">
              <Text className="text-black text-lg font-semibold opacity-50">
                Próxima Consulta
              </Text>
              <View className="flex-row justify-center items-center gap-2 bg-blue-300/40 rounded-xl py-[3px] px-2">
                <Text className="text-slate-500 text-sm font-semibold">
                  7 Mar, 2025
                </Text>
                <Icon name="eye-outline" color={"#64748b"} size={20}></Icon>
              </View>
            </View>
          </View>
          <View className="mt-5 p-4 bg-blue-500 rounded-xl flex-row gap-2">
            <Text>
              <Icon name="document-outline" color={"white"} size={22}></Icon>
            </Text>
            <Text className="text-white font-semibold overflow-hidden">
              Deixe-nos entender como está se sentido hoje, para podermos
              ajudá-lo melhor
            </Text>
          </View>
          <View className="mt-5">
            <Text className="text-black text-lg font-semibold">
              Como está se sentindo hoje, Joaquina?
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
                      <Text className="text-[2rem] text-center">
                        {val.emoji}
                      </Text>
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
          </View>
          <View className="mt-4">
            <View className="flex-row justify-start items-center gap-2 mb-2">
              <Text className="text-zinc-600 text-base font-semibold">
                Adicionar notas(opcional)
              </Text>
              <Icon name="create-outline" color={"black"} size={18}></Icon>
            </View>
            <View className="flex-row justify-start items-end">
              <TextInput
                className="p-4 rounded-xl border-2 border-zinc-400/30 w-[80%] h-16 me-2"
                placeholder="*Adicione Aqui alguma nota!"
              />
              <View className=" rounded-xl h-10 flex-1 justify-center items-start">
                <Icon name="send-outline" color={"#64748b"} size={22}></Icon>
              </View>
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
                      value={name}
                      onChangeText={setName}
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
                        onSaveSymptoms();
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
                      <Text>
                        {reminderTime
                          ? reminderTime.toLocaleTimeString()
                          : "selecionar time"}
                      </Text>

                      <Icon name="time-outline" size={20} color="#3B82F6" />
                    </TouchableOpacity>

                    {showTimePicker && (
                      <DateTimePicker
                        value={reminderTime}
                        mode="time"
                        display="spinner"
                        is24Hour={true}
                        onChange={handleTimeChange}
                      />
                    )}

                    <TouchableOpacity
                      className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
                      onPress={() => {
                        onSaveMedication();
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

            <Pressable
              onPress={() => {
                setOpenModalAddAppointment(true);
              }}
            >
              <View className="rounded-lg border-2 border-zinc-300 p-4 mx-2 mt-3">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row justify-start items-center gap-2">
                    <Text>
                      <Icon name="menu-outline" color={"black"} size={24} />
                    </Text>
                    <Text className="text-black font-semibold">
                      Adicionar Consulta
                    </Text>
                  </View>
                  <Text className="border-zinc-100 border-2 rounded-lg">
                    <Icon name="add-outline" color={"black"} size={23} />
                  </Text>
                </View>
                <Modal isOpen={openModalAddAppointment} withInput={false}>
                  <View className="p-6 bg-white rounded-2xl w-full max-w-md shadow-lg">
                    <View className="flex-row justify-between items-center mb-4">
                      <Text className="text-lg font-semibold text-zinc-900">
                        Adicionar Consulta
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setOpenModalAddAppointment(false);
                        }}
                      >
                        <Icon name="close" size={24} color="#4A4A4A" />
                      </TouchableOpacity>
                    </View>
                    <Text className="text-zinc-700 mb-1">Nome da consulta</Text>
                    <TextInput
                      className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
                      placeholder="Nome"
                      value={nameAppointment}
                      onChangeText={setNameAppointment}
                    />
                    <Text className="text-zinc-700 mb-1">Descrição</Text>
                    <TextInput
                      className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
                      placeholder="Descrição"
                      value={descriptionAppointment}
                      onChangeText={setDescriptionAppointment}
                    />
                    <Text className="text-zinc-700 mb-1">Data da Consulta</Text>

                    <TouchableOpacity
                      className="border border-zinc-300 rounded-lg px-4 py-3 flex-row items-center justify-between mb-3"
                      onPress={() => setShowTimePicker(true)}
                    >
                      <Text>
                        {dateAppointment
                          ? dateAppointment.toLocaleString()
                          : "selecionar data"}
                      </Text>

                      <Icon name="time-outline" size={20} color="#3B82F6" />
                    </TouchableOpacity>

                    <Text className="text-zinc-700 mb-1">Tipo de consulta</Text>

                    <Picker
                      className="border border-zinc-300 rounded-lg px-4 py-3"
                      style={{ color: "#999" }}
                      selectedValue={type}
                      onValueChange={(item) => setType(item)}
                    >
                      <Picker.Item label="Selecione" value="" />
                      {appointments.map((item) => (
                        <Picker.Item key={item} label={item} value={item} />
                      ))}
                    </Picker>

                    {showTimePickerAppointment && (
                      <DateTimePicker
                        value={dateAppointment}
                        mode="datetime"
                        display="spinner"
                        onChange={handleTimeChange}
                      />
                    )}
                    <Text className="text-zinc-700 mb-1">Nota</Text>
                    <TextInput
                      className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
                      placeholder="Nota..."
                      value={noteAppointment}
                      onChangeText={setNoteAppointment}
                    />

                    <TouchableOpacity
                      className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
                      onPress={() => {
                        onSaveAppointment();
                        setOpenModalAddAppointment(false);
                      }}
                    >
                      <Icon
                        name="save"
                        size={20}
                        color="white"
                        className="mr-2"
                      />
                      <Text className="text-white text-center font-semibold">
                        Salvar Consulta
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            </Pressable>
          </View>
        </View>

        <View className="mt-4">
          <Pressable
            onPress={() =>
              navigation.navigate("Booking", { title: "Consultas" })
            }
          >
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="pulse-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
                  Ver Consultas
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
            onPress={() =>
              navigation.navigate("Medication", { title: "Medicações" })
            }
          >
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="pulse-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
                  Ver Remédios
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
            onPress={() =>
              navigation.navigate("Symptom", { title: "Sintomas" })
            }
          >
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="pulse-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
                  Ver Sintomas
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
        </View>

        <View className="mt-8">
          <Text className="font-semibold text-2xl">Histórico De Saúde</Text>

          <List.Section title="">
            <List.Accordion
              title="Histórico De Saúde"
              left={(props) => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="Histórico De Consultas" />
              <List.Item title="Histórico de  Sintomas" />
              <List.Item title="Históricos Médicos" />
            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalScreen;
