import {
  ImageBackground,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Linking,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  NativeStackNavigatorProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Constants from "expo-constants";
import { Image } from "expo-image";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.QuestionScreen
>;

const QuestionScreen = ({ route, navigation }: props) => {
  const [showInputReply, setShowInputReply] = useState(false);
  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch  pb-8"
    >
      {/* Campo de sugestão de vídeo */}

      <View className="flex-row justify-start items-center gap-10 px-4 mt-4 mb-5">
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
          Perguntas & Respostas
        </Text>
      </View>

      <View className="self-start flex-col justify-center items-start mt-4 mb-[1px] px-8  rounded-lg w-full">
        <View className="flex-row justify-start items-center  gap-3">
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              alignContent: "center",
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: "#ccc",
            }}
            source={require("../../assets/user.png")}
          />
          <View>
            <Text className="text-zinc-500 text-start text-lg font-bold">
              marionorberto
            </Text>
            <Text className="text-blue-600 bg-blue-300/40 rounded-lg  text-center p-1">
              Cancer
            </Text>
          </View>
        </View>
        <TouchableOpacity className="bg-zinc-200 p-4 rounded-lg my-4 w-full">
          <Text className="text-zinc-800 font-medium ">
            "É normal sentir fraqueza depois da quimio?"
          </Text>
          <Text className="text-zinc-500 text-sm mt-1">8 respostas</Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => setShowInputReply(!showInputReply)}
          className="bg-blue-600 rounded-lg py-2 px-4 mb-6"
        >
          <Text className="text-white text-center font-semibold">
            Responder
          </Text>
        </Pressable>

        {showInputReply && (
          <View className="border border-zinc-300 rounded-lg p-4 w-full">
            <Text className="text-black font-semibold mb-2">
              Escreva a sua resposta:
            </Text>
            <TextInput
              placeholder="Resposta...."
              // value={}
              // onChangeText={}
              className="border border-zinc-400 rounded-md px-3 py-2 text-black mb-4"
            />
            <TouchableHighlight
              onPress={() => {
                //  handleSubmitResponse();
                alert("Submit response");
              }}
              className="bg-blue-600 rounded-lg py-2 px-4"
            >
              <Text className="text-white text-center font-semibold">
                Enviar Resposta
              </Text>
            </TouchableHighlight>
          </View>
        )}
        <Text className="my-4">Respostas:</Text>
        <View className=" rounded-lg p-3 mb-5 border-b-2 border-zinc-200 w-full">
          <View className="mb-3 ">
            <View className="flex-row">
              <Image
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 50,
                  alignContent: "center",
                  borderWidth: 2,
                  borderColor: "#fff",
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <View>
                <Text className="text-zinc-500 text-start text-sm font-bold">
                  marionorberto
                </Text>
              </View>
            </View>
            <View className="bg-zinc-200 rounded-lg mt-1 p-4">
              <Text>adaadalaklkakldlladasdasdas</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  backgroundImage: {
    position: "absolute",
    width: 100,
    height: 300,
  },
});
