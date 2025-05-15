import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../services/api";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import {
  handleSaveMedication,
  handleSaveSymptom,
} from "../services/mainService";
import { useTheme } from "../helpers/theme-context";
import { API_URL, API_URL_UPLOAD } from "../constants/data";
import { Picker } from "@react-native-picker/picker";
import Modal from "../components/Modal";
import { saveTip } from "../services/tips/create-tips";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const MainMedicoScreen = ({ navigation, route }: props) => {
  const [userImg, setUserImg] = useState("");
  const [tipsCategory, setTipsCategory] = useState([]);
  const [myTips, setMyTips] = useState();
  const [tipsCount, setTipsCount] = useState(0);
  const [tipsData, setTipsData] = useState([
    { count: 0 },
    [
      {
        id: "",
        description: "",
        category: {
          id: "",
          description: "",
          createdAt: "",
          updateAt: "",
        },
        createdAt: "",
        updatedAt: "",
      },
    ],
  ]);
  const [symptomsCounter, setSymptomCounter] = useState({ count: 0 });
  const [medicationCounter, setMedicationCounter] = useState({
    count: 0,
  });
  const [appointmentCounter, setAppontmentCounter] = useState({ count: 0 });
  const [tipCategory, setTipCategory] = useState("");
  const [tipDescription, setTipDescription] = useState("");
  const [openModalAddTip, setOpenModalAddTip] = useState(false);
  const [post, setPost] = useState([
    {
      id: "",
      content: "",
      description: "",
      title: "",
      subtitle: "",
      tag: "",
      createdAt: "",
      user: {
        username: "",
        typeUser: "",
      },
    },
  ]);
  const [myPostCount, setMyPostCount] = useState({ count: 0 });

  const fetchMyPosts = () => {
    api
      .get("/posts/all")
      .then(({ data: res }) => {
        setMyPostCount(res.data[0]);
        console.log("ok", res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTips();
    fetchImgUser();
    fetchTipsCategory();
    fetchMyPosts();
    fetchPosts();
  }, []);

  const fetchImgUser = async () => {
    try {
      api
        .get(`${API_URL}/profiles/single/doctor`)
        .then(({ data: response }) => {
          setUserImg(`http://${API_URL_UPLOAD}:3000/${response.data.urlImg}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      Alert.alert("Erro", "erro tentando c pegar os dados de perfil medico");
    }
  };

  const fetchTips = async () => {
    await api
      .get("/tips/my-tips")
      .then(({ data: res }) => {
        setTipsData(res.data);
        setTipsCount(res.data[0].count);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTipsCategory = async () => {
    await api
      .get("/tips-category/all")
      .then(({ data: { data } }) => {
        setTipsCategory(data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSaveTip = async () => {
    await saveTip(tipDescription, tipCategory);
    setTipsCount(tipsCount + 1);
    alert("Dica CriaDa com sucesso!");
  };

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

  const { theme, toggleTheme } = useTheme();

  return (
    <View className={`${theme === "dark" ? "bg-neutral-900" : ""}`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: Contants.statusBarHeight,
          paddingBottom: 20,
        }}
      >
        <View
          className={`flex-row justify-between items-center px-4  pt-8 ${theme === "dark" ? "bg-neutral-900" : ""}`}
        >
          <View className="flex-row justify-start items-strech gap-3">
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
              source={{ uri: userImg }}
            />
          </View>
          <View
            className={`p-[6px] rounded-full relative ${theme === "dark" ? "bg-neutral-500/30" : "bg-slate-300/30"} `}
          >
            <Pressable
              onPress={() => {
                navigation.navigate(ScreenNames.Notification, { title: "" });
              }}
            >
              <Text>
                <Icon
                  name="notifications-outline"
                  size={28}
                  color={theme === "dark" ? "#fff" : "#505050"}
                />
              </Text>
            </Pressable>
            <View className="bg-red-500 absolute top-1 right-2 rounded-xl h-2 w-2"></View>
          </View>
        </View>
        <View className="flex-row justify-end items-center pe-4">
          <View className="flex-row gap-2 justify-end items-center pt-3">
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

        <View className="flex-row justify-center gap-2 mt-3">
          <View className="grid-cols-2 grid-row-2  gap-2 mt-3">
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("MyPostsScreen", { title: "" });
              }}
            >
              <View className="bg-blue-500 rounded-3xl  w-48 h-32 p-3 flex-col justify-between">
                <View className="p-1 flex-row justify-between items-center">
                  <Text className="font-bold text-lg text-white/95">
                    Postagens
                  </Text>
                  <View className="bg-white rounded-full p-2">
                    <Text>
                      <Icon
                        name="bulb-outline"
                        color={"rgb(148 163 184 / 0.6)"}
                      />
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-start items-center gap-1">
                  <Text className="text-white/90 text-3xl font-bold">
                    {myPostCount.count}
                  </Text>
                  <Text className="text-white/90"></Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View className="grid-cols-2 grid-row-2  gap-2 mt-3 ">
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("MyTipsScreen", {
                  title: "",
                });
              }}
            >
              <View className="bg-black rounded-3xl  w-48 h-32 p-3 flex-col justify-between">
                <View className="p-1 flex-row justify-between items-center">
                  <Text className="font-bold text-lg text-white/90">dicas</Text>
                  <View className="bg-white rounded-full p-2">
                    <Text>
                      <Icon
                        name="walk-outline"
                        color={"rgb(148 163 184 / 0.6)"}
                      />
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-start items-center gap-1">
                  <Text className="text-white text-3xl font-bold">
                    {tipsCount}
                  </Text>
                  <Text className="text-white"></Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View
          className={`mt-5 border-y-2  p-4 ${theme === "dark" ? "border-zinc-700" : "border-zinc-300"}`}
        >
          <View>
            <View className="flex-col justify-between items-center">
              <View className="flex-row justify-start">
                <Text
                  className={`font-bold text-center  text-lg ps-2 ${theme === "dark" ? "text-white" : "text-zinc-600"}`}
                >
                  Cria algumas dicas para ajudar os paciente com cancer a melhor
                  se cuidarem e melhorarem
                </Text>
              </View>
              <View className="flex-row justify-center items-center gap-3 mt-3">
                <Text
                  onPress={() => {
                    setOpenModalAddTip(true);
                  }}
                  className="bg-black text-white text-sm rounded-md w-32 py-3 text-center"
                >
                  Criar uma dica
                </Text>
                <Modal isOpen={openModalAddTip} withInput={false}>
                  <View className="p-7 bg-white rounded-2xl w-full max-w-md shadow-lg">
                    <View className="flex-row justify-between items-center mb-4">
                      <Text className="text-base font-bold text-black ">
                        Nova Dica para o Paciente
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setOpenModalAddTip(false);
                        }}
                      >
                        <Icon name="close" size={24} color="#4A4A4A" />
                      </TouchableOpacity>
                    </View>

                    <Text className="text-zinc-700 mb-1">Descrição</Text>
                    <TextInput
                      className="border border-zinc-300 rounded-lg px-4 py-2 mb-3 h-20"
                      placeholder="Ex: Caminhar 30 minutos por dia ajuda na disposição..."
                      multiline
                      value={tipDescription}
                      onChangeText={setTipDescription}
                    />

                    <Text className="text-zinc-700 mb-1">Categoria</Text>
                    <Picker
                      className="border border-zinc-300 rounded-lg px-4 py-3 mb-4"
                      style={{ color: "#999" }}
                      selectedValue={tipCategory}
                      onValueChange={(itemValue) => setTipCategory(itemValue)}
                    >
                      <Picker.Item label="Selecione a categoria" value="" />
                      {tipsCategory.map(({ description, id }) => (
                        <Picker.Item
                          key={description}
                          label={description}
                          value={id}
                        />
                      ))}
                    </Picker>

                    <TouchableOpacity
                      className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
                      onPress={() => {
                        onSaveTip();
                        setOpenModalAddTip(false);
                      }}
                    >
                      <Icon
                        name="save"
                        size={20}
                        color="white"
                        className="mr-2"
                      />
                      <Text className="text-white text-center font-semibold">
                        Salvar Dica
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>

                <Text
                  onPress={() => {
                    navigation.navigate("MyTipsScreen", { title: "" });
                  }}
                  className="bg-black text-white text-sm rounded-md w-32 py-3 text-center"
                >
                  Ver criadas
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-col justify-center items-center pt-14 pb-16">
          <Icon
            className=""
            name="logo-youtube"
            color={"#2563eb"}
            size={34}
          ></Icon>
          <Text
            className={` text-xl ${theme === "dark" ? "text-zinc-200" : "text-zinc-500"}`}
          >
            Sugerir um novo video
          </Text>
          <Text
            className={`w-40 text-center   my-3 text-lg ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            Faça sugestão de videos para paciente com cancer de forma fácil
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SuggestVideoScreen", { title: "" });
            }}
            className="bg-blue-500 rounded-full py-1 mt-2 flex-row items-center justify-center w-56 h-14"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sugerir agora
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className={`h-1 w-full ${theme === "dark" ? "bg-zinc-600" : "bg-zinc-100"}`}
        ></View>

        <View
          className={`h-1 w-full  mt-10 ${theme === "dark" ? "bg-zinc-600" : "bg-zinc-100"}`}
        ></View>
        <View className="mt-5 px-4">
          <View className="flex-row justify-between items-center">
            <Text
              className={`font-bold  text-lg ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Posts recentes
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="py-4"
          >
            {post.map((item) => (
              <View
                key={item.id}
                className="shadow-zinc-400 border-2 border-zinc-200 flex-col justify-center items-start bg-white mt-3 p-5 rounded-lg h-[16rem] me-2 relative"
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
      </ScrollView>
    </View>
  );
};

export default MainMedicoScreen;
