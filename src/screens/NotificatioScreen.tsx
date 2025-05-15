import React, { useState } from "react";
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
import { BottomTabParamList } from "../constants/types";
import Constants from "expo-constants";
import { SafeAreaProvider } from "react-native-safe-area-context";

type props = NativeStackScreenProps<BottomTabParamList>;

const NotificationScreen = ({ navigation, route }: props) => {
  const [filter, setFilter] = useState("todas");

  // Notificações separadas por categoria
  // const notifications = {
  //   lembretes: [
  //     {
  //       id: 1,
  //       title: "Tomar medicamento",
  //       message: "Lembre-se de tomar sua medicação às 08h00.",
  //       icon: "medkit-outline",
  //     },
  //     {
  //       id: 2,
  //       title: "Exame agendado",
  //       message: "Você tem um exame marcado para sexta-feira às 10h00.",
  //       icon: "flask-outline",
  //     },
  //   ],

  //   alertas: [
  //     {
  //       id: 4,
  //       title: "Consulta marcada!",
  //       message: "Sua consulta com Dr. João está agendada para amanhã às 14h.",
  //       icon: "calendar-outline",
  //     },
  //   ],
  //   emails: [
  //     {
  //       id: 5,
  //       title: "Novo email recebido",
  //       message: "O hospital enviou um novo relatório sobre seu tratamento.",
  //       icon: "mail-outline",
  //     },
  //   ],
  // };

  const [isEnabledReadNotification, setIsEnabledReadNotification] =
    useState(false);
  const toggleReadNotification = () =>
    setIsEnabledReadNotification((previousState) => !previousState);

  // Função para remover notificação ao deslizar
  const handleDismiss = (id: number, category: string) => {
    Alert.alert(
      "Remover Notificação",
      "Tem certeza que deseja remover esta notificação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          onPress: () => console.log(`Notificação ${id} removida`),
        },
      ]
    );
  };

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-6"
    >
      <View className="flex-row justify-start items-center gap-10 px-4 ">
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
          Notificações
        </Text>
      </View>

      {/* Lista de Notificações */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-6 px-4">
          <View className="mt-3 flex-row justify-between items-center my-4">
            <Text className="text-lg font-semibold text-zinc-900 mb-2">
              Notificações
            </Text>
            <View className="flex-row justify-end items-center">
              <Text className="text-neutral-500">Mostrar não lidas </Text>
              <View>
                <SafeAreaProvider>
                  <SafeAreaView>
                    <Switch
                      trackColor={{ false: "#52525b", true: "#2563eb" }}
                      thumbColor={isEnabledReadNotification ? "#000" : "#fff"}
                      ios_backgroundColor="#fff"
                      onValueChange={toggleReadNotification}
                      value={isEnabledReadNotification}
                    />
                  </SafeAreaView>
                </SafeAreaProvider>
              </View>
            </View>
          </View>

          <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 ">
            <Text className="text-yellow-600  text-base text-center">
              Sem nova notificações disponível!
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity className="p-4 bg-white rounded-lg flex-row items-center mb-3 relative">
            <Text>
              <Icon
                name={"balloon-outline"}
                size={24}
                color="#2563EB"
                className="mr-4"
              />
            </Text>
            <View className="overflow-hidden text-wrap ps-3">
              <Text className="text-zinc-900 font-medium">
                Atualização de conta
              </Text>
              <Text className="text-zinc-600 overflow-x-hidden text-wrap text-sm">
                troque sempre a sua senha se verificar alguma actividade
                suspeita
              </Text>
            </View>

            <View className="absolute top-3 right-1 shadow-sm shadow-zinc-300 rounded-full h-7 w-6">
              <Text>
                <Icon name={"trash-outline"} size={14} color="#2563EB" />
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity className="p-4 bg-white rounded-lg flex-row items-center mb-3 relative">
            <Text>
              <Icon
                name={"balloon-outline"}
                size={24}
                color="#2563EB"
                className="mr-4"
              />
            </Text>
            <View className="overflow-hidden text-wrap ps-3">
              <Text className="text-zinc-900 font-medium">
                Atualização de conta
              </Text>
              <Text className="text-zinc-600 overflow-x-hidden text-wrap text-sm">
                troque sempre a sua senha se verificar alguma actividade
                suspeita
              </Text>
            </View>

            <View className="absolute top-3 right-1 shadow-sm shadow-zinc-300 rounded-full h-7 w-6">
              <Text>
                <Icon name={"trash-outline"} size={14} color="#2563EB" />
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
