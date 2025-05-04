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

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const AboutScreen = ({ route, navigation }: props) => {
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
            Sobre
          </Text>
        </View>
        <View className="mt-6"></View>
        <View>
          <SafeAreaView className="flex-1 bg-white p-6">
            <ScrollView className="flex-1">
              {/* Título */}
              <Text className="text-black text-2xl font-bold mb-4 text-center">
                Sobre o QuimioCare
              </Text>

              {/* Introdução */}
              <Text className="text-zinc-700 text-sm mb-4 text-center">
                Um aplicativo desenvolvido para oferecer suporte e monitoramento
                aos pacientes em tratamento de quimioterapia.
              </Text>

              {/* Seção 1: O que é o QuimioCare? */}
              <Text className="text-black text-lg font-semibold mb-2">
                O que é o QuimioCare?
              </Text>
              <Text className="text-zinc-600 text-sm mb-4">
                O QuimioCare é uma plataforma inovadora criada para auxiliar
                pacientes e seus familiares durante o tratamento de
                quimioterapia. Nosso objetivo é tornar o processo mais
                organizado, oferecendo ferramentas essenciais para acompanhar
                sua saúde.
              </Text>

              {/* Seção 2: Recursos Principais */}
              <Text className="text-black text-lg font-semibold mb-2">
                Recursos Principais
              </Text>
              <View className="mb-4">
                <Text className="text-blue-500 font-semibold">
                  • Monitoramento diário:
                </Text>
                <Text className="text-zinc-600 text-sm ml-4">
                  Registre sintomas e efeitos colaterais de forma rápida e
                  intuitiva.
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-blue-500 font-semibold">
                  • Lembretes inteligentes:
                </Text>
                <Text className="text-zinc-600 text-sm ml-4">
                  Receba notificações para tomar medicação e comparecer a
                  consultas médicas.
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-blue-500 font-semibold">
                  • Biblioteca confiável:
                </Text>
                <Text className="text-zinc-600 text-sm ml-4">
                  Acesse informações validadas sobre o câncer, tratamentos e
                  dicas de especialistas.
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-blue-500 font-semibold">
                  • Comunidade de apoio:
                </Text>
                <Text className="text-zinc-600 text-sm ml-4">
                  Interaja com outras pessoas na mesma jornada e compartilhe
                  experiências.
                </Text>
              </View>

              {/* Seção 3: Nossa Missão */}
              <Text className="text-black text-lg font-semibold mb-2">
                Nossa Missão
              </Text>
              <Text className="text-zinc-600 text-sm mb-4">
                Proporcionar um acompanhamento de saúde eficiente, promovendo
                autonomia e bem-estar para pacientes em tratamento de câncer.
                Queremos tornar a jornada de recuperação menos desafiadora e
                mais informativa.
              </Text>

              {/* Botão para voltar */}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="py-3 rounded-lg bg-blue-500 mt-6"
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Voltar
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
