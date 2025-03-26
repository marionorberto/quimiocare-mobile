import {
  ImageBackground,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Linking,
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
  ScreenNames.BookSinglePageScreen
>;

const BookSinglePageScreen = ({ route, navigation }: props) => {
  const book = route.params.art;
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
          Livro
        </Text>
      </View>
      <View className="self-start flex-col justify-center items-start mt-4 mb-[1px] px-4">
        <Text className="text-xl  text-black font-semibold text-wrap text-start">
          Título: {book.title}
        </Text>
        <Text className="text-zinc-500 text-start text-lg">
          Autor: {book.author}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{
            width: "100%",
            height: 240,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 20,
            alignContent: "center",
          }}
          source={book.image}
        />

        <View className="px-6 mt-4 pb-24">
          <View className="rounde-xl bg-blue-500/10 p-3 rounded-lg">
            <Text className="text-blue-600 font-bold  text-xl">
              <Icon name="book-outline" size={20}></Icon> Livro
            </Text>
          </View>
          <View className="mt-5">
            <Text className="font-bold text-black text-lg">
              Porquê ler? - SINOPSE
            </Text>
            <Text className="text-zinc-700 mt-2 text-justify text-lg">
              {book.content ? book.content : "SINOPSE NÃO DISPONÍVEL"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!book.link) {
                alert("Link não disponível");
                return;
              }
              Linking.openURL(book.link).catch((error: any) =>
                alert("Link não disponível")
              );
            }}
          >
            <View className="rounde-xl bg-zinc-500/40 p-3 rounded-lg mt-4">
              <Text className="text-black font-bold  text-lg text-center">
                <Icon name="download-outline" size={20}></Icon>{" "}
                {book.link ? "Comprar na Amazon" : "Download não disponível"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookSinglePageScreen;

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
