import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import Contants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../helpers/theme-context";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import axios from "axios";
import { API_URL } from "../constants/data";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.AddTipsCategoryScreen
>;
const AddTipsCategoryScreen = ({ route, navigation }: props) => {
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
  const [category, setCategory] = useState("");
  const [openTeamSupportLinks, setOpenTeamSupportLinks] = useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleCategory = (category: string) => {
    try {
      const response = axios.post(`${API_URL}/tips-category/create/category`, {
        description: category,
      });

      alert("categoria criada com sucesso!");

      navigation.navigate("AdminMainScreen", {
        idUser: "",
        typeUser: "",
        username: "",
      });
    } catch (error: any) {
      alert(error.respose.message);
    }
  };

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
          Adicionar Categoria de dicas
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-[92%] rounded-lg p-4 mt-6 mx-auto">
          <View className="border border-zinc-300 rounded-lg p-4">
            <Text className="text-black font-semibold mb-2">
              Cria categoria para que os médicos possam usar para criar as
              dicas!
            </Text>
            <TextInput
              placeholder="Exercício Físico"
              value={category}
              onChangeText={setCategory}
              className="border border-zinc-400 rounded-md px-3 py-2 text-black mb-4"
            />
            <TouchableHighlight
              onPress={() => {
                handleCategory(category);
              }}
              className="bg-blue-600 rounded-lg py-2 px-4"
            >
              <Text className="text-white text-center font-semibold">
                criar categoria
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddTipsCategoryScreen;
