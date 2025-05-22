import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { List } from "react-native-paper";
import { API_URL, moodDayFeeling } from "../constants/data";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Modal from "../components/Modal";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  handleSaveAppointment,
  handleSaveMedication,
  handleSaveSymptom,
} from "../services/mainService";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../helpers/theme-context";
import {
  registerForPushNotificationAsync,
  scheduleMedicationReminder,
} from "../utils/notifications";
import { addMedication } from "../utils/storage";
import api from "../services/api";
import { Image } from "expo-image";
import { lastAppointment, lastMedication } from "../services/last";
import { BarChart, LineChart, ProgressChart } from "react-native-chart-kit";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames.Medical>;

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
  const [showTimePickerAppointmentHour, setShowTimePickerAppointmentHour] =
    useState(false);
  const [nameAppointment, setNameAppointment] = useState("");
  const [descriptionAppointment, setDescriptionAppointment] = useState("");
  const [dateAppointment, setDateAppointment] = useState(new Date());
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    typeUser: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [dateAppointmentHour, setDateAppointmentHour] = useState(new Date());
  const [type, setType] = useState("");
  const [noteAppointment, setNoteAppointment] = useState("");
  const [lastAppointmentdata, setLastAppointment] = useState({
    id: "",
    name: "",
    description: "",
    dateAppointment: "",
    type: "",
    statusAppointment: "",
    note: "",
    createdAt: "",
    updatedAt: "",
  });
  const [lastMedicationdata, setLastMedication] = useState({
    id: "",
    name: "",
    dosage: "",
    note: "",
    timeReminder: "",
    createdAt: "",
    updatedAt: "",
  });

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
        color: (opacity = 100) => `rgba(0 , 0, 0, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: false,
  };
  const [filter, setFilter] = useState("normal");
  const chartConfig = {
    backgroundGradientFrom: "#3b82f6",
    backgroundGradientFromOpacity: "#3b82f6",
    backgroundGradientTo: "#3b82f6",
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 6, // optional, default 3
    barPercentage: 0.5,
    style: {
      borderRadius: 10,
    },
    useShadowColorFromDataset: false, // optional
  };
  const moodFeeling = moodDayFeeling;

  const onSaveMedication = async () => {
    await scheduleMedicationReminder({
      medicationName,
      dosage,
      reminderTime,
    });
    await addMedication({
      medicationName,
      dosage,
      reminderTime,
    });
    if (!medicationName || !dosage || !reminderTime) {
      alert("Todos os campos não opcionais são obrigatórios!");
      return;
    }
    try {
      await handleSaveMedication(medicationName, dosage, notes, reminderTime);

      alert("Medicação cadastrada com sucesso!");
      setOpenModalAddMedication(false);
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

  const handleDateAppointmentChangeHour = (
    event: DateTimePickerEvent,
    date: Date | undefined
  ) => {
    if (date) {
      setDateAppointmentHour(date);
    }
    setShowTimePickerAppointmentHour(false);
  };

  const handleDateAppointmentChange = (
    event: DateTimePickerEvent,
    date: Date | undefined
  ) => {
    const hour = date?.getHours();
    const minutes = date?.getMinutes();

    // Verifica se está entre 08:00 e 16:00
    if (hour && hour >= 8 && hour < 16) {
      if (date) {
        setReminderTime(date);
      }
    } else {
      Alert.alert(
        "Horário inválido",
        "Selecione um horário entre 08:00 e 16:00"
      );
    }

    if (date) {
      setReminderTime(date);
    }
    setShowTimePickerAppointment(false);
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
      !dateAppointmentHour ||
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
        dateAppointmentHour,
        dateAppointment,
        type,
        noteAppointment
      );
      setOpenModalAddAppointment(true);
      alert("Consulta cadastrado com sucesso!");
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };
  const fetchLastMedication = async () => {
    try {
      const res = await lastMedication();

      setLastMedication(res.data[0]);

      console.log("ok1", res.data[0]);

      // console.log(prescriptions.data);
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const fetchLastAppointment = async () => {
    try {
      const res = await lastAppointment();

      setLastAppointment(res.data[0]);

      console.log("ok2", res.data[0]);
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const fetchUserData = () => {
    try {
      api
        .get(`${API_URL}/users/user`)
        .then(({ data: response }) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchUserData();
    registerForPushNotificationAsync();
    fetchLastAppointment();
    fetchLastMedication();
  }, []);
  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full px-4  pb-10 ${theme === "dark" ? "bg-neutral-900" : ""}`}
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

        <View className="mt-6">
          <Text className="text-black text-xl font-semibold mb-4">Sumário</Text>

          <View className=" rounded-xl p-4 mb-6">
            <Text className="text-lg font-bold text-black ">Gráfico (Mês)</Text>
            <Text className="text-lg font-bold text-black ">
              Consultas/Remédios/Sintomas
            </Text>

            <View className=" rounded-lg p-4 pb-0 items-center justify-center ">
              <View className=" pt-0">
                {/* <LineChart
                  data={{
                    labels: ["Dez", "Jan", "Feb", "Mar", "Abr", "Mai"],
                    datasets: [
                      {
                        data: [34, 12, 44, 89, 12, 33],
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width} // from react-native
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix=""
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: "#3b82f6",
                    backgroundGradientFrom: "#3b82f6",
                    backgroundGradientTo: "#3b82f6",
                    // decimalPlaces: , // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 10,
                      padding: 10,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726",
                    },
                  }}
                  // bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 10,
                  }}
                /> */}

                <ProgressChart
                  data={{
                    labels: ["🩺", "💊", "🤒"], // optional
                    data: [0.6, 0.12, 0.34],
                  }}
                  width={330}
                  height={250}
                  strokeWidth={20}
                  radius={20}
                  chartConfig={chartConfig}
                  hideLegend={false}
                  style={{
                    borderRadius: 16,
                    width: "full",
                  }}
                />
              </View>
            </View>
          </View>

          {/* <Image
            style={{
              width: 320,
              height: 160,
              borderRadius: 10,
              alignContent: "center",
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: "#ccc",
            }}
            source={require("../../assets/cm.webp")}
          /> */}

          <View>
            {lastMedicationdata ? (
              <View className="border-b-2 border-zinc-300/35 py-3 flex-row justify-between items-center pb-5 mb-1 w-full">
                <View className="text-black text-base opacity-60 bg-zinc-400/50 rounded-md p-3 flex-row justify-between items-center w-full">
                  <Text className="flex-row justify-start items-center">
                    <Icon
                      className="font-bold"
                      name="alarm-outline"
                      size={20}
                      color={"#505050"}
                    />
                    <Text>
                      Seu próximo{" "}
                      <Text className="font-bold">
                        Remédio{" "}
                        {lastMedicationdata.name +
                          " " +
                          lastMedicationdata.dosage}
                      </Text>
                    </Text>
                  </Text>

                  <View className="flex-row justify-end items-center gap-2 bg-blue-300/40 rounded-lg py-[3px] px-3">
                    <Text className="text-blue-600 text-lg  text-end font-semibold">
                      {lastMedicationdata.timeReminder}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View className="border-b-2 border-zinc-300/35 py-3 flex-row justify-between items-center pb-5 mb-1 w-full">
                <View className="text-black text-base opacity-60 bg-zinc-400/50 rounded-md p-3 flex-row justify-between items-center w-full">
                  <Text className="flex-row justify-start items-center">
                    <Icon
                      className="font-bold"
                      name="alarm-outline"
                      size={20}
                      color={"#505050"}
                    />
                    <Text>
                      Seu próximo <Text className="font-bold">Remédio</Text>
                    </Text>
                  </Text>

                  <View className="flex-row justify-end items-center gap-2 bg-blue-300/40 rounded-lg py-[3px] px-3">
                    <Text className="text-blue-600 text-lg  text-end font-semibold">
                      08:30
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {lastAppointmentdata ? (
              <View className="border-b-2 border-zinc-300/35 py-3 flex-row justify-between items-center pb-5 mb-1 w-full">
                <View className="text-black text-base opacity-60 bg-zinc-400/50 rounded-md p-3 flex-row justify-between items-center w-full">
                  <Text>
                    <Icon name="alarm-outline" size={20} color={"#505050"} />
                    Sua última{" "}
                    <Text className="font-bold">
                      {" "}
                      Consulta agendada!({lastAppointmentdata.description})
                    </Text>
                  </Text>

                  <View className="flex-row justify-end items-center gap-2 bg-green-300/40 rounded-lg py-[3px] px-3">
                    <Text className="text-green-600  text-lg text-end font-semibold">
                      {lastAppointmentdata.dateAppointment}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View className="border-b-2 border-zinc-300/35 py-3 flex-row justify-between items-center pb-5 mb-1 w-full">
                <View className="text-black text-base opacity-60 bg-zinc-400/50 rounded-md p-3 flex-row justify-between items-center w-full">
                  <Text>
                    <Icon name="alarm-outline" size={20} color={"#505050"} />
                    <Text className="font-bold"> sem Consulta agendada</Text>
                  </Text>
                </View>
              </View>
            )}
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("MyDoctorScreen", {
                title: "",
              });
            }}
          >
            <View className="border-b-2 border-zinc-300/35 py-3 flex-row justify-between items-center pb-5 mb-1 w-full">
              <View className="text-black text-base opacity-60 bg-zinc-400/50 rounded-md p-3 flex-row justify-between items-center w-full">
                <Text>
                  <Icon name="medical-outline" size={20} color={"#505050"} />
                  <Text className="font-bold"> Meu doctor</Text>
                </Text>
                <Text className="rounded-lg ps-4">
                  <Icon
                    name="chevron-forward-outline"
                    color={"black"}
                    size={23}
                  />
                </Text>
              </View>
            </View>
          </Pressable>

          <View className="mt-5">
            <Text className="text-black text-lg font-semibold">
              Como está se sentindo hoje, {userData.username}?
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
                className="p-5 rounded-xl border-2 border-zinc-400/30 w-[80%] h-20 me-2"
                placeholder="Adicione Aqui alguma nota!"
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DailyScreen", { title: "" });
                }}
              >
                <View className=" rounded-xl h-9 w-9 flex justify-center items-center bg-blue-400">
                  <Icon name="send-outline" color={"#fff"} size={17}></Icon>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-5">
            <Pressable
              onPress={() => {
                setOpenModalAddSymptom(true);
              }}
            >
              <View className="rounded-lg  bg-zinc-50 border-[1px] border-zinc-300 p-4 mx-2 mt-3 h-16 flex-row justify-start items-center">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row justify-start items-center gap-2">
                    <View className="rounded-full h-14 w-14 bg-zinc-300/30 flex-col justify-center items-center">
                      <Icon name="sad-outline" color={"black"} size={24} />
                    </View>
                    <Text className=" text-lg text-black">
                      Adicionar Novo Sintoma
                    </Text>
                  </View>
                  <Text className="rounded-lg ps-4">
                    <Icon name="add-outline" color={"black"} size={23} />
                  </Text>
                </View>
                <Modal isOpen={openModalAddSymptom} withInput={false}>
                  <View className="p-7 bg-white rounded-2xl w-full max-w-md shadow-lg">
                    <View className="flex-row justify-between items-center mb-4">
                      <Text className="text-base font-bold text-black ">
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
                    {/* <TextInput
                      className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
                      placeholder="Ex: Náusea, Fadiga..."
                      value={name}
                      onChangeText={setName}
                    /> */}
                    <Picker
                      className="border border-zinc-300 rounded-lg px-4 py-3"
                      style={{ color: "#999" }}
                      selectedValue={name}
                      onValueChange={(itemValue) => setName(itemValue)}
                    >
                      <Picker.Item
                        label="Teve algum efeito colateral hoje?"
                        value=""
                      />
                      <Picker.Item label="Náusea" value="nausea" />
                      <Picker.Item label="Vômito" value="vomito" />
                      <Picker.Item label="Fadiga" value="fadiga" />
                      <Picker.Item
                        label="Perda de apetite"
                        value="perdaApetite"
                      />
                      <Picker.Item
                        label="Queda de cabelo"
                        value="quedaCabelo"
                      />
                      <Picker.Item
                        label="Feridas na boca"
                        value="feridasBoca"
                      />
                      <Picker.Item label="Constipação" value="constipacao" />
                      <Picker.Item label="Diarreia" value="diarreia" />
                      <Picker.Item label="Febre" value="febre" />
                      <Picker.Item label="Tontura" value="tontura" />
                      <Picker.Item label="Nenhum" value="nenhum" />
                      <Picker.Item label="Outro" value="outro" />
                    </Picker>

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
              <View className="rounded-lg  bg-zinc-50 border-[1px] border-zinc-300 p-4 mx-2 mt-3 h-16 flex-row justify-start items-center">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row justify-start items-center gap-2">
                    <View className="rounded-full h-14 w-14 bg-zinc-300/30 flex-col justify-center items-center">
                      <Icon
                        name="thermometer-outline"
                        color={"black"}
                        size={24}
                      />
                    </View>
                    <Text className=" text-lg text-black">
                      Adicionar Novo Remédio
                    </Text>
                  </View>
                  <Text className="rounded-lg ps-4">
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

                    <Picker
                      className="border border-zinc-300 rounded-lg px-4 py-3"
                      style={{ color: "#999" }}
                      selectedValue={dosage}
                      onValueChange={(itemValue) => setDosage(itemValue)}
                    >
                      <Picker.Item
                        label="Escolha a dosagem da medicação"
                        value=""
                      />
                      <Picker.Item label="5 mg" value="5mg" />
                      <Picker.Item label="10 mg" value="10mg" />
                      <Picker.Item label="25 mg" value="25mg" />
                      <Picker.Item label="50 mg" value="50mg" />
                      <Picker.Item label="75 mg" value="75mg" />
                      <Picker.Item label="100 mg" value="100mg" />
                      <Picker.Item label="150 mg" value="150mg" />
                      <Picker.Item label="200 mg" value="200mg" />
                      <Picker.Item label="Outro" value="outro" />
                    </Picker>
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
                          ? reminderTime.toLocaleTimeString().slice(0, 5)
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
              <View className="rounded-lg  bg-zinc-50 border-[1px] border-zinc-300 p-4 mx-2 mt-3 h-16 flex-row justify-start items-center">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row justify-start items-center gap-2">
                    <View className="rounded-full h-14 w-14 bg-zinc-300/30 flex-col justify-center items-center">
                      <Icon name="bandage-outline" color={"black"} size={24} />
                    </View>
                    <Text className="text-black  text-lg">
                      Adicionar Nova Consulta
                    </Text>
                  </View>
                  <Text className="rounded-lg ps-4">
                    <Icon name="add-outline" color={"black"} size={23} />
                  </Text>
                </View>
                <Modal isOpen={openModalAddAppointment} withInput={false}>
                  <View className="p-6 bg-white rounded-2xl w-full max-w-md shadow-lg">
                    <View className="flex-row justify-between items-center mb-4">
                      <Text className="font-semibold text-lg text-zinc-400">
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

                    <Text className="text-zinc-700 mb-1">Hora da Consulta</Text>

                    <TouchableOpacity
                      className="border border-zinc-300 rounded-lg px-4 py-3 flex-row items-center justify-between mb-3"
                      onPress={() => setShowTimePickerAppointmentHour(true)}
                    >
                      <Text>
                        {dateAppointmentHour
                          ? dateAppointmentHour.toLocaleTimeString()
                          : "selecionar hora"}
                      </Text>

                      <Icon name="time-outline" size={20} color="#3B82F6" />
                      {showTimePickerAppointmentHour && (
                        <DateTimePicker
                          value={dateAppointmentHour}
                          mode="time"
                          display="spinner"
                          is24Hour={true}
                          onChange={handleDateAppointmentChangeHour}
                        />
                      )}
                    </TouchableOpacity>

                    <Text className="text-zinc-700 mb-1">Data da Consulta</Text>

                    <TouchableOpacity
                      className="border border-zinc-300 rounded-lg px-4 py-3 flex-row items-center justify-between mb-3"
                      onPress={() => setShowTimePickerAppointment(true)}
                    >
                      <Text>
                        {dateAppointment
                          ? dateAppointment.toLocaleDateString()
                          : "selecionar data"}
                      </Text>

                      <Icon name="time-outline" size={20} color="#3B82F6" />
                      {showTimePickerAppointment && (
                        <DateTimePicker
                          value={dateAppointment}
                          mode="date"
                          minimumDate={new Date(2025, 4, 18)}
                          maximumDate={new Date(2025, 11, 31)}
                          display="inline"
                          onChange={handleDateAppointmentChange}
                        />
                      )}
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
              title="Históricos"
              left={(props) => <List.Icon {...props} icon="folder" />}
            >
              <List.Item
                onPress={() => {
                  navigation.navigate("Report", { title: "" });
                }}
                title="Histórico De Receitas"
              />
              <List.Item
                onPress={() => {
                  navigation.navigate("ExportarRelatorio", { title: "" });
                }}
                title="Exportar Relatórios"
              />
            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalScreen;
