import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
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

type props = NativeStackScreenProps<BottomTabParamList>;

const SettingsScreen = ({ route, navigation }: props) => {
  const [isEnabledConsultAlert, setIsEnabledConsultAlert] = useState(false);
  const [isEnabledReminderMedication, setIsEnabledReminderMedication] =
    useState(false);
  const [isEnabledFA, setIsEnabledFA] = useState(false);
  const [isEnabledLayoutMode, setIsEnabledLayoutMode] = useState(false);
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

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
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
          Configurações
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-[92%] rounded-lg p-4 mt-6 mx-auto">
          <Text className="text-xl font-bold text-black">Dados de Saúde</Text>

          <Pressable
            onPress={() => {
              navigation.navigate("History");
            }}
          >
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-text-outline"
                  color={"black"}
                  size={24}
                ></Icon>
                <Text className="text-lg font-semibold text-black">
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
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="analytics-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
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
          <Text className="text-xl font-bold text-black">Notificações</Text>
          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="alarm-outline" color={"black"} size={24}></Icon>
              <Text className="text-lg font-semibold text-black">
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
          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="calendar-outline" color={"black"} size={24}></Icon>
              <Text className="text-lg font-semibold text-black">
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
          <Text className="text-xl font-bold text-black">Preferências</Text>
          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="moon-outline" color={"black"} size={24}></Icon>
              <Text className="text-lg font-semibold text-black">
                Modo Escuro/Claro
              </Text>
            </View>
            <View>
              <SafeAreaProvider>
                <SafeAreaView>
                  <Switch
                    trackColor={{ false: "#52525b", true: "#2563eb" }}
                    thumbColor={isEnabledLayoutMode ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={() =>
                      alert("Apenas o modo claro está disponível!")
                    }
                    value={isEnabledLayoutMode}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>

          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="language-outline" color={"black"} size={24}></Icon>
              <Text className="text-lg font-semibold text-black">
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
          <Text className="text-xl font-bold text-black">Perfil & Conta</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="create-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
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
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="key-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
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
              <View className="flex-row justify-start items-center gap-2 mt-3 bg-white w-11/12 p-6 rounded-2xl shadow-lg">
                <Icon name="lock-open-outline" color={"black"} size={20}></Icon>
                <View>
                  <Text className="text-black text-lg mb-2 font-semibold">
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
          <Text className="text-xl font-bold text-black">
            Segurança & Privacidade
          </Text>
          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="key-outline" color={"black"} size={24}></Icon>
              <Text className="text-lg font-semibold text-black">
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
          <Text className="text-xl font-bold text-black">Ajuda & Suporte</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Faq");
            }}
          >
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="help-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
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
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="accessibility-outline"
                  color={"black"}
                  size={24}
                ></Icon>
                <Text className="text-lg font-semibold text-black">
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
                color={"#999"}
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
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="star-half-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
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
                <View className="bg-white w-11/12 p-6 rounded-2xl shadow-lg">
                  {/* Título */}
                  <Text className="text-black text-xl font-semibold text-center mb-4">
                    Deixe seu Feedback
                  </Text>

                  {/* Seção de Avaliação */}
                  <Text className="text-zinc-700 text-sm mb-2">Avaliação:</Text>
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
                  <Text className="text-zinc-700 text-sm mb-2">
                    Comentário:
                  </Text>
                  <TextInput
                    placeholder="Digite seu comentário..."
                    className="border border-zinc-300 rounded-lg p-3 text-black text-sm"
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
                      <Text className="text-black font-semibold">Cancelar</Text>
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
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="analytics-outline" color={"black"} size={24}></Icon>
                <Text className="text-lg font-semibold text-black">
                  Sobre o App
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
        <View className=" w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className="text-xl font-bold text-black">Legal</Text>
          <Pressable onPress={() => navigation.navigate("Policy")}>
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-lock-outline"
                  color={"black"}
                  size={24}
                ></Icon>
                <Text className="text-lg font-semibold text-black">
                  Políticas de Privacidade
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

          <Pressable onPress={() => navigation.navigate("Terms")}>
            <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Icon
                  name="document-attach-outline"
                  color={"black"}
                  size={24}
                ></Icon>
                <Text className="text-lg font-semibold text-black">
                  Termos de Uso
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
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
