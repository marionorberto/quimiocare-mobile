import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "../helpers/theme-context";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import api from "../services/api";
import { API_URL_UPLOAD } from "../constants/data";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.MyDoctorScreen
>;
const MyDoctorScreen = ({ navigation }: props) => {
  const [doctorData, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findAllDoctor();
  }, []);

  const findAllDoctor = async () => {
    await api
      .get("/my-patients/patient/doctors")
      .then(({ data: res }) => {
        setDoctor(res.data);
      })
      .catch((err: any) => {
        Alert.alert(
          "🚫 Carregando os dados do teu Medico",
          err.response.data.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { theme } = useTheme();

  // const doctorData = {
  //   name: "Dr. Carlos Silva",
  //   specialty: "Oncologista",
  //   hospital: "Hospital Central de Lisboa",
  //   bio: "Especialista em quimioterapia e cuidados paliativos.",
  //   phone: "+351 912 345 678",
  //   email: "carlos.silva@hospital.pt",
  //   photoUrl: "https://example.com/doctor-photo.jpg", // Substitua pela URL real
  // };

  // Abre o WhatsApp com o número do médico
  const handleWhatsAppContact = () => {
    if (!doctorData.phoneNumber) {
      Alert.alert(
        "🛑 Telefone do Doctor",
        "🚫 Infelizmente o telefone do doctor não está disponível, Aguarde até que ele atualize os seus dados!"
      );

      return;
    }
    const url = `https://wa.me/${doctorData.phoneNumber.replace(/\D/g, "")}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.")
    );
  };

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full px-4 pb-10 ${
        theme === "dark" ? "bg-neutral-900" : "bg-white"
      }`}
    >
      {/* Header */}
      <View className="flex-row justify-start items-center gap-10 py-4">
        <Pressable
          onPress={() => navigation.goBack()}
          className={`border-[1px] p-[3px] rounded-md ${
            theme === "dark" ? "border-zinc-600" : "border-zinc-200"
          }`}
        >
          <Icon
            name="chevron-back-outline"
            size={20}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </Pressable>
        <Text
          className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Meu Médico
        </Text>
      </View>

      {doctorData.username ? (
        <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
          <View
            className={`rounded-xl p-6 mb-6 ${
              theme === "dark" ? "bg-neutral-700/60" : "bg-white shadow-md"
            }`}
          >
            <View className="flex-col items-center">
              <Image
                source={{
                  uri: `http://${API_URL_UPLOAD}:3000/${doctorData.imgUrl}`,
                }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 70,
                  borderWidth: 2,
                  borderColor: "#fff",
                  backgroundColor: "#ccc",
                }}
              />
              <Text
                className={`text-2xl font-bold mt-4 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {doctorData.username ?? "------------"}
              </Text>
              <Text
                className={`text-lg ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {doctorData.speciality ?? "------------"}
              </Text>
              <Text
                className={`mt-2 text-center ${
                  theme === "dark" ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                {doctorData.bio ?? "------------"}
              </Text>
            </View>

            {/* Informações de Contato */}
            <View className="mt-6">
              <View className="flex-row items-center gap-3 mb-4">
                <Icon
                  name="business-outline"
                  size={20}
                  color={theme === "dark" ? "#A5B4FC" : "#4F46E5"}
                />
                <Text
                  className={`flex-1 ${
                    theme === "dark" ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  {doctorData.hospital ?? "------------"}
                </Text>
              </View>

              <View className="flex-row items-center gap-3 mb-4">
                <Icon
                  name="call-outline"
                  size={20}
                  color={theme === "dark" ? "#A5B4FC" : "#4F46E5"}
                />
                <Text
                  className={`flex-1 ${
                    theme === "dark" ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  {doctorData.phoneNumber ?? "------------"}
                </Text>
              </View>

              <View className="flex-row items-center gap-3 mb-4">
                <Icon
                  name="mail-outline"
                  size={20}
                  color={theme === "dark" ? "#A5B4FC" : "#4F46E5"}
                />
                <Text
                  className={`flex-1 ${
                    theme === "dark" ? "text-zinc-200" : "text-zinc-800"
                  }`}
                >
                  {doctorData.email}
                </Text>
              </View>
            </View>

            {/* Botão de WhatsApp */}
            <TouchableOpacity
              onPress={handleWhatsAppContact}
              className={`mt-6 flex-row justify-center items-center py-3 rounded-lg ${
                theme === "dark" ? "bg-green-600" : "bg-green-500"
              }`}
            >
              <Icon name="logo-whatsapp" size={24} color="#FFF" />
              <Text className="text-white font-semibold ml-2">
                Falar no WhatsApp
              </Text>
            </TouchableOpacity>
          </View>

          {/* Horários (Opcional) */}
          <View
            className={`rounded-xl p-6 mb-6 ${
              theme === "dark" ? "bg-neutral-700/60" : "bg-white shadow-md"
            }`}
          >
            <Text
              className={`text-lg font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Horário disponível para conversas!
            </Text>
            <View className="space-y-2">
              {[
                { day: "Segunda a Sexta", time: "08:00 - 18:00" },
                { day: "Sábado", time: "09:00 - 12:00" },
              ].map((item, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-600"
                >
                  <Text
                    className={`${
                      theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    {item.day}
                  </Text>
                  <Text
                    className={`font-semibold ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {item.time}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 mt-5 ">
          <Text className="text-blue-500  text-3xl text-center">
            Sem médico atribuído, Aguarde até que quimiocare atribua-te um
            doctor
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MyDoctorScreen;
