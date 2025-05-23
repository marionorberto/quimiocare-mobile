import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Linking,
  TextInput,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "../helpers/theme-context";
import api from "../services/api";
import { API_URL_UPLOAD } from "../constants/data";
import { todasQuestions } from "../services/questions";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames.Community>;

const CommunityScreen = ({ route, navigation }: props) => {
  const openWhatsApp = () => {
    const url = `https://chat.whatsapp.com/KlSrANYmVuHK8pk2v4UBWp`;
    Linking.openURL(url).catch((err) =>
      alert("Não foi possívbel abrir o WhatsApp")
    );
  };

  const openTelegram = () => {
    const url = `https://t.me/+KlEqDgCniMFmNThk`;
    Linking.openURL(url).catch((err) =>
      alert("Não foi possívbel abrir o Telegram")
    );
  };

  const openFacebook = () => {
    const url = `https://facebook.com/groups/1012012977447681/`;
    Linking.openURL(url).catch((err) =>
      alert("Não foi possívbel abrir o Facebook")
    );
  };

  const posts = [
    {
      id: 1,
      title: "Dicas para lidar com os efeitos colaterais",
      image: "https://source.unsplash.com/400x300/?airplane",
    },
    {
      id: 2,
      title: "História inspiradora de superação",
      image: "https://source.unsplash.com/400x300/?airplane",
    },
  ];
  const videos = [
    {
      id: 1,
      title: "Como manter uma alimentação saudável",
      thumbnail: "https://source.unsplash.com/400x300/?airplane",
    },
    {
      id: 2,
      title: "Exercícios leves para pacientes",
      thumbnail: "https://source.unsplash.com/400x300/?airplane",
    },
  ];
  const { theme, toggleTheme } = useTheme();
  const [post, setPost] = useState([
    {
      id: "",
      content: "",
      subtitle: "",
      description: "",
      title: "",
      tag: "",
      createdAt: "",
      imgUrl: "",
      user: {
        username: "",
        typeUser: "",
      },
    },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: "",
      question: "",
      createdAt: "",
      updatedAt: "",
      phone: "",
      user: {
        username: "",
        typeUser: "",
      },
      imgUrl: "",
    },
  ]);

  const [questionCount, setQuestionsCounter] = useState({
    count: 0,
  });

  const fetchPosts = () => {
    api
      .get("/posts/todas")
      .then(({ data: res }) => {
        setPost(res.data[1]);
        console.log("ateçao", res.data[1][0].content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllQuestions = async () => {
    try {
      const { data } = await todasQuestions();

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

  useFocusEffect(
    useCallback(() => {
      // Essa função é chamada sempre que a tela ganha foco
      fetchPosts();

      return () => {
        // Opcional: código quando sai da tela
      };
    }, [])
  );

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-14 ${theme === "dark" ? "bg-neutral-900" : ""}`}
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View
          className={`border-[1px]  p-[3px] rounded-md  ${theme === "dark" ? "bg-neutral-900 border-zinc-600" : "bg-white border-zinc-200"}`}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={theme === "dark" ? "#fff" : "#505050"}
            />
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center  font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Comunidade
        </Text>
      </View>
      <View className="mb-4 mt-5 px-4">
        <Text
          className={`text-lg   mb-2 font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Junte-se à comunidade
        </Text>
        <View className="flex-row gap-2 justify-start items-center pt-3">
          <View className="flex-row gap-2 justify-start items-center pt-3">
            <TouchableOpacity
              className="bg-green-500/80 px-2 py-2 rounded-lg flex-row items-center h-10"
              onPress={() => openWhatsApp()}
            >
              <Icon name="logo-whatsapp" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-600 px-2 py-2 rounded-lg flex-row items-center h-10"
              onPress={() => openFacebook()}
            >
              <Icon name="logo-facebook" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-400 px-2 py-2 rounded-lg flex-row items-center h-10"
              onPress={() => openTelegram()}
            >
              <Icon name="paper-plane-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row gap-2 justify-between items-center mt-4">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreatePostScreen", { title: "Postagem" });
            }}
            className={` bg-black py-5 rounded-lg flex-row items-center justify-center mb-4 w-44 h-16  px-2 ${theme === "dark" ? "bg-neutral-700/60" : "bg-black"}`}
          >
            <Icon name="create-outline" size={20} color="white" />
            <Text className="text-white ">Criar Postagem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyPostsScreen", { title: "Postagem" });
            }}
            className={` bg-blue-500 py-1 rounded-lg flex-row items-center justify-center mb-4 h-16 w-44 px-2 ${theme === "dark" ? "bg-neutral-700/60" : "bg-black"}`}
          >
            <Icon name="eye-outline" size={20} color="white" />
            <Text className="text-white ">Minhas Postagem</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-4 pb-40">
          <View className="mt-1 px-4">
            <View className="flex-row justify-start items-center">
              <Text
                className={`font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                Posts Recentes
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="py-4"
            >
              {post.length > 0 ? (
                post.map((item) => (
                  <View
                    key={item.id}
                    className="shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-3 p-5 rounded-lg h-[16rem] relative me-3"
                  >
                    <View className="w-full py-3 pt-1">
                      <View className="flex-row justify-start items-center gap-3 mb-1">
                        <Image
                          source={{
                            uri: `http://${API_URL_UPLOAD}:3000/${item.imgUrl}`,
                          }}
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
                          {item.tag || "------------"}
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
                ))
              ) : (
                <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 ">
                  <Text className="text-blue-600  text-base text-center">
                    Sem postagens recentes!
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          <Text
            className={`text-lg font-semibold  mt-4 mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            Perguntas({questionCount.count || 0})
          </Text>
          {questions.length > 0 ? (
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
                    phone: item.phone,
                  });
                }}
                className="bg-zinc-200 p-4 rounded-lg mb-3"
              >
                <View className="flex-row items-center justify-start gap-1">
                  <Image
                    source={{
                      uri: `http://${API_URL_UPLOAD}:3000/${item.imgUrl}`,
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: "#fff",
                      backgroundColor: "#ccc",
                    }}
                  />
                  <View>
                    <Text className="text-zinc-500 text-start text-sm font-bold">
                      {item.user.username}
                    </Text>
                  </View>
                </View>
                <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-3 py-[3px] text-sm w-24 text-center my-1">
                  {item.user.typeUser}
                </Text>
                <Text className="text-zinc-800 font-medium text-lg">
                  {item.question}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 ">
              <Text className="text-blue-500  text-base text-center">
                Sem nova questão cadastrada!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CommunityScreen;
