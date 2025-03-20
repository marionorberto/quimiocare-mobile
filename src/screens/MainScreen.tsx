import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Linking,
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
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import {
  handleSaveMedication,
  handleSaveSymptom,
} from "../services/mainService";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const MainScreen = ({ navigation, route }: props) => {
  const [openModalAddMedication, setOpenModalAddMedication] = useState(false);
  const [openModalAddSymptom, setOpenModalAddSymptom] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState(0);
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [notes, setNotes] = useState("");
  const [reminderTime, setReminderTime] = useState<Date>(new Date());
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
  const [symptomsCounter, setSymptomCounter] = useState({ count: 0 });
  const [medicationCounter, setMedicationCounter] = useState({
    count: 0,
  });
  const [appointmentCounter, setAppontmentCounter] = useState({ count: 0 });

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

  useEffect(() => {
    fetchTips();
    fetchSymptom();
    fetchMedications();
    fetchAppointment();
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

  const fetchSymptom = () => {
    api
      .get("/symptoms/all")
      .then(({ data: res }) => {
        setSymptomCounter(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAppointment = () => {
    api
      .get("/appointments/all")
      .then(({ data: res }) => {
        setAppontmentCounter(res.data[0]);
        // console.log(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchMedications = () => {
    api
      .get("/medications/all")
      .then(({ data: res }) => {
        setMedicationCounter(res.data[0]);
        // console.log(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openWhatsApp = () => {
    const url = `https://chat.whatsapp.com/KlSrANYmVuHK8pk2v4UBWp`;
    Linking.openURL(url).catch((err) =>
      alert("Não foi possívbel abrir o WhatsApp")
    );
  };

  const openTelegram = () => {
    const url = `https://t.me/+KlEqDgCniMFmNThk`;
    Linking.openURL(url).catch((err) =>
      alert("Não foi possívbel abrir o Telegram")
    );
  };

  const openFacebook = () => {
    const url = `https://facebook.com/groups/1012012977447681/`;
    Linking.openURL(url).catch((err) =>
      alert("Não foi possívbel abrir o Facebook")
    );
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
                navigation.navigate(ScreenNames.Notification, { title: "" });
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
        <View className="flex-row justify-between items-csenter pe-4">
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
          <View className="flex-row gap-2 justify-end items-center pt-3">
            <TouchableOpacity
              className="bg-blue-500/80 px-2 py-2 rounded-lg flex-row items-center h-10"
              onPress={() => openWhatsApp()}
            >
              <Icon name="logo-whatsapp" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-600 px-2 py-2 rounded-lg flex-row items-center h-10"
              onPress={() => openFacebook()}
            >
              <Icon name="logo-facebook" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-400 px-2 py-2 rounded-lg flex-row items-center h-10"
              onPress={() => openTelegram()}
            >
              <Icon name="paper-plane-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-center gap-2 mt-3">
          <View className="grid-cols-2 grid-row-2  gap-2 mt-3">
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("Medication", { title: "" });
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
                  <Text className="text-black text-3xl font-bold">
                    {medicationCounter.count}
                  </Text>
                  <Text className="text-zinc-500"></Text>
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                navigation.navigate("Booking", { title: "" });
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
                  <Text className="text-white/90 text-3xl font-bold">
                    {appointmentCounter.count}
                  </Text>
                  <Text className="text-white/90"></Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View className="grid-cols-2 grid-row-2  gap-2 mt-3 ">
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
                  <Text className="text-white text-3xl font-bold">
                    {symptomsCounter.count}
                  </Text>
                  <Text className="text-white"></Text>
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                navigation.navigate("Report", { title: "" });
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
                  <Text className="text-black text-2xl font-bold">0</Text>
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

        <View className="mt-5 px-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-zinc-900">Posts recentes</Text>
            <Text
              className="text-zinc-400"
              onPress={() => navigation.navigate("Community", { title: "" })}
            >
              Ver Todos
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row justify-center items-center bg-blue-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-blue-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-blue-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-blue-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
