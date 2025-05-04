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
import { useNavigation } from "@react-navigation/native";

const posts = [
  {
    id: "1",
    author: "Mário Norberto",
    avatar: require("../../assets/user.png"),
    type: "Post",
    tag: "Meloma",
    content:
      "Como lidar com os efeitos colaterais durante a quimioterapia? Neste post, vamos abordar maneiras práticas e acessíveis de minimizar os efeitos adversos.",
  },
  {
    id: "2",
    author: "Camila Ribeiro",
    avatar: require("../../assets/user.png"),
    type: "Post",
    tag: "Ansiedade",
    content:
      "A ansiedade afeta milhões de pessoas no mundo todo. Conheça técnicas simples de respiração e rotina que ajudam a controlar os sintomas no dia a dia.",
  },
  {
    id: "3",
    author: "João Marcelo",
    avatar: require("../../assets/user.png"),
    type: "Post",
    tag: "Saúde Mental",
    content:
      "Falar sobre saúde mental é essencial. Neste post, trago minha experiência pessoal com terapia e como ela transformou minha visão sobre autocuidado.",
  },
];

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.MyPostsScreen
>;

const MyPostsScreen = ({ route, navigation }: props) => {
  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-start items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#505050"} />
          </Pressable>
        </View>
        <Text className="text-xl text-black font-bold">Minhas Postagens</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-6 px-4"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {posts.map((post) => (
          <View
            key={post.id}
            className="shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg h-[16rem] w-full relative"
          >
            <View className="w-full py-3 pt-1">
              <View className="flex-row justify-start items-center gap-3 mb-1">
                <Image
                  source={post.avatar}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: "#fff",
                    backgroundColor: "#ccc",
                  }}
                />
                <Text className="font-semibold text-sm text-black">
                  {post.author}
                </Text>
              </View>
              <View className="flex-row justify-between items-center gap-3">
                <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                  <View className="h-1 w-1 bg-blue-400 rounded-full mr-2" />
                  <Text>{post.type}</Text>
                </Text>
                <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                  {post.tag}
                </Text>
              </View>
            </View>

            <View className="mt-2 mb-4">
              <Text className="text-sm text-zinc-400 font-light text-wrap text-justify">
                {post.content}
              </Text>
            </View>

            <View className="flex-row justify-start items-center">
              <View className="flex-row justify-start items-center me-4">
                <Icon name="heart-circle-outline" color={"black"} size={18} />
                <Text className="text-black text-sm ml-1">Adoro</Text>
              </View>

              <View className="flex-row justify-start items-center">
                <Icon name="bookmark-outline" color={"black"} size={17} />
                <Text className="text-black text-sm ml-1">Guardar</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyPostsScreen;

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
