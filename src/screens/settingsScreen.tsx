import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Contants from "expo-constants";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomTabParamList } from "../constants/types";
import Modal from "../components/Modal";

type props = NativeStackScreenProps<BottomTabParamList>;

const SettingsScreen = ({ route, navigation }: props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalOpen, SetModalOpen] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon
                name="document-text-outline"
                color={"black"}
                size={24}
              ></Icon>
              <Text className="text-lg font-semibold text-black">
                Histórico Sintomas
              </Text>
            </View>
            <Icon
              style={{ alignSelf: "flex-end" }}
              name="chevron-forward-outline"
              color={"#999"}
              size={30}
            ></Icon>
          </View>

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
                    thumbColor={isEnabled ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
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
                    thumbColor={isEnabled ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
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
                    thumbColor={isEnabled ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
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
                    thumbColor={isEnabled ? "#000" : "#fff"}
                    ios_backgroundColor="#fff"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </View>

          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
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
          </View>
        </View>
        <View className=" w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className="text-xl font-bold text-black">Ajuda & Suporte</Text>
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
              name="chevron-forward-outline"
              color={"#999"}
              size={30}
            ></Icon>
          </View>

          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon name="star-half-outline" color={"black"} size={24}></Icon>
              <Text className="text-lg font-semibold text-black">Feedback</Text>
            </View>
            <Icon
              style={{ alignSelf: "flex-end" }}
              name="chevron-forward-outline"
              color={"#999"}
              size={30}
            ></Icon>
          </View>
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
        </View>

        <View className=" w-[92%] rounded-lg p-4 mt-3 mx-auto">
          <Text className="text-xl font-bold text-black">Legal</Text>
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

          <View className="flex-row justify-between items-center bg-white mt-2 p-4 rounded-lg">
            <View className="flex-row justify-between items-center gap-4">
              <Icon
                name="document-attach-outline"
                color={"black"}
                size={24}
              ></Icon>
              <Pressable onPress={() => SetModalOpen(true)}>
                <Text className="text-lg font-semibold text-black">
                  Termos de Uso
                </Text>
              </Pressable>
              <Modal isOpen={modalOpen} withInput={false}>
                <View className="w-[92%] rounded-lg p-4 bg-slate-50  px-4 py-5 h-80 relative">
                  <View className="absolute top-3 right-3">
                    <TouchableOpacity
                      onPress={() => {
                        SetModalOpen(false);
                      }}
                    >
                      <Icon
                        name="close-circle-outline"
                        color={"#999999"}
                        size={30}
                      ></Icon>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-black font-bold text-xl">
                    Envie o seu Feedback
                  </Text>
                  <Text className="text-zinc-500 my-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    consectetur adipisicing elit.
                  </Text>
                  <TextInput className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400 w-full h-36"></TextInput>
                  <TouchableOpacity
                    onPress={() => {
                      SetModalOpen(false);
                    }}
                    className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25 mt-2"
                  >
                    <View className="flex-row justify-center items-center gap-4">
                      <Text className="text-white text-center font-semibold text-lg">
                        Enviar Feedback
                      </Text>
                      <Icon
                        name="send-outline"
                        color={"white"}
                        size={18}
                      ></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <Icon
              style={{ alignSelf: "flex-end" }}
              name="chevron-forward-outline"
              color={"#999"}
              size={30}
            ></Icon>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
