import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createSuggest } from "../services/suggest";
import { myQuestions, createQuestion } from "../services/questions";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.MyQuestionScreen
>;
const MyQuestionScreen = ({ route, navigation }: props) => {
  const [showField, setshowField] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: "",
      question: "",
      createdAt: "",
      updatedAt: "",
      user: {
        username: "",
        typeUser: "",
      },
      imgUrl: "",
    },
  ]);
  const [questionCounter, setQuestionsCounter] = useState({
    count: 0,
  });

  const fetchAllQuestions = async () => {
    try {
      const { data } = await myQuestions();

      setQuestions(data[1]);
      console.log(data[1]);
      setQuestionsCounter(data[0]);
      // console.log(data[0]);
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

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
        <Text className="text-xl text-black font-bold">Minhas Perguntas</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-6 px-8"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text className="text-zinc-500 mb-3">
          Total de perguntas({questionCounter.count || 0})
        </Text>
        {questions &&
          questions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate("QuestionScreen", {
                  id: item.id,
                  question: item.question,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                  user: {
                    username: item.user.username,
                    typeUser: item.user.typeUser,
                  },
                  imgUrl: item.imgUrl,
                });
              }}
              className="bg-zinc-200 p-4 rounded-lg mb-3"
            >
              <Text className="text-zinc-800 font-medium text-lg">
                {item.question}
              </Text>
              <Text className="text-zinc-500 text-sm mt-2">0 respostas</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default MyQuestionScreen;
