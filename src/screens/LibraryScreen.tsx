import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

const LibraryScreen = () => {
  const navigation = useNavigation();

  const books = [
    {
      id: 1,
      title: "Vencendo o Câncer",
      image: "https://source.unsplash.com/400x300/?book",
    },
    {
      id: 2,
      title: "Histórias de Superação",
      image: "https://source.unsplash.com/400x300/?success",
    },
  ];

  const articles = [
    {
      id: 1,
      title: "Alimentação saudável durante o tratamento",
      image: "https://source.unsplash.com/400x300/?nutrition",
    },
    {
      id: 2,
      title: "A importância do apoio emocional",
      image: "https://source.unsplash.com/400x300/?mental-health",
    },
  ];

  const youtubeChannels = [
    {
      id: 1,
      title: "Saúde e Bem-Estar",
      thumbnail: "https://source.unsplash.com/400x300/?health",
    },
    {
      id: 2,
      title: "Dicas para Pacientes Oncológicos",
      thumbnail: "https://source.unsplash.com/400x300/?doctor",
    },
  ];

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-28"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
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
          Biblioteca
        </Text>
      </View>

      <View className="relative w-64 ms-4 my-4">
        <TextInput
          placeholder="Pesquisar..."
          className="bg-white p-3 rounded-lg mb-4 ps-10"
        />
        <View className="absolute left-3 top-2">
          <Icon name="search-outline" color={"#545454"} size={21} />
        </View>
      </View>
      {/* <View className="px-4 mt-0 mb-5">
        <TouchableOpacity className="bg-zinc-900 py-3 rounded-lg flex-row items-center justify-center mb-4 mt-5 mx-4">
          <Icon name="cloud-upload-outline" size={20} color="white" />
          <Text className="text-white ml-2">Fazer Upload de Artigo</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-8">
          <Text className="text-lg font-semibold text-zinc-700 mb-2">
            Livros Recomendados
          </Text>
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
          {/* <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="w-full"
          >
            <SafeAreaView>
              <TouchableOpacity className="mb-4 w-80 me-4 h-80 bg-black rounded-3xl">
                <ImageBackground
                  source={require("../../assets/test.jpeg")}
                  resizeMode="cover"
                >
                  <Text>Inside</Text>
                </ImageBackground>
              </TouchableOpacity>
            </SafeAreaView>
            <TouchableOpacity className="mb-4 w-80 me-4 h-80 bg-black rounded-3xl"></TouchableOpacity>
          </ScrollView> */}
          <Text className="text-lg font-semibold text-zinc-700 mt-4 mb-2">
            Artigos Populares
          </Text>
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
          <Text className="text-lg font-semibold text-zinc-700 mt-4 mb-2">
            Canais do YouTube
          </Text>
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
      </ScrollView>
    </View>
  );
};

export default LibraryScreen;
