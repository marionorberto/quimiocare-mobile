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
        <View className="flex-row justify-end items-center pe-4">
          <View className="flex-row gap-2 justify-end items-center pt-3">
            <TouchableOpacity
              className="bg-green-500/80 px-2 py-2 rounded-lg flex-row items-center h-10"
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
        <View className="flex-col justify-center items-center pt-14 pb-16">
          <Icon
            className=""
            name="pin-outline"
            color={"#2563eb"}
            size={34}
          ></Icon>
          <Text className="text-zinc-500 text-xl">Registro diário</Text>
          <Text className="w-40 text-center text-zinc-700 my-3 text-lg">
            Registe como estás se sentindo hoje, a tua disposição, ânimo,
            sintomas, melhorias.
          </Text>
          <TouchableOpacity className="bg-blue-500 rounded-full py-1 mt-2 flex-row items-center justify-center w-56 h-14">
            <Text
              onPress={() => {
                navigation.navigate("Medical", { title: "medication" });
              }}
              className="text-white text-center font-semibold text-lg"
            >
              Registro Agora
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-1 w-full bg-zinc-200"></View>
        <View className="px-4 mt">
          <Text className="text-black text-2xl font-bold mt-3 ">
            Recomendações
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mt-3"
          >
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://iacc-angola.ao/");
              }}
            >
              <View className="border-2 border-zinc-200 rounded-lg bg-gree-200/80 p-2 me-4 w-32 h-40 flex-col justify-center items-center">
                <Image
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  source={require("../../assets/iacc.png")}
                />
                <Text className="text-black font-bold text-3xl mt-7">IACC</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.clinicasagradaesperanca.co.ao/");
              }}
            >
              <View className="border-2 border-zinc-200 rounded-lg p-2 me-4 w-32 h-40 flex-col justify-center items-center">
                <Image
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  source={require("../../assets/sagrada-esperanca.png")}
                />
                <Text className="text-black font-bold text-xl mt-3 text-center">
                  C.S ESPERANÇA
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://clinicagirassol.co.ao/");
              }}
            >
              <View className="border-2 border-zinc-200 rounded-lg p-2 me-4 w-32 h-40 flex-col justify-center items-center">
                <Image
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  source={require("../../assets/clinica-girassol.png")}
                />
                <Text className="text-black font-bold text-xl mt-3 text-center">
                  CLÍNICA GIRASSOL
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://lucreciapaim.gov.ao/update/");
              }}
            >
              <View className="border-2 border-zinc-200 rounded-lg  p-2 me-4 w-32 h-40 flex-col justify-center items-center">
                <Image
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  source={require("../../assets/lucrecia-paim.png")}
                />
                <Text className="ext-black font-bold text-xl mt-3 text-center">
                  LUCRÉCIA PAIM
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View className="mt-5 px-4">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-black">Posts recentes</Text>
            <Text
              className="text-zinc-400"
              onPress={() => navigation.navigate("Community", { title: "" })}
            >
              Ver Todos
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="py-4"
          >
            <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
              <View className="w-full py-3 pt-1">
                <View className="flex-row justify-start items-center gap-3 ">
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
                  <Text className="font-semibold text-sm text-black">
                    Mário Norberto
                  </Text>
                </View>
                <View className="flex-row justify-between items-center gap-3">
                  <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                    <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                    <Text>Post</Text>
                  </Text>
                  <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                    Meloma
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                </Text>
              </View>
              <View className="flex-row justify-start items-center">
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="heart-circle-outline" color={"black"} size={18} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Adoro
                  </Text>
                </View>

                <View className="flex-row justify-start items-center me-2">
                  <Icon name="bookmark-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Guardar
                  </Text>
                </View>
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="share-social-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Partilhar
                  </Text>
                </View>
              </View>
            </View>
            <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
              <View className="w-full py-3 pt-1">
                <View className="flex-row justify-start items-center gap-3 ">
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
                  <Text className="font-semibold text-sm text-black">
                    Mário Norberto
                  </Text>
                </View>
                <View className="flex-row justify-between items-center gap-3">
                  <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                    <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                    <Text>Post</Text>
                  </Text>
                  <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                    Meloma
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                </Text>
              </View>
              <View className="flex-row justify-start items-center">
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="heart-circle-outline" color={"black"} size={18} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Adoro
                  </Text>
                </View>

                <View className="flex-row justify-start items-center me-2">
                  <Icon name="bookmark-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Guardar
                  </Text>
                </View>
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="share-social-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Partilhar
                  </Text>
                </View>
              </View>
            </View>
            <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
              <View className="w-full py-3 pt-1">
                <View className="flex-row justify-start items-center gap-3 ">
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
                  <Text className="font-semibold text-sm text-black">
                    Mário Norberto
                  </Text>
                </View>
                <View className="flex-row justify-between items-center gap-3">
                  <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                    <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                    <Text>Post</Text>
                  </Text>
                  <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                    Meloma
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                </Text>
              </View>
              <View className="flex-row justify-start items-center">
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="heart-circle-outline" color={"black"} size={18} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Adoro
                  </Text>
                </View>

                <View className="flex-row justify-start items-center me-2">
                  <Icon name="bookmark-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Guardar
                  </Text>
                </View>
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="share-social-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Partilhar
                  </Text>
                </View>
              </View>
            </View>
            <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
              <View className="w-full py-3 pt-1">
                <View className="flex-row justify-start items-center gap-3 ">
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
                  <Text className="font-semibold text-sm text-black">
                    Mário Norberto
                  </Text>
                </View>
                <View className="flex-row justify-between items-center gap-3">
                  <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                    <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                    <Text>Post</Text>
                  </Text>
                  <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                    Meloma
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                </Text>
              </View>
              <View className="flex-row justify-start items-center">
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="heart-circle-outline" color={"black"} size={18} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Adoro
                  </Text>
                </View>

                <View className="flex-row justify-start items-center me-2">
                  <Icon name="bookmark-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Guardar
                  </Text>
                </View>
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="share-social-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Partilhar
                  </Text>
                </View>
              </View>
            </View>
            <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
              <View className="w-full py-3 pt-1">
                <View className="flex-row justify-start items-center gap-3 ">
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
                  <Text className="font-semibold text-sm text-black">
                    Mário Norberto
                  </Text>
                </View>
                <View className="flex-row justify-between items-center gap-3">
                  <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                    <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                    <Text>Post</Text>
                  </Text>
                  <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                    Meloma
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                  Como lidar com os efeitos colaterais durate a quimioterapia?
                </Text>
              </View>
              <View className="flex-row justify-start items-center">
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="heart-circle-outline" color={"black"} size={18} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Adoro
                  </Text>
                </View>

                <View className="flex-row justify-start items-center me-2">
                  <Icon name="bookmark-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Guardar
                  </Text>
                </View>
                <View className="flex-row justify-start items-center me-2">
                  <Icon name="share-social-outline" color={"black"} size={17} />
                  <Text className="rounded-sm py-2 px-1 text-black text-sm">
                    Partilhar
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
