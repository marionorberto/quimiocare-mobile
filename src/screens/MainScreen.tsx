import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  StatusBar,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Contants from "expo-constants";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../services/api";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import {
  handleSaveMedication,
  handleSaveSymptom,
} from "../services/mainService";
import { useTheme } from "../helpers/theme-context";
import { API_URL, API_URL_UPLOAD } from "../constants/data";
import { allPrescriptions } from "../services/receitas";
import { lastdaily } from "../services/daily/create-daily";
import { parse, format, isSameDay } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames.Main>;

const MainScreen = ({ navigation, route }: props) => {
  const [userImg, setUserImg] = useState("");
  const [countReceitas, setCountReceitas] = useState(0);
  const [lastdailyCreated, setLastdaily] = useState({
    id: "",
    painLevel: "",
    collateralEffect: "",
    sleepWell: true,
    note: "",
    emoccioanlState: "",
    hidratedToday: true,
    feedToday: true,
    exercicesToday: false,
    tiredLevelToday: "",
    createdAt: "",
    updatedAt: "",
  });

  const [tipsData, setTipsData] = useState({
    id: "",
    description: "",
    category: {
      id: "",
      description: "",
      createdAt: "",
      updateAt: "",
    },
    userDoctor: {
      username: "",
    },
    createdAt: "",
    updatedAt: "",
  });
  const [symptomsCounter, setSymptomCounter] = useState({ count: 0 });
  const [post, setPost] = useState([
    {
      id: "",
      content: "",
      description: "",
      subtitle: "",
      title: "",
      tag: "",
      createdAt: "",
      user: {
        username: "",
        typeUser: "",
      },
      imgUrl: "",
    },
  ]);
  const [medicationCounter, setMedicationCounter] = useState({
    count: 0,
  });
  const [appointmentCounter, setAppontmentCounter] = useState({ count: 0 });
  const [isLastdailyCreated, setIsLastdailyCreated] = useState(false);

  const compareDate = (last: string) => {
    // Converte fromLastDaily para Date
    const dateFromLastDaily = new Date(last);

    // Cria uma string no formato yyyy-MM-dd para ambas as datas
    const formattedDateFromLastDaily = dateFromLastDaily
      .toISOString()
      .split("T")[0];
    const formattedDateToday = new Date().toISOString().split("T")[0];

    console.log(
      formattedDateFromLastDaily === formattedDateToday,
      formattedDateToday,
      formattedDateFromLastDaily
    );

    // Compara se são iguais
    return formattedDateFromLastDaily === formattedDateToday;
  };

  useFocusEffect(
    useCallback(() => {
      // Essa função é chamada sempre que a tela ganha foco
      fetchTips();
      fetchSymptom();
      fetchMedications();
      fetchAppointment();
      fetchImgUser();
      fetchPosts();
      fetchReceitas();
      fetchLastdaily();

      return () => {
        // Opcional: código quando sai da tela
      };
    }, [])
  );

  useEffect(() => {
    fetchTips();
    fetchSymptom();
    fetchMedications();
    fetchAppointment();
    fetchImgUser();
    fetchPosts();
    fetchReceitas();
    fetchLastdaily();
  }, []);

  const fetchReceitas = async () => {
    try {
      const prescriptions = await allPrescriptions();

      setCountReceitas(prescriptions.data[0].count);

      // console.log(prescriptions.data);
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const fetchPosts = () => {
    api
      .get("/posts/todas")
      .then(({ data: res }) => {
        setPost(res.data[1]);
        // console.log("ateçao", res.data[1][0].content);
        // console.log("image from post", res.data[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchImgUser = async () => {
    try {
      api
        .get(`${API_URL}/profiles/single`)
        .then(({ data: response }) => {
          setUserImg(`http://${API_URL_UPLOAD}:3000/${response.data.urlImg}`);
          // console.log("image from profile", response.data.urlImg);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      Alert.alert("Erro", "erro tentando pegar os dados de perfil");
    }
  };

  const fetchLastdaily = async () => {
    try {
      const { data } = await lastdaily();

      setLastdaily(data[0]);
      const isSame = compareDate(data[0].createdAt);
      setIsLastdailyCreated(isSame);
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const fetchTips = async () => {
    await api
      .get("/tips/tip")
      .then(({ data: res }) => {
        setTipsData(res.data);
        console.log(res.data);
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

  const { theme, toggleTheme } = useTheme();

  return (
    <View className={`${theme === "dark" ? "bg-neutral-900" : ""}`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: Contants.statusBarHeight,
          paddingBottom: 20,
        }}
      >
        <View
          className={`flex-row justify-between items-center px-4  pt-8 ${theme === "dark" ? "bg-neutral-900" : ""}`}
        >
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
              source={{ uri: userImg }}
            />
          </View>
          <View
            className={`p-[6px] rounded-full relative ${theme === "dark" ? "bg-neutral-500/30" : "bg-slate-300/30"} `}
          >
            <Pressable
              onPress={() => {
                navigation.navigate(ScreenNames.Notification, { title: "" });
              }}
            >
              <Text>
                <Icon
                  name="notifications-outline"
                  size={28}
                  color={theme === "dark" ? "#fff" : "#505050"}
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
                  <Text className="font-bold text-lg">Receitas</Text>
                  <View className="bg-white rounded-full p-2">
                    <Icon
                      name="receipt-outline"
                      color={"rgb(148 163 184 / 0.6)"}
                    />
                  </View>
                </View>
                <View className="flex-row justify-start items-center gap-1">
                  <Text className="text-black text-2xl font-bold">
                    {countReceitas}
                  </Text>
                  <Text className="text-zinc-600"></Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View
          className={`mt-5 border-y-2  p-4 ${theme === "dark" ? "border-zinc-700" : "border-zinc-300"}`}
        >
          <View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row justify-start">
                <Text>💡</Text>
                <Text
                  className={`font-bold   text-lg ps-2 ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  Dica Do Dia
                </Text>
              </View>
              <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[7px]">
                {tipsData.category.description ?? ""}
              </Text>
            </View>
            <Text className="rounded-xl  text-zinc-500 font-semibold ">
              {tipsData.userDoctor.username && tipsData.userDoctor.username}
            </Text>
            <Text
              className={`p-3 text-base ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {tipsData.description ?? ""}
            </Text>
          </View>
        </View>
        <View className="flex-col justify-center items-center pt-14 pb-16">
          <Icon
            className=""
            name="pin-outline"
            color={"#2563eb"}
            size={34}
          ></Icon>
          <Text
            className={` text-xl ${theme === "dark" ? "text-zinc-200" : "text-zinc-500"}`}
          >
            Registro diário
          </Text>
          <Text
            className={`w-40 text-center   my-3 text-lg ${theme === "dark" ? "text-white" : "text-zinc-700"}`}
          >
            Registe como estás se sentindo hoje, a tua disposição, ânimo,
            sintomas, melhorias.
          </Text>
          {!isLastdailyCreated ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DailyScreen", { title: "hello" });
              }}
              className="bg-blue-500 rounded-full py-1 mt-2 flex-row items-center justify-center w-56 h-14"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Registro Diário
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="bg-blue-400 rounded-xl py-1 mt-2 flex-row items-center justify-center w-56 h-14 px-2">
              <Text className="text-white text-center font-semibold text-base">
                Seu Registro Diário já foi inserido!
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              // compareDate(lastdailyCreated.createdAt);
              navigation.navigate("ActivityRegisterScreen", { title: "hello" });
            }}
            className=" border-[1px] border-blue-500 bg-white rounded-full py-1 mt-2 flex-row items-center justify-center w-56 h-14"
          >
            <Text className="text-blue-500 text-center font-semibold text-lg">
              Registar Actividades
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className={`h-1 w-full ${theme === "dark" ? "bg-zinc-600" : "bg-zinc-100"}`}
        ></View>
        <View className="px-4 mt">
          <Text
            className={` text-2xl font-bold mt-3 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
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
              <View
                className={`border-2  rounded-lg bg-gree-200/80 p-2 me-4 w-32 h-40 flex-col justify-center items-center ${theme === "dark" ? "border-zinc-700" : "border-zinc-200"}`}
              >
                <Image
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  source={require("../../assets/iacc.png")}
                />
                <Text
                  className={` font-bold text-3xl mt-7 ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  IACC
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.clinicasagradaesperanca.co.ao/");
              }}
            >
              <View
                className={`border-2  rounded-lg bg-gree-200/80 p-2 me-4 w-32 h-40 flex-col justify-center items-center ${theme === "dark" ? "border-zinc-700" : "border-zinc-200"}`}
              >
                <Image
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  source={require("../../assets/sagrada-esperanca.png")}
                />
                <Text
                  className={` font-bold text-xl mt-3 text-center ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  C.S ESPERANÇA
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://clinicagirassol.co.ao/");
              }}
            >
              <View
                className={`border-2  rounded-lg bg-gree-200/80 p-2 me-4 w-32 h-40 flex-col justify-center items-center ${theme === "dark" ? "border-zinc-700" : "border-zinc-200"}`}
              >
                <Image
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  source={require("../../assets/clinica-girassol.png")}
                />
                <Text
                  className={` font-bold text-xl mt-3 text-center ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  CLÍNICA GIRASSOL
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://lucreciapaim.gov.ao/update/");
              }}
            >
              <View
                className={`border-2  rounded-lg bg-gree-200/80 p-2 me-4 w-32 h-40 flex-col justify-center items-center ${theme === "dark" ? "border-zinc-700" : "border-zinc-200"}`}
              >
                <Image
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  source={require("../../assets/lucrecia-paim.png")}
                />
                <Text
                  className={`font-bold text-xl mt-3 text-center ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  LUCRÉCIA PAIM
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View
          className={`h-1 w-full  mt-10 ${theme === "dark" ? "bg-zinc-600" : "bg-zinc-100"}`}
        ></View>
        <View className="mt-5 px-4">
          <View className="flex-row justify-between items-center">
            <Text
              className={`font-bold  text-lg ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Posts recentes
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mx-4 pb-16">
              <View className="mt-1">
                <View className="flex-row justify-start items-center">
                  <Text
                    className={`font-bold ${theme === "dark" ? "text-white" : "text-[#999]"}`}
                  >
                    Veja os novos posts da comunidade Quimiocare!
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="py-4"
                >
                  {post.map((item) => (
                    <View
                      key={item.id}
                      className="shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-3 p-1 rounded-lg h-[16rem] relative me-3"
                    >
                      <View className="w-full py-3 pt-1">
                        <View className="flex-row justify-start items-center gap-3 mb-1">
                          <Image
                            source={{
                              uri: `http://${API_URL_UPLOAD}:3000/${item.imgUrl}`,
                            }}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 50,
                              borderWidth: 2,
                              borderColor: "#fff",
                              backgroundColor: "#ccc",
                            }}
                          />
                          <Text className="font-semibold text-sm text-black">
                            {item.user.username}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center gap-3">
                          <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                            <View className="h-1 w-1 bg-blue-400 rounded-full mr-2" />
                            <Text>{item.user.typeUser}</Text>
                          </Text>
                          <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-3 py-[3px]  text-sm">
                            {item.tag}
                          </Text>
                        </View>
                      </View>
                      <View className="mt-2 mb-4">
                        <Text className="text-xl text-zinc-600 font-light text-wrap text-justify">
                          {item.title}
                        </Text>
                        <Text className="text-xl text-zinc-600 font-light text-wrap text-justify">
                          {item.subtitle}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-zinc-400">
                          Postado Em <Text></Text>
                          {item.createdAt.split("T")[0]}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
