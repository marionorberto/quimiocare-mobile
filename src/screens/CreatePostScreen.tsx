import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNotification } from "../services/notification";
import { Picker } from "@react-native-picker/picker";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const CreatePostScreen = ({ route, navigation }: props) => {
  const handleSubmeter = async () => {};

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [tag, setTag] = useState("");

  const onSave = async () => {
    if (!title || !subtitle || !content || !tag) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    try {
      await createNotification(title, subtitle, content, img, tag);

      alert("post cadastrado com sucesso!");

      navigation.goBack();
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
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
        <Text className="text-xl text-black font-bold">
          Crie a sua Postagem
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-6 px-8"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="flex-1 justify-center items-center ">
          <View className=" bg-white rounded-2xl w-full max-w-md shadow-lg">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-semibold text-zinc-900">Título*</Text>
            </View>
            <TextInput
              className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
              placeholder="Ex: Náusea, Fadiga..."
              value={title}
              onChangeText={setTitle}
            />
            <Text className="font-semibold text-zinc-900">Subtítulo*</Text>
            <TextInput
              className="border border-zinc-300 rounded-lg px-4 py-2 mb-3 h-20"
              placeholder="Detalhe os sintomas, duração, intensidade..."
              multiline
              value={subtitle}
              onChangeText={setSubtitle}
            />
            <Text className="font-semibold text-zinc-900">Conteúdo*</Text>

            <TextInput
              className="border border-zinc-300 rounded-lg px-4 py-2 mb-3 h-20"
              placeholder="Detalhe os sintomas, duração, intensidade..."
              multiline
              value={content}
              onChangeText={setContent}
            />
            <Text className="font-semibold text-zinc-900">Tag*</Text>

            <Picker
              className="border border-zinc-300 rounded-lg px-4 py-3"
              style={{ color: "#999" }}
              selectedValue={tag}
              onValueChange={(itemValue) => setTag(itemValue)}
            >
              <Picker.Item label="Selecione uma Tag de Registro" value="" />

              {/* Médicos */}
              <Picker.Item
                label="Avaliação Realizada"
                value="Avaliação Realizada"
              />
              <Picker.Item
                label="Diagnóstico Atualizado"
                value="Diagnóstico Atualizado"
              />
              <Picker.Item
                label="Medicação Prescrita"
                value="Medicação Prescrita"
              />
              <Picker.Item label="Seringa Aplicada" value="Seringa Aplicada" />
              <Picker.Item
                label="Tratamento Iniciado"
                value="Tratamento Iniciado"
              />
              <Picker.Item label="Alta Médica" value="Alta Médica" />

              {/* Pacientes */}
              <Picker.Item label="Tomei Medicação" value="Tomei Medicação" />
              <Picker.Item
                label="Tive Efeitos Colaterais"
                value="Tive Efeitos Colaterais"
              />
              <Picker.Item label="Me Sinto Estável" value="Me Sinto Estável" />
              <Picker.Item label="Estou Melhorando" value="Estou Melhorando" />
              <Picker.Item
                label="Tive Sintomas Novos"
                value="Tive Sintomas Novos"
              />
              <Picker.Item
                label="Esqueci a Medicação"
                value="Esqueci a Medicação"
              />
            </Picker>

            {/* <TouchableOpacity
              className="border-2 border-zinc-300 border-dashed rounded-lg py-3 mt-2 flex-row items-center justify-center"
              onPress={() => {
                // alert("implementar o meto");
              }}
            >
              <Icon
                name="download-outline"
                size={20}
                color="white"
                className="mr-2"
              />
              <Text className="text-black text-center font-semibold">
                carragar imagem para o post
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
              onPress={() => onSave()}
            >
              <Text className="text-white text-center font-semibold">
                Salvar Postagem
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreatePostScreen;
