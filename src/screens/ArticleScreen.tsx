import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Constants from "expo-constants";
import { Image } from "expo-image";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const ArticleScreen = ({ route, navigation }: props) => {
  const image = { uri: "../../assets/cancer-nao-e-o-fim.jpeg" };

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch  pb-8"
    >
      <View className="relative">
        <Image
          className="w-full h-96"
          source={require("../../assets/test.jpeg")}
        />
      </View>

      <View className="px-6 mt-4">
        <View className="rounde-xl bg-blue-500/10 p-3 rounded-lg">
          <Text className="text-blue-700 font-bold">
            <Icon name="document-outline"></Icon> Resumo
          </Text>
          <Text className="text-zinc-800 mt-2 text-justify">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            quod cupiditate ab officiis provident, doloremque distinctio dicta
            aspernatur eos a aut fugiat quisquam ullam, esse quae corrupti
            molestiae ipsam repellat facere molestias aliquam itaque aperiam?
            Sed voluptates nulla aliquid doloribus.
          </Text>
        </View>
        <View className="mt-5">
          <Text className="font-semibold text-black">Porque ler?</Text>
          <Text className="text-zinc-700 mt-2 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam hic
            ad tenetur modi, nemo doloribus praesentium, id, explicabo sunt
            molestias molestiae! Fuga voluptatem corrupti debitis exercitationem
            fugit expedita molestias, eum consequatur ut distinctio libero
            sapiente ab. Odit nesciunt eos ullam hic, debitis excepturi
            voluptatibus neque consequatur explicabo, aliquid cum fuga vero,
            doloremque ut. Sapiente cum dignissimos fugiat inventore mollitia
            aliquid voluptas in qui assumenda dolorum. Ab cum, deserunt
            doloremque sapiente veniam labore quia cumque. Tempore quisquam
            minus alias iusto nemo nobis modi ut, qui nostrum ipsa tenetur
            provident sunt itaque voluptates a doloribus at est. Provident
            blanditiis tempore aliquam vero?
          </Text>
        </View>
        <View className="mt-4">
          <Text
            onPress={() => {
              navigation.navigate("BookSinglePageScreen", {
                title: "single book page",
              });
            }}
            className="text-amber-500 bg-amber-400/20 font-light  rounded-2xl px-2 py-1 w-28 flex-1 justify-center items-center"
          >
            Baixar Amazon
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ArticleScreen;

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
