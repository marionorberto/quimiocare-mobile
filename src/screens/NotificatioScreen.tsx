import React, { useCallback, useEffect, useState } from "react";
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
import api from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { EnumEmojis } from "../constants/enums";

type props = NativeStackScreenProps<BottomTabParamList>;

const NotificationScreen = ({ navigation, route }: props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<null | {
    id: string;
    title: string;
    content: string;
    dismis: string;
    active: boolean;
  }>(null);

  const [filter, setFilter] = useState("todas");
  const [notifications, setNotification] = useState(null);
  const [alerts, setAlerts] = useState<
    | null
    | {
        id: string;
        title: string;
        content: string;
        status: string;
        sender: string;
        dismiss: boolean;
        user: {
          id: string;
          username: string;
          email: string;
          typeUser: string;
          active: boolean;
        };
        createdAt: Date;
        updatedAt: Date;
      }[]
  >(null);

  const fectchAlerts = async () => {
    try {
      const { data: response } = await api.get("/alerts/myAlerts");
      setAlerts(response.data[1]);

      console.log("Meus alertas", response.data[1]);
    } catch (error) {
      console.log("failed to get alert");
    }
  };

  const [isEnabledReadNotification, setIsEnabledReadNotification] =
    useState(false);
  const toggleReadNotification = () =>
    setIsEnabledReadNotification((previousState) => !previousState);

  const handleDismiss = async (id: string) => {
    await api
      .get("/alerts/dismiss/" + id)
      .then((res) => {
        navigation.goBack();
        Alert.alert(
          EnumEmojis.OK + "Notificação",
          "Sua notificação foi removida com sucesso!"
        );
      })
      .catch((error) => {
        Alert.alert(
          EnumEmojis.CATION + "Remover Notificação",
          "Tem certeza que deseja remover esta notificação?"
        );
      });
  };

  useFocusEffect(
    useCallback(() => {
      fectchAlerts();
      return () => {};
    }, [])
  );

  useEffect(() => {
    fectchAlerts();
  }, []);

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-6 px-4">
          <View className="mt-3 flex-row justify-between items-center my-4">
            <Text className="text-lg font-semibold text-zinc-900 mb-2">
              Notificações ({alerts ? alerts.length : "0"})
            </Text>
            <View className="flex-row justify-end items-center">
              {/* <Text className="text-neutral-500">Mostrar não lidas </Text> */}
              {/* <View>
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
              </View> */}
            </View>
          </View>

          {alerts?.length > 0 ? (
            alerts?.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="p-4 bg-white rounded-lg flex-row items-center mb-3 relative"
              >
                <Text>
                  <Icon
                    name={"balloon-outline"}
                    size={24}
                    color="#2563EB"
                    className="mr-4"
                  />
                </Text>
                <View className="overflow-hidden text-nowrap ps-3 ">
                  <Text className="text-zinc-900 font-medium">
                    {item.title}
                  </Text>
                  <Text className="text-zinc-600 overflow-x-hidden text-wrap text-sm">
                    {item.content}
                  </Text>
                </View>
                <View className="overflow-hidden text-nowrap ps-3 ">
                  <Text className="text-zinc-900 font-medium">
                    {item.title}
                  </Text>
                  <Text className="text-blue-500   text-sm">{item.sender}</Text>
                </View>

                <Pressable
                  onPress={() => {
                    Alert.alert(
                      EnumEmojis.CATION + "Remover Notificação",
                      "Tem certeza que deseja remover esta notificação?",
                      [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Remover",
                          onPress: () => handleDismiss(item.id),
                        },
                      ]
                    );
                  }}
                  className="absolute top-3 right-5 shadow-sm shadow-zinc-300 rounded-full h-7 w-6"
                >
                  <Text>
                    <Icon name={"trash-outline"} size={27} color="#2563EB" />
                  </Text>
                </Pressable>
              </TouchableOpacity>
            ))
          ) : (
            <View>
              <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 ">
                <Text className="text-blue-400  text-base text-center">
                  Sem nova notificações disponível!
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
