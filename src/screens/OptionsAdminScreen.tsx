import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
  Pressable,
  SafeAreaView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../helpers/theme-context";
import Constants from "expo-constants";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

export default function OpcoesAdminScreen({ route, navigation }: props) {
  const opcoes = [
    { id: 1, name: "Gerenciar Usuários", icon: "people-outline" },
    { id: 2, name: "Relatórios Gerapis", icon: "document-text-outline" },
    { id: 3, name: "Notificações", icon: "notifications-outline" },
    { id: 4, name: "Definições do Sistema", icon: "settings-outline" },
  ];
  const { theme, toggleTheme } = useTheme();
  return (
    <ScrollView
      className={`flex-1 px-4 pt-10 ${theme === "dark" ? "bg-neutral-900" : ""}`}
      style={{ backgroundColor: theme === "dark" ? undefined : "#f1f1f1" }}
    >
      <View
        style={{ marginTop: Constants.statusBarHeight }}
        className="flex-col justify-center items-stretch  pb-8"
      >
        <View className="flex-row justify-start items-center gap-10 px-4 mt-4 mb-5">
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
            Livro
          </Text>
        </View>

        <Text className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
          Opções do Administrador
        </Text>
        {opcoes.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="p-4 bg-white rounded-lg flex-row items-center mb-3"
          >
            <Text>
              <Icon name={item.icon} size={24} color="#2563EB" />
            </Text>
            <Text className="ps-4 text-zinc-900 dark:text-white font-medium">
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
