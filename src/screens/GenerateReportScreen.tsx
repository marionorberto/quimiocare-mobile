import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import Contants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomTabParamList } from "../constants/types";
import Modal from "../components/Modal";
import WhatsAppButton from "../components/LinkWhatsappSupport";
import GmailButton from "../components/LinkGmailSupport";
// import { useColorScheme } from "nativewind";
import { useTheme } from "../helpers/theme-context";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.GenerateReportScreen
>;

const GenerateReportScreen = ({ route, navigation }: props) => {
  // const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isEnabledConsultAlert, setIsEnabledConsultAlert] = useState(true);
  const [isEnabledReminderMedication, setIsEnabledReminderMedication] =
    useState(true);
  const [isEnabledFA, setIsEnabledFA] = useState(true);
  // const [theme === 'dark', settheme === 'dark'] = useState(false);
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const toggleReminderMedication = () =>
    setIsEnabledReminderMedication((previousState) => !previousState);
  const toggleFA = () => setIsEnabledFA((previousState) => !previousState);
  const toggleConsultAlert = () =>
    setIsEnabledConsultAlert((previousState) => !previousState);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openTeamSupportLinks, setOpenTeamSupportLinks] = useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
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
              color={theme === "dark" ? "#fff" : "#000"}
            ></Icon>
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center  font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Geral Relatórios Gerais
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-[92%] rounded-lg p-4 mt-6 mx-auto">
          <Text>Hello</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default GenerateReportScreen;
