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
import React, { useEffect, useState } from "react";
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
import api from "../services/api";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.MyPostsScreen
>;

const MyPostsScreen = ({ route, navigation }: props) => {
  const [post, setPost] = useState([
    {
      content: "",
      description: "",
      title: "",
      tag: "",
      createdAt: "",
      user: {
        username: "",
      },
    },
  ]);

  const fetchPosts = () => {
    api
      .get("/posts/all")
      .then(({ data: res }) => {
        setPost(res.data[1]);
        console.log("ok", res.data[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);
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
        <Text className="font-semibold mb-1">
          Veja todas as tuas postagens abaixo:
        </Text>
        {post.map((item) => (
          <View
            key={item.subtitle}
            className="shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-3 p-5 rounded-lg h-[16rem] w-full relative"
          >
            <View className="w-full py-3 pt-1">
              <View className="flex-row justify-start items-center gap-3 mb-1">
                <Image
                  source={require("../../assets/user.png")}
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
                  {item.user.username}
                </Text>
              </View>
              <View className="flex-row justify-between items-center gap-3">
                <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                  <View className="h-1 w-1 bg-blue-400 rounded-full mr-2" />
                  <Text>{item.user.typeUser}</Text>
                </Text>
                <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-3 py-[3px]  text-sm">
                  {item.tag}
                </Text>
              </View>
            </View>
            <View className="mt-2 mb-4">
              <Text className="text-xl text-zinc-600 font-light text-wrap text-justify">
                {item.title}
              </Text>
              <Text className="text-xl text-zinc-600 font-light text-wrap text-justify">
                {item.subtitle}
              </Text>
            </View>
            <View>
              <Text className="text-zinc-400">
                Postado Em <Text></Text>
                {item.createdAt.split("T")[0]}
              </Text>
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
