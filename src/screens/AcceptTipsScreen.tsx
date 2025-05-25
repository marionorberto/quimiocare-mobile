import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "../helpers/theme-context";
import api from "../services/api";
import { Image } from "expo-image";
import { EnumEmojis, EnumStatusTip } from "../constants/enums";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.AcceptTipsScreen
>;

export default function AcceptTipsScreen({ route, navigation }: props) {
  const { theme, toggleTheme } = useTheme();
  const [tipsCounter, setTipsCounter] = useState({ count: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState<null | {
    id: "";
    description: "";
    active: false;
    category: {
      id: "";
      description: "";
      createdAt: "";
      updateAt: "";
    };
    userDoctor: {
      id: "";
      username: "";
    };
    createdAt: "";
    updatedAt: "";
  }>(null);
  const [tipsData, setTipsData] = useState([
    {
      id: "",
      description: "",
      active: false,
      category: {
        id: "",
        description: "",
        createdAt: "",
        updateAt: "",
      },
      userDoctor: {
        id: "",
        username: "",
      },
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const sendAlertToUser = async (message: string) => {
    try {
      await api
        .post("/alerts/create/alert", {
          title: "Verificação da Dica",
          content: message,
          status: EnumStatusTip.ACCEPTED,
          sender: "QUIMIOCARE",
          user: selectedTip?.userDoctor.id,
        })
        .then();
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        EnumEmojis.CATION + "Enviando Alerta",
        `Infelizmente não conseguimos aceitar a sua dica, tente mais tarde!`
      );
    }
  };

  const activeTip = async (id: string | null) => {
    await api
      .put(`/tips/active/${id}`)
      .then(async ({ data: res }) => {
        await sendAlertToUser(
          "A sua dica foi verifica pela nossa equipa quimiocare, e foi aceite com sucesso"
        );
        Alert.alert(
          EnumEmojis.OK + "Aceitando Dica",
          `A sua dica foi aceita com sucesso, o usuário será notificado!`
        );
        navigation.goBack();
      })
      .catch((err: any) => {
        Alert.alert("Activar Dica", err.response.data.message);
      });
  };

  const rejectTip = async (id: string | null) => {
    await api
      .put(`/tips/reject/${id}`)
      .then(async ({ data: res }) => {
        await sendAlertToUser(
          "Infelizmente a sua  dica foi rejeitadafoi rejeitada pela nossa equipa!"
        );
        Alert.alert(
          EnumEmojis.OK + "Rejeitando Dica",
          `A sua dica foi rejeitda com sucesso, o usuário será notificado!`
        );
        navigation.goBack();
      })
      .catch((err: any) => {
        Alert.alert("Rejeitar Dica", err.response.data.message);
      });
  };

  const handleActiveTip = async () => {
    await activeTip(selectedTip.id);
    setShowModal(false);
    setSelectedTip(null);
  };

  const handleReject = async () => {
    await rejectTip(selectedTip.id);
    setShowModal(false);
    setSelectedTip(null);
  };

  const fetchAllTips = () => {
    api
      .get("/tips/all")
      .then(({ data: res }) => {
        setTipsData(res.data[1]);
        setTipsCounter(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllTips();
  }, []);
  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-14 ${theme === "dark" ? "bg-neutral-900" : ""}`}
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View
          className={`border-[1px]  p-[3px] rounded-md  ${theme === "dark" ? "bg-neutral-900 border-zinc-600" : "bg-white border-zinc-200"}`}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={theme === "dark" ? "#fff" : "#505050"}
            />
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center  font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Aceitar Dicas dos Médicos
        </Text>
      </View>
      <ScrollView className="px-8 mt-10">
        <Text>Dicas Para Aceitar({tipsCounter.count})</Text>
        {tipsCounter.count <= 0 ? (
          <View className="mt-4">
            <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 ">
              <Text className="text-blue-400  text-base text-center">
                Sem dicas disponível!
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          tipsData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setSelectedTip(item);
                setShowModal(true);
              }}
            >
              <View key={item.id} className="bg-zinc-300 rounded-lg mt-4 p-4">
                <Text className="text-xl">Dica</Text>
                <Text className="text-xl font-bold mb-4 text-zinc-800 mt-4">
                  {item.description}
                </Text>
                <Text className="text-xl mb-4 text-blue-600 bg-blue-400/30 p-2 rounded-md w-44 font-semibold text-center">
                  {"Autor: " + item.userDoctor.username}
                </Text>
                <Text className="text-red-500">
                  {item.active ? "Aceite" : "Não Aceite"}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className={`w-11/12 p-6 rounded-xl ${theme === "dark" ? "bg-neutral-800" : "bg-white"}`}
          >
            <Text
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Activar Dica
            </Text>

            <Text
              className={`mb-2 ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}
            >
              {/* Usuário: {selectedUser?.username} */}
            </Text>

            <View className="flex-row justify-between">
              <TouchableOpacity
                className={`px-4 py-3 rounded-lg ${theme === "dark" ? "bg-neutral-700" : "bg-gray-200"} w-1/6`}
                onPress={() => setShowModal(false)}
              >
                <Text
                  className={theme === "dark" ? "text-white" : "text-black"}
                >
                  X
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-4 py-3 rounded-lg ${theme === "dark" ? "bg-neutral-700" : "bg-red-400"} w-1/4`}
                onPress={() => {
                  handleReject();
                  setShowModal(false);
                }}
              >
                <Text
                  className={theme === "dark" ? "text-white" : "text-black"}
                >
                  Rejeitar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-4 py-3 rounded-lg bg-green-500 ml-4 w-1/2"
                onPress={() => {
                  handleActiveTip();
                }}
                disabled={false}
              >
                <Text className="text-white font-bold">Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
