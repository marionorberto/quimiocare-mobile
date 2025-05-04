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
} from "react-native";
import React from "react";
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
  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch  pb-8"
    >
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

      <View className="self-start flex-col justify-center items-start mt-4 mb-[1px] px-8">
        <View className="flex-row justify-start items-center mb-3">
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
            <Text className="text-zinc-500 text-start text-lg">
              marionorberto
            </Text>
            <Text>Cancer</Text>
          </View>
        </View>
        <Text className="text-xl  text-black  text-wrap text-start">
          algum titulo algum titulo algum titulo algum titulo algum titulo
        </Text>
        <Text className="text-zinc-500 text-sm mt-2">8 respostas</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 mt-4 pb-24">
          <View className="rounde-xl bg-blue-500/10 p-3 rounded-lg">
            <Text className="text-blue-600 font-bold  text-xl text-center">
              Responder
            </Text>
          </View>
          <TextInput
            className="border-2 rounded-lg border-zinc-300 mt-5 p-3 pt-1 h-28"
            placeholder="Minha Resposta é!"
          />
        </View>
      </ScrollView>
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
