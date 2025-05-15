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
import React, { useEffect, useState } from "react";
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

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const AdminMainScreen = ({ navigation, route }: props) => {
  const [userImg, setUserImg] = useState("");
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
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

  useEffect(() => {
    fetchTips();
    fetchSymptom();
    fetchMedications();
    fetchAppointment();
    fetchImgUser();
    fetchUsers();
  }, []);

  const fetchImgUser = async () => {
    try {
      api
        .get(`${API_URL}/profiles/single`)
        .then(({ data: response }) => {
          setUserImg(`http://${API_URL_UPLOAD}:3000/${response.data.urlImg}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      Alert.alert("Erro", "erro tentando pegar os dados de perfil");
    }
  };

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

  const fetchUsers = async () => {
    await api
      .get("/users/all")
      .then(({ data: res }) => {
        setPatientCount(res.data[2].patients.length);
        setDoctorCount(res.data[3].doctors.length);
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

  const { theme, toggleTheme } = useTheme();

  return (
    <View className={`${theme === "dark" ? "bg-neutral-900" : ""}`}>
      <StatusBar backgroundColor={"#3b82f6"}></StatusBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: 20,
        }}
      >
        <View
          className={`flex-col  justify-between items-center  w-full    ${theme === "dark" ? "bg-neutral-900" : ""}`}
        >
          <View className="flex-row justify-start items-strech gap-3 bg-blue-500 w-full pt-10 px-5 h-56">
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                alignContent: "center",
                borderWidth: 2,
                borderColor: "#fff",
                backgroundColor: "#ccc",
              }}
              source={require("../../assets/admin.png")}
            />
            <View>
              <Text className="text-lg font-bold text-white">
                Conta Restrita
              </Text>
              <Text className="text-lg font-semibold text-white">admin</Text>
              <Text className="text-lg font-bold text-white">
                admin@gmail.com
              </Text>
              <Text
                onPress={() =>
                  navigation.navigate("ProfileAdminScreen", { title: "ssd" })
                }
                className="text-white mt-2"
              >
                ver perfil
                <Icon name="chevron-forward-outline" color={"#fff"} size={10} />
              </Text>
            </View>
          </View>
          <View className="mt-10 flex-col  justify-center items-center gap-3">
            <View className="shadow-black shadow-lg rounded-lg bg-white p-4 w-72 h-36 mb-3">
              <Text className="text-zinc-500 text-4xl mt-4 text-center">
                {patientCount}
              </Text>
              <Text className="text-black text-lg font-semibold">
                Total Pacientes
              </Text>
              <View>
                <Text>
                  <Icon name="arrow-down-outline" color={"#ef4444"} size={13} />
                  <Text className="text-zinc-500">23% mês corrente</Text>
                </Text>
              </View>
            </View>
            <View className="rounded-lg bg-white p-4 w-72 h-36  shadow-lg">
              <Text className="text-zinc-500 text-4xl mt-4 text-center">
                {doctorCount}
              </Text>
              <Text className="text-black text-lg font-semibold">
                Total Médicos
              </Text>
              <View>
                <Text>
                  <Icon name="arrow-up-outline" color={"#4ade80"} size={13} />
                  <Text className="text-zinc-500">13% mês corrente</Text>
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full mt-4 mb-8">
            <View className="grid-flow-col grid-cols-2 gap-5 justify-center items-center mt-3 border-b-2 border-zinc-300 w-full pb-5 ">
              <Text
                onPress={() => {
                  navigation.navigate("AutorizationScreen", { title: "ada" });
                }}
                className="font-semibold bg-blue-300/20 text-blue-400 p-4 px-7 rounded-lg w-40 text-center"
              >
                Autorizações
                <Icon
                  name="chevron-forward-outline"
                  color={"#60a5fa"}
                  size={10}
                />
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("AnalisesScreen", { title: "ada" });
                }}
                className="font-semibold bg-blue-300/20 text-blue-400 p-4 px-7 rounded-lg w-40 text-center"
              >
                Análises
                <Icon
                  name="chevron-forward-outline"
                  color={"#60a5fa"}
                  size={10}
                />
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("OptionsAdmincreen", { title: "ada" });
                }}
                className="font-semibold bg-blue-300/20 text-blue-400 p-4 px-7 rounded-lg w-40 text-center"
              >
                Opções{" "}
                <Icon
                  name="chevron-forward-outline"
                  color={"#60a5fa"}
                  size={10}
                />
              </Text>
            </View>
            {/* 
            <TouchableOpacity className="p-3 bg-white rounded-lg  items-center mb-3 relative mt-3 w-72 mx-auto flex-col">
              <Icon
                name={"balloon-outline"}
                size={24}
                color="#2563EB"
                className="mr-4"
              />
              <Text className="mt-1 font-semibold text-center px-2">
                Ver novas solitações para ingressar no quimiocare
              </Text>

              <Text className="mt-3 text-blue-400">Ver solicitações</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminMainScreen;
