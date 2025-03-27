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

const CommunityScreen = () => {
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

  const navigation = useNavigation();
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

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#505050"} />
          </Pressable>
        </View>
        <Text className="text-xl self-center text-center text-black font-bold">
          Comunidade
        </Text>
      </View>
      <View className="relative w-64 ms-4 mt-5">
        <TextInput
          placeholder="Pesquisar ..."
          className="bg-white p-3 rounded-lg mb-4 ps-10"
        />
        <View className="absolute left-3 top-2">
          <Icon name="search-outline" color={"#545454"} size={21}></Icon>
        </View>
      </View>
      <View className="mb-4 mt-5 px-4">
        <Text className="text-lg font-semibold text-zinc-700 mb-2">
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
          <View className="h-11 w-[2px] bg-slate-500/30 mt-2"></View>
          <TouchableOpacity className="px-4 bg-zinc-700 py-3 rounded-lg flex-row items-center justify-center mb-4 w-36 mx-4 mt-5">
            <Icon name="create-outline" size={20} color="white" />
            <Text className="text-white ml-2">Criar Postagem</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-4 pb-40">
          <View className="mt-5 px-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-zinc-900">Posts Recentes</Text>
              <Text
                className="text-zinc-400"
                onPress={() => alert("definir menu opcoes e integrar")}
              >
                <Icon name="ellipsis-horizontal-sharp" />
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="py-4"
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
                    <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                      Meloma
                    </Text>
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
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="share-social-outline"
                      color={"black"}
                      size={17}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Partilhar
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
                    <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                      Meloma
                    </Text>
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
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="share-social-outline"
                      color={"black"}
                      size={17}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Partilhar
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
                    <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                      Meloma
                    </Text>
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
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="share-social-outline"
                      color={"black"}
                      size={17}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Partilhar
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
                    <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                      Meloma
                    </Text>
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
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="share-social-outline"
                      color={"black"}
                      size={17}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Partilhar
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
                    <Text className="rounded-xl bg-blue-500/30 text-blue-600 font-semibold px-[11px] py-[3px]">
                      Meloma
                    </Text>
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
                  <View className="flex-row justify-start items-center me-2">
                    <Icon
                      name="share-social-outline"
                      color={"black"}
                      size={17}
                    />
                    <Text className="rounded-sm py-2 px-1 text-black text-sm">
                      Partilhar
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* 🔹 Seção de Perguntas e Respostas */}
          <Text className="text-lg font-semibold text-zinc-700 mt-4 mb-2">
            Perguntas e Respostas
          </Text>
          <TouchableOpacity className="bg-zinc-200 p-4 rounded-lg mb-3">
            <Text className="text-zinc-800 font-medium">
              "Quais são os melhores alimentos para reforçar a imunidade?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-1">5 respostas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-200 p-4 rounded-lg mb-3">
            <Text className="text-zinc-800 font-medium">
              "É normal sentir fraqueza depois da quimio?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-1">8 respostas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-200 p-4 rounded-lg mb-3">
            <Text className="text-zinc-800 font-medium">
              "É normal sentir fraqueza depois da quimio?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-1">8 respostas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-200 p-4 rounded-lg mb-3">
            <Text className="text-zinc-800 font-medium">
              "É normal sentir fraqueza depois da quimio?"
            </Text>
            <Text className="text-zinc-500 text-sm mt-1">8 respostas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CommunityScreen;

{
  /* <ScrollView showsVerticalScrollIndicator={false}>

        <View className="flex-row justify-start items-center gap-10 px-4 w-full">
          <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white mt-5">
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-back-outline"
                size={20}
                color={"#505050"}
              ></Icon>
            </Pressable>
          </View>
          <Text className="text-xl self-center text-center text-black font-bold">
            Comunidade de apoio
          </Text>
        </View>
        <View className="rounded-lg p-4 mt-2 mx-auto">
          <Text className="text-xl font-bold text-black">Grupo de Apoio</Text>
          <ScrollView
            horizontal={true}
            className="gap-2 pt-3"
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Mário
              </Text>
            </View>
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Joaquina
              </Text>
            </View>
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Estefânia
              </Text>
            </View>
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Estefânia
              </Text>
            </View>
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Estefânia
              </Text>
            </View>
            <View className="flex-col justify-strecth items-center gap-1 relative bg-zinc-200/25 rounded-xl w-20 h-24 me-4">
              <View className="bg-green-500 absolute top-0 right-0 rounded-xl h-2 w-2"></View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignContent: "center",
                  // borderWidth: 2,
                  // borderColor: "#fff",
                  marginTop: 10,
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <Text className="text-black font-semibold text-lg mt-1">
                Estefânia
              </Text>
            </View>
          </ScrollView>
        </View>

        <View className="flex-row justify-between items-center my-4 px-4">
          <Text className="text-xl font-semibold text-zinc-400">
            Posts recentes
          </Text>
          <Text className="text-sm font-bold text-blue-400">Ver Todos</Text>
        </View>
        <ScrollView
          horizontal={true}
          className="px-4"
          showsHorizontalScrollIndicator={false}
        >
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
          <View className="h-72 w-96 me-3">
            <View className="border-2 border-zinc-200 rounded-2xl p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  Mário Norberto
                </Text>
                <Text className="font-semibold text-zinc-300 text-sm">
                  1d Atrás
                </Text>
              </View>
              <Text className="text-xl font-semibold text-black mt-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate, distinctio? Voluptate,
                Voluptate, distinctio? Voluptate
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="rounded-lg p-4 mt-2 mx-auto">
          <Text className="text-xl font-bold text-black">Novos Artigos</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row justify-center items-center bg-green-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-green-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-green-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
            <View className="flex-row justify-center items-center bg-green-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                Como lidar com os efeitos colaterais durate a quimioterapia?
              </Text>

              <Text className="text-black font-light bg-white rounded-2xl px-4 py-2 absolute bottom-3 right-3">
                Ler
              </Text>
            </View>
          </ScrollView>
        </View>
        <View className="rounded-lg p-4 mt-2 mx-auto">
          <Text className="text-xl font-bold text-black">Novas Dicas</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row justify-center items-center bg-zinc-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                VIDEO
              </Text>
              <View className="text-black font-light bg-zinc-300/35 rounded-2xl px-4 py-2 absolute top-2 right-3">
                <Icon name="expand-outline" color={"black"} size={25}></Icon>
              </View>
            </View>
            <View className="flex-row justify-center items-center bg-zinc-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                VIDEO
              </Text>
              <View className="text-black font-light bg-zinc-300/35 rounded-2xl px-4 py-2 absolute top-2 right-3">
                <Icon name="expand-outline" color={"black"} size={25}></Icon>
              </View>
            </View>
            <View className="flex-row justify-center items-center bg-zinc-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                VIDEO
              </Text>
              <View className="text-black font-light bg-zinc-300/35 rounded-2xl px-4 py-2 absolute top-2 right-3">
                <Icon name="expand-outline" color={"black"} size={25}></Icon>
              </View>
            </View>
            <View className="flex-row justify-center items-center bg-zinc-400/15 mt-4 p-5 rounded-3xl  h-[16rem] w-80 me-3 relative">
              <Text className="text-3xl  text-zinc-600 font-light text-wrap text-center">
                VIDEO
              </Text>

              <View className="text-black font-light bg-zinc-300/35 rounded-2xl px-4 py-2 absolute top-2 right-3">
                <Icon name="expand-outline" color={"black"} size={25}></Icon>
              </View>
            </View>
          </ScrollView>
        </View>

        <View className="rounded-lg p-4 mt-2 mx-auto">
          <View className="flex-col justify-center items-center gap-3">
            <View className="flex-row justify-between items-center bg-green-400/15  p-4 rounded-lg">
              <View className="flex-row justify-between items-center gap-4">
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    alignContent: "center",
                    borderWidth: 2,
                    borderColor: "#fff",
                    backgroundColor: "#ccc",
                  }}
                  source={require("../../assets/whatsapp-icon.png")}
                ></Image>
                <Text className="text-lg font-semibold text-black">
                  Ir Comunidade Do whatsapp
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#999"}
                size={30}
              ></Icon>
            </View>
            <View className="flex-row justify-between items-center bg-blue-500  p-4 rounded-lg text-white">
              <View className="flex-row justify-between items-center gap-4">
                <Icon name="logo-facebook" color={"white"} size={28}></Icon>

                <Text className="text-lg font-semibold text-white">
                  Ir Comunidade Do Facebook
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#fff"}
                size={30}
              ></Icon>
            </View>
            <View className="flex-row justify-between items-center bg-blue-400  p-4 rounded-lg text-white">
              <View className="flex-row justify-between items-center gap-4 ">
                <View className="-rotate-45">
                  <Icon name="send-sharp" color={"white"} size={28}></Icon>
                </View>
                <Text className="text-lg font-semibold text-white">
                  Ir Comunidade Do Telegram
                </Text>
              </View>
              <Icon
                style={{ alignSelf: "flex-end" }}
                name="chevron-forward-outline"
                color={"#fff"}
                size={30}
              ></Icon>
            </View>
          </View>
        </View>
      </ScrollView> */
}
