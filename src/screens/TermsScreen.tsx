import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CheckBox from "expo-checkbox";
import Contants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../constants/types";
import { List } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const TermsScreen = ({ route, navigation }: props) => {
  const [agreed, setAgreed] = useState(true);

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full px-4 pt-8 pb-10"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-start items-center gap-10">
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
            Termos de uso
          </Text>
        </View>
        <View className="mt-6">
          <SafeAreaView className="flex-1 bg-white p-6">
            <ScrollView className="flex-1">
              {/* Título */}

              {/* Introdução */}
              <Text className="text-zinc-700 text-sm mb-4">
                Bem-vindo ao Quimio App! Leia atentamente os Termos de Uso antes
                de utilizar o aplicativo.
              </Text>

              {/* Seção 1 */}
              <Text className="text-black text-lg font-semibold mb-2">
                1. Uso do Aplicativo
              </Text>
              <Text className="text-zinc-600 text-sm mb-4">
                O aplicativo destina-se ao acompanhamento do tratamento
                quimioterápico, permitindo o registro de sintomas, lembretes e
                acesso a informações relevantes.
              </Text>

              {/* Seção 2 */}
              <Text className="text-black text-lg font-semibold mb-2">
                2. Responsabilidades do Usuário
              </Text>
              <Text className="text-zinc-600 text-sm mb-4">
                O usuário deve fornecer informações precisas e compreende que o
                app não substitui um acompanhamento médico profissional.
              </Text>

              {/* Seção 3 */}
              <Text className="text-black text-lg font-semibold mb-2">
                3. Privacidade e Dados
              </Text>
              <Text className="text-zinc-600 text-sm mb-4">
                Os dados coletados são protegidos conforme nossa Política de
                Privacidade. Nenhuma informação será compartilhada sem
                consentimento.
              </Text>
              {/* Checkbox e Botão de Aceitação */}
              <TouchableOpacity
                className="flex-row items-center mb-6"
                onPress={() => setAgreed(!agreed)}
              >
                <CheckBox
                  value={agreed}
                  onValueChange={setAgreed}
                  className="pt-1 ms-2"
                />
                <Text className="text-zinc-700 ml-2">
                  Eu aceito os Termos de Uso
                </Text>
              </TouchableOpacity>

              {/* Botão Confirmar */}
              <TouchableOpacity
                disabled={!agreed}
                onPress={() => navigation.goBack()}
                className={`py-3 rounded-lg ${agreed ? "bg-blue-500" : "bg-zinc-300"}`}
              >
                <Text
                  className={`text-white text-center text-lg font-semibold`}
                >
                  Confirmar
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsScreen;
