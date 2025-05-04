import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Linking,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "../helpers/theme-context";

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
      {/* <View className="relative w-64 ms-4 mt-5">
        <TextInput
          placeholder="Pesquisar ..."
          className="bg-white p-3 rounded-lg mb-4 ps-10"
        />
        <View className="absolute left-3 top-2">
          <Icon name="search-outline" color={"#545454"} size={21}></Icon>
        </View>
      </View> */}
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
        <View>
          <TouchableOpacity
            className={` bg-black py-3 rounded-lg flex-row items-center justify-center mb-4 w-36 mt-5 px-2 ${theme === "dark" ? "bg-neutral-700/60" : "bg-black"}`}
          >
            <Icon name="create-outline" size={20} color="white" />
            <Text className="text-white ">Criar Postagem</Text>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PostSingleScreen", { title: "weee" });
                }}
              >
                <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
                  <View className="w-full py-3 pt-1">
                    <View className="flex-row justify-start items-center gap-3 ">
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
                      <Text className="font-semibold text-sm text-black">
                        Mário Norberto
                      </Text>
                    </View>
                    <View className="flex-row justify-between items-center gap-3">
                      <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                        <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                        <Text>Post</Text>
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("PostSingleScreen", {
                            title: "",
                          });
                        }}
                      >
                        <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                          Meloma
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                      Como lidar com os efeitos colaterais durate a
                      quimioterapia? Como lidar com os efeitos colaterais durate
                      a quimioterapia? Como lidar com os efeitos colaterais
                      durate a quimioterapia?
                    </Text>
                  </View>
                  <View className="flex-row justify-start items-center">
                    <View className="flex-row justify-start items-center me-2">
                      <Icon
                        name="heart-circle-outline"
                        color={"black"}
                        size={18}
                      />
                      <Text className="rounded-sm py-2 px-1 text-black text-sm">
                        Adoro
                      </Text>
                    </View>

                    <View className="flex-row justify-start items-center me-2">
                      <Icon name="bookmark-outline" color={"black"} size={17} />
                      <Text className="rounded-sm py-2 px-1 text-black text-sm">
                        Guardar
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
                <View className="w-full py-3 pt-1">
                  <View className="flex-row justify-start items-center gap-3 ">
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
                    <Text className="font-semibold text-sm text-black">
                      Mário Norberto
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center gap-3">
                    <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                      <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                      <Text>Post</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PostSingleScreen", {
                          title: "",
                        });
                      }}
                    >
                      <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                        Meloma
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                  </Text>
                </View>
                <View className="flex-row justify-start items-center">
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="heart-circle-outline"
                      color={"black"}
                      size={18}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Adoro
                    </Text>
                  </View>

                  <View className="flex-row justify-start items-center me-2">
                    <Icon name="bookmark-outline" color={"black"} size={17} />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Guardar
                    </Text>
                  </View>
                </View>
              </View>
              <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
                <View className="w-full py-3 pt-1">
                  <View className="flex-row justify-start items-center gap-3 ">
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
                    <Text className="font-semibold text-sm text-black">
                      Mário Norberto
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center gap-3">
                    <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                      <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                      <Text>Post</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PostSingleScreen", {
                          title: "",
                        });
                      }}
                    >
                      <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                        Meloma
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                  </Text>
                </View>
                <View className="flex-row justify-start items-center">
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="heart-circle-outline"
                      color={"black"}
                      size={18}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Adoro
                    </Text>
                  </View>

                  <View className="flex-row justify-start items-center me-2">
                    <Icon name="bookmark-outline" color={"black"} size={17} />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Guardar
                    </Text>
                  </View>
                </View>
              </View>
              <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
                <View className="w-full py-3 pt-1">
                  <View className="flex-row justify-start items-center gap-3 ">
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
                    <Text className="font-semibold text-sm text-black">
                      Mário Norberto
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center gap-3">
                    <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                      <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                      <Text>Post</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PostSingleScreen", {
                          title: "",
                        });
                      }}
                    >
                      <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                        Meloma
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                  </Text>
                </View>
                <View className="flex-row justify-start items-center">
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="heart-circle-outline"
                      color={"black"}
                      size={18}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Adoro
                    </Text>
                  </View>

                  <View className="flex-row justify-start items-center me-2">
                    <Icon name="bookmark-outline" color={"black"} size={17} />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Guardar
                    </Text>
                  </View>
                </View>
              </View>
              <View className=" shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-4 p-5 rounded-lg  h-[16rem] w-80 me-3 relative">
                <View className="w-full py-3 pt-1">
                  <View className="flex-row justify-start items-center gap-3 ">
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
                    <Text className="font-semibold text-sm text-black">
                      Mário Norberto
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center gap-3">
                    <Text className="font-semibold text-sm text-black flex-row justify-start items-center">
                      <View className="h-1 w-1 bg-blue-400 rounded-full"></View>
                      <Text>Post</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PostSingleScreen", {
                          title: "",
                        });
                      }}
                    >
                      <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                        Meloma
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text className="text-sm  text-zinc-400 font-light text-wrap text-justify">
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                    Como lidar com os efeitos colaterais durate a quimioterapia?
                  </Text>
                </View>
                <View className="flex-row justify-start items-center">
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="heart-circle-outline"
                      color={"black"}
                      size={18}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Adoro
                    </Text>
                  </View>

                  <View className="flex-row justify-start items-center me-2">
                    <Icon name="bookmark-outline" color={"black"} size={17} />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Guardar
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <Text
            className={`text-lg font-semibold  mt-4 mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            Perguntas e Respostas
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("QuestionScreen", { title: "weee" });
            }}
            className="bg-zinc-200 p-4 rounded-lg mb-3"
          >
            <Text className="text-zinc-800 font-medium text-lg">
              "Quais são os melhores alimentos para reforçar a imunidade?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-2">5 respostas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-200 p-4 rounded-lg mb-3 ">
            <Text className="text-zinc-800 font-medium text-lg">
              "É normal sentir fraqueza depois da quimio?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-2">8 respostas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-200 p-4 rounded-lg mb-3">
            <Text className="text-zinc-800 font-medium text-lg">
              "É normal sentir fraqueza depois da quimio?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-2">8 respostas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AskReplyScreen", { title: "" });
            }}
            className="bg-zinc-200 p-4 rounded-lg mb-3"
          >
            <Text className="text-zinc-800 font-medium text-lg">
              "É normal sentir fraqueza depois da quimio?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-2">8 respostas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CommunityScreen;
