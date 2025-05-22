import {
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Contants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import CheckBox from "expo-checkbox";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames.Policy>;

const PrivacyPolicyScreen = ({ route, navigation }: props) => {
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
        <View className="mt-6"></View>
        <SafeAreaView className="flex-1 bg-white p-6">
          <ScrollView className="flex-1">
            {/* Título */}
            <Text className="text-black text-2xl font-bold mb-4 text-center">
              Política de Privacidade
            </Text>

            {/* Introdução */}
            <Text className="text-zinc-700 text-sm mb-4">
              A sua privacidade é importante para nós. Esta Política de
              Privacidade explica como coletamos, usamos e protegemos seus dados
              no Quimio App.
            </Text>

            {/* Seção 1 */}
            <Text className="text-black text-lg font-semibold mb-2">
              1. Coleta de Informações
            </Text>
            <Text className="text-zinc-600 text-sm mb-4">
              O Quimio App coleta dados pessoais como nome, e-mail e informações
              de saúde que você voluntariamente insere no aplicativo. Além
              disso, podemos coletar dados de uso anônimos para melhorar a
              experiência do usuário.
            </Text>

            {/* Seção 2 */}
            <Text className="text-black text-lg font-semibold mb-2">
              2. Uso das Informações
            </Text>
            <Text className="text-zinc-600 text-sm mb-4">
              Utilizamos seus dados para fornecer recursos do aplicativo, como
              monitoramento de sintomas, lembretes de medicação e acesso à
              biblioteca de informações. Nunca compartilhamos seus dados sem sua
              autorização.
            </Text>

            {/* Seção 3 */}
            <Text className="text-black text-lg font-semibold mb-2">
              3. Proteção e Segurança
            </Text>
            <Text className="text-zinc-600 text-sm mb-4">
              Implementamos medidas de segurança avançadas para proteger seus
              dados contra acesso não autorizado, uso indevido ou divulgação.
              Seus dados são armazenados de forma segura e criptografada.
            </Text>

            {/* Seção 4 */}
            <Text className="text-black text-lg font-semibold mb-2">
              4. Seus Direitos
            </Text>
            <Text className="text-zinc-600 text-sm mb-4">
              Você tem o direito de acessar, corrigir ou excluir seus dados a
              qualquer momento. Para solicitações, entre em contato conosco pelo
              e-mail de suporte disponível no app.
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
                Eu concordo com a Política de Privacidade
              </Text>
            </TouchableOpacity>

            {/* Botão Confirmar */}
            <TouchableOpacity
              disabled={!agreed}
              onPress={() => navigation.goBack()}
              className={`py-3 rounded-lg ${agreed ? "bg-blue-500" : "bg-zinc-300"}`}
            >
              <Text className={`text-white text-center text-lg font-semibold`}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
