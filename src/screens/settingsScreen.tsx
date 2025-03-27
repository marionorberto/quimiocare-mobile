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
} from "react-native";
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

type props = NativeStackScreenProps<BottomTabParamList>;

const SettingsScreen = ({ route, navigation }: props) => {
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
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#000"}></Icon>
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center text-black font-bold ${theme === "dark" ? "text-white" : ""}`}
        >
          Configurações
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-[92%] rounded-lg p-4 mt-6 mx-auto">
          <Text
            className={`text-xl font-bold text-black ${theme === "dark" ? "text-white" : ""}`}
          >
            Dados de Saúde
          </Text>

          <Pressable
            onPress={() => {
              navigation.navigate("History");
            }}
          >
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-text-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""}`}
                >
                  Histórico De Saúde
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Report")}>
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""}`}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="analytics-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""} `}
                >
                  Exportar Relatórios
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
        </View>
        <View className="w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text
            className={`text-xl font-bold text-black ${theme === "dark" ? "text-white" : ""} `}
          >
            Notificações
          </Text>
          <View
            className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon
                name="alarm-outline"
                color={theme === "dark" ? "#fff" : "#000"}
                size={24}
              ></Icon>
              <Text
                className={`text-lg font-semibold text-black ${theme === "dark" ? "bg-neutral-700/60 text-white" : ""}`}
              >
                Lembretes de Medicações
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={isEnabledReminderMedication ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleReminderMedication}
                    value={isEnabledReminderMedication}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>
          <View
            className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg  ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon
                name="calendar-outline"
                color={theme === "dark" ? "#fff" : "#000"}
                size={24}
              ></Icon>
              <Text
                className={`text-lg font-semibold text-black ${theme === "dark" ? "bg-neutral-700/60 text-white" : ""} `}
              >
                Alertas de Consultas
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={isEnabledConsultAlert ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleConsultAlert}
                    value={isEnabledConsultAlert}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text
            className={`text-xl font-bold text-black ${theme === "dark" ? "text-white" : ""}`}
          >
            Preferências
          </Text>
          <View
            className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg  ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon
                name="moon-outline"
                color={theme === "dark" ? "#fff" : "#000"}
                size={24}
              ></Icon>
              <Text
                className={`text-lg font-semibold text-black ${theme === "dark" ? "dark:text-white" : ""}`}
              >
                Modo Escuro/Claro
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={theme === "dark" ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    value={theme === "dark"}
                    onValueChange={() => {
                      toggleTheme();
                      alert(
                        `${theme === "dark" ? "Modo Claro Ativado! ☀️" : "Modo Escuro Ativado! 🌚"}`
                      );
                    }}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>

          <View
            className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon
                name="language-outline"
                color={theme === "dark" ? "#fff" : "#000"}
                size={24}
              ></Icon>
              <Text
                className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white bg-neutral-700/60" : ""}`}
              >
                Configuração de Idioma
              </Text>
            </View>
            <Icon
              style={{ alignSelf: "flex-end" }}
              name="chevron-forward-outline"
              color={"#999"}
              size={30}
            ></Icon>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text
            className={`text-xl font-bold text-black ${theme === "dark" ? "text-white" : ""} `}
          >
            Perfil & Conta
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="create-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""}  `}
                >
                  Editar Perfil
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              setOpenModalChangePassword(true);
            }}
          >
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""}  `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="key-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""} `}
                >
                  Alterar Senha
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
            <Modal isOpen={openModalChangePassword} withInput={false}>
              <View
                className={`flex-row justify-start items-center gap-2 mt-3 bg-white w-11/12 p-6 rounded-2xl shadow-lg ${theme === "dark" ? "bg-neutral-700/60" : ""}  `}
              >
                <Icon
                  name="lock-open-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={20}
                ></Icon>
                <View>
                  <Text className="text-black text-lg mb-2 font-semibold dark:text-white">
                    Alterar Palavra-Passe
                  </Text>
                  <TextInput
                    placeholder="Password Atual"
                    className="py-4 px-7 bg-zinc-200/60 rounded-lg placeholder:text-zinc-400 "
                  />
                  <TextInput
                    placeholder="Password Nova"
                    className="py-4 px-4 bg-zinc-200/60 rounded-lg placeholder:text-zinc-400 mt-3 w-full"
                  />
                  <View className="flex-row justify-between mt-6">
                    <TouchableOpacity
                      onPress={() => setOpenModalChangePassword(false)}
                      className="px-5 py-3 rounded-lg bg-zinc-300 me-2"
                    >
                      <Text className="text-black font-semibold">Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setOpenModalChangePassword(false)}
                      className="px-5 py-3 rounded-lg bg-blue-500"
                    >
                      <Text className="text-white font-semibold">Enviar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </Pressable>
        </View>
        <View className="w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text
            className={`text-xl font-bold text-black ${theme === "dark" ? "text-white" : ""} `}
          >
            Segurança & Privacidade
          </Text>
          <View
            className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
          >
            <View className="flex-row justify-between items-center gap-4">
              <Icon
                name="key-outline"
                color={theme === "dark" ? "#fff" : "#000"}
                size={24}
              ></Icon>
              <Text
                className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""}`}
              >
                2FA Autenticação
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={isEnabledFA ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleFA}
                    value={isEnabledFA}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>

          {/* <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="key-outline" color={"black"} size={24}></Icon>
              <Text className="text-lg font-semibold text-black">
                Permissões de Acesso
              </Text>
            </View>
            <Icon
              style={{ alignSelf: "flex-end" }}
              name="chevron-forward-outline"
              color={"#999"}
              size={30}
            ></Icon>
          </View> */}
        </View>
        <View className=" w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text
            className={`text-xl font-bold text-black ${theme === "dark" ? "text-white" : ""} `}
          >
            Ajuda & Suporte
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Faq");
            }}
          >
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="help-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""} `}
                >
                  Perguntas Frequentes
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              setOpenTeamSupportLinks(!openTeamSupportLinks);
            }}
          >
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="accessibility-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""} `}
                >
                  Falar com Equipa de Suporte
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name={
                  openTeamSupportLinks
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                color={theme === "dark" ? "#fff" : "#000"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
          {openTeamSupportLinks && (
            <View className="ps-4 mt-2 flex-col justify-center items-start mb-1 gap-2">
              <WhatsAppButton />
              <GmailButton />
            </View>
          )}
          <Pressable
            onPress={() => {
              setOpenModalFeedback(true);
            }}
          >
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="star-half-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""} `}
                >
                  Feedback
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
              <Modal isOpen={openModalFeedback} withInput={false}>
                <View
                  className={`bg-white w-11/12 p-6 rounded-2xl shadow-lg ${theme === "dark" ? "bg-zinc-800/80" : ""} `}
                >
                  {/* Título */}
                  <Text
                    className={`text-black text-xl font-semibold text-center mb-4 ${theme === "dark" ? "text-white" : ""} `}
                  >
                    Deixe seu Feedback
                  </Text>

                  {/* Seção de Avaliação */}
                  <Text
                    className={`text-zinc-700 text-sm mb-2 ${theme === "dark" ? "text-white" : ""} `}
                  >
                    Avaliação:
                  </Text>
                  <View className="flex-row justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <TouchableOpacity
                        key={num}
                        onPress={() => setRating(num)}
                        className={`p-2 mx-1 rounded-full ${
                          rating >= num ? "bg-blue-500" : "bg-zinc-300"
                        }`}
                      >
                        <Text className="text-white font-semibold">{num}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Seção de Comentário */}
                  <Text
                    className={`text-zinc-700 text-sm mb-2 ${theme === "dark" ? "text-white" : ""} `}
                  >
                    Comentário:
                  </Text>
                  <TextInput
                    placeholder="Digite seu comentário..."
                    className={`border border-zinc-300 rounded-lg p-3 text-black text-sm ${theme === "dark" ? "text-white" : ""} `}
                    multiline
                    numberOfLines={4}
                    value={comment}
                    onChangeText={setComment}
                  />
                  {/* Botões */}
                  <View className="flex-row justify-between mt-6">
                    <TouchableOpacity
                      onPress={() => setOpenModalFeedback(false)}
                      className="px-5 py-3 rounded-lg bg-zinc-300"
                    >
                      <Text
                        className={`text-black font-semibold ${theme === "dark" ? "text-white" : ""} `}
                      >
                        Cancelar
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setOpenModalFeedback(false)}
                      className="px-5 py-3 rounded-lg bg-blue-500"
                    >
                      <Text className="text-white font-semibold">Enviar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("About");
            }}
          >
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="analytics-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""} `}
                >
                  Sobre o App
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={theme === "dark" ? "#fff" : "#000"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
        </View>
        <View className=" w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text
            className={`text-xl font-bold text-black ${theme === "dark" ? "text-white" : ""} `}
          >
            Legal
          </Text>
          <Pressable onPress={() => navigation.navigate("Policy")}>
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-lock-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""}`}
                >
                  Políticas de Privacidade
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={theme === "dark" ? "#fff" : "#000"}
                size={30}
              ></Icon>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Terms")}>
            <View
              className={`flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg ${theme === "dark" ? "bg-neutral-700/60" : ""} `}
            >
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-attach-outline"
                  color={theme === "dark" ? "#fff" : "#000"}
                  size={24}
                ></Icon>
                <Text
                  className={`text-lg font-semibold text-black ${theme === "dark" ? "text-white" : ""} `}
                >
                  Termos de Uso
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={theme === "dark" ? "#fff" : "#000"}
                size={30}
              ></Icon>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
