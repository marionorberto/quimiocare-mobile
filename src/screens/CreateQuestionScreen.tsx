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
import { createQuestion } from "../services/questions";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.CreateQuestionScreen
>;
const CreateQuestionScreen = ({ route, navigation }: props) => {
  const [showField, setshowField] = useState(false);
  const [question, setQuestion] = useState("");

  const handleSubmeter = async () => {
    // Aqui você pode adicionar a lógica de envio da URL

    try {
      if (!question) {
        alert("Campo não pode estar vazio!");
        return;
      }
      await createQuestion(question);
      alert(
        "Pergunta enviada com sucesso, será verificado pelo administrador!"
      );
      setshowField(false);
    } catch (err: any) {
      console.log(err);
      alert("eroo");
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
        <Text className="text-xl text-black font-bold">Criar uma Pergunta</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-6 px-8"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text className="text-black font-bold text-lg">Nota</Text>
        {/* Descrição */}
        <Text className="text-zinc-700 text-justify mb-4 leading-6">
          Crie novas perguntas médicas para pacientes com câncer possam estar
          ilucidados sobre as opiniões do médicos experientes na área de modo a
          perguntas frequentes possam ser respondidas por
        </Text>

        <Text className="text-zinc-700 text-justify mb-6 leading-6">
          profissionais médicos experientes na área, para isso formule bem as
          suas perguntas, porque doutores verão e os administradores quimiocare
          também verão.
          <Text className="text-red-400 font-bold">
            (A sua questão vai ser analisado antes da disponibilização!)
          </Text>
        </Text>
        <Pressable
          onPress={() => {
            setshowField(!showField);
            navigation.navigate("MyQuestionScreen", { title: "aa" });
          }}
          className="bg-black rounded-lg py-2 px-4 mb-6"
        >
          <Text className="text-white text-center font-semibold">
            Ver Questões Criadas
          </Text>
        </Pressable>
        {/* Botão para mostrar campo */}
        <Pressable
          onPress={() => setshowField(!showField)}
          className="bg-blue-600 rounded-lg py-2 px-4 mb-6"
        >
          <Text className="text-white text-center font-semibold">
            Criar Questão
          </Text>
        </Pressable>

        {/* Campo de sugestão de vídeo */}
        {showField && (
          <View className="border border-zinc-300 rounded-lg p-4">
            <Text className="text-black font-semibold mb-2">
              Crie a sua questão:
            </Text>
            <TextInput
              placeholder="Ex: Porque que a maioria dos pacientes com cancer têm perda de cabelo?"
              value={question}
              onChangeText={setQuestion}
              className="border border-zinc-400 rounded-md px-3 py-2 text-black mb-4"
            />
            <TouchableHighlight
              onPress={() => {
                handleSubmeter();
              }}
              className="bg-blue-600 rounded-lg py-2 px-4"
            >
              <Text className="text-white text-center font-semibold">
                Enviar Questão
              </Text>
            </TouchableHighlight>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CreateQuestionScreen;
