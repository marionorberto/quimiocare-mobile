import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  SafeAreaView,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import api from "../services/api";
import { EnumEmojis } from "../constants/enums";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.MyTipsScreen
>;

const MyTipsScreen = ({ route, navigation }: props) => {
  const [tips, setTips] = useState([
    { count: 0 },
    [
      {
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
          email: "",
        },
        createdAt: "",
        updatedAt: "",
      },
    ],
  ]);

  const fetchTips = async () => {
    await api
      .get("/tips/my-tips")
      .then(({ data: res }) => {
        setTips(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const [openModalAddTip, setOpenModalAddTip] = useState(false);

  const handleEditTip = async (tip: string) => {};

  const handleDeleteTip = async (tip: string) => {};

  // const tips = [
  //   {
  //     id: "1",
  //     category: "alimentação",
  //     description:
  //       "Mantenha uma alimentação equilibrada com frutas, legumes e proteínas magras diariamente.",
  //   },
  //   {
  //     id: "2",
  //     category: "hidratação",
  //     description:
  //       "Beba pelo menos 2 litros de água por dia para manter o corpo hidratado.",
  //   },
  //   {
  //     id: "3",
  //     category: "sono",
  //     description:
  //       "Durma entre 7 e 9 horas por noite para melhorar sua saúde física e mental.",
  //   },
  //   {
  //     id: "4",
  //     category: "exercício",
  //     description:
  //       "Pratique atividades físicas por pelo menos 30 minutos, 5 vezes por semana.",
  //   },
  //   {
  //     id: "5",
  //     category: "meditação",
  //     description:
  //       "Reserve alguns minutos do dia para respirar fundo, meditar ou relaxar a mente.",
  //   },
  // ];

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#505050"} />
          </Pressable>
        </View>
        <Text className="text-xl self-center text-center text-black font-bold">
          Minhas Dicas
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-4 p-3">
          <View className="flex-row justify-start items-center mb-3">
            <Text className="text-zinc-500 text-base">
              Total de Dicas ({tips[0].count || 0})
            </Text>
          </View>

          {tips.length > 0 ? (
            tips[1].map((tip) => (
              <TouchableOpacity
                key={tip.id}
                className="p-4 bg-white rounded-lg flex-row items-start mb-3 relative"
              >
                <Text className="pt-1">
                  <Icon name="bulb-outline" size={24} color="#2563EB" />
                </Text>

                <View className="ps-3 flex-1">
                  <Text className="text-zinc-900 font-medium text-base">
                    {tip.description}
                  </Text>
                  <Text className="text-zinc-600 text-sm mt-1">
                    {tip.category.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="bg-white w-full p-4 rounded-lg">
              <Text className="text-blue-600 font-semibold text-sm text-center">
                <Icon name="alert-circle-outline" color={"#ca8a04"} size={24} />
                {EnumEmojis.CATION} Adicione uma{" "}
                <Text className="font-bold">dica</Text> para poder vê-las!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyTipsScreen;
