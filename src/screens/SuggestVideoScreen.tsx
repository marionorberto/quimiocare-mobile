import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createSuggest } from "../services/suggest";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.SuggestVideoScreen
>;

const SugestaoDeVideo = ({ route, navigation }: props) => {
  const [mostrarCampo, setMostrarCampo] = useState(false);
  const [videoURL, setVideoURL] = useState("");

  const handleSubmeter = async () => {
    // Aqui você pode adicionar a lógica de envio da URL

    alert(videoURL);
    if (!videoURL) {
      alert("Campo não pode estar vazio!");
      return;
    }
    await createSuggest(videoURL);
    alert("Vídeo sugerido com sucesso, será verificado pelo administrador!");
    setMostrarCampo(false);

    navigation.goBack();
  };

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-1 bg-white pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#505050"} />
          </Pressable>
        </View>
        <Text className="text-xl text-black font-bold">Sugestão de Vídeo</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-6 px-8"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text className="text-black font-bold text-lg">Nota</Text>
        {/* Descrição */}
        <Text className="text-zinc-700 text-justify mb-4 leading-6">
          Sugerir vídeos educativos para pacientes com câncer pode ajudar no
          entendimento do tratamento, alívio da ansiedade e promoção do
          bem-estar emocional. Vídeos bem escolhidos podem explicar o processo
          da quimioterapia, alimentação saudável, exercícios leves, além de
          inspirar com histórias de superação.
        </Text>

        <Text className="text-zinc-700 text-justify mb-6 leading-6">
          Para sugerir um vídeo, escolha um link confiável do YouTube e insira
          no campo abaixo. Lembre-se de escolher vídeos que sejam acessíveis, de
          linguagem simples e com conteúdo confiável.
          <Text className="text-red-400 font-bold">
            (O seu video vai ser analisado antes da disponibilização!)
          </Text>
        </Text>

        {/* Botão para mostrar campo */}
        <Pressable
          onPress={() => setMostrarCampo(!mostrarCampo)}
          className="bg-blue-600 rounded-lg py-2 px-4 mb-6"
        >
          <Text className="text-white text-center font-semibold">
            Sugerir vídeo
          </Text>
        </Pressable>

        {/* Campo de sugestão de vídeo */}
        {mostrarCampo && (
          <View className="border border-zinc-300 rounded-lg p-4">
            <Text className="text-black font-semibold mb-2">
              Insira o link do vídeo:
            </Text>
            <TextInput
              placeholder="https://www.youtube.com/..."
              value={videoURL}
              onChangeText={setVideoURL}
              className="border border-zinc-400 rounded-md px-3 py-2 text-black mb-4"
            />
            <TouchableHighlight
              onPress={() => {
                handleSubmeter();
              }}
              className="bg-blue-600 rounded-lg py-2 px-4"
            >
              <Text className="text-white text-center font-semibold">
                Enviar sugestão
              </Text>
            </TouchableHighlight>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SugestaoDeVideo;
