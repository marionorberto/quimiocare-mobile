import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  Alert,
  ToastAndroid,
  TouchableHighlight,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Modal from "../components/Modal";
import axios from "axios";
import { API_URL, API_URL_UPLOAD } from "../constants/data";
import { allPrescriptions, createReceita } from "../services/receitas";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const ReportsScreen = ({ route, navigation }: props) => {
  const [report, setReports] = useState([{ id: "", name: "", type: "" }]);
  const [file, setFile] = useState();
  const [reportCounter, setReportCount] = useState({
    count: 0,
  });
  const [receit, setReceit] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [nameForShow, setNameForShow] = useState("Upload Ficheiro");
  const [count, setCount] = useState(0);
  const [receitas, setReceitas] = useState([
    {
      createdAt: "",
      description: "",
      id: "",
      name: "",
      updatedAt: "",
      url: "",
    },
  ]);

  const isImage = (filename: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
  };

  const isPDF = (filename: string) => {
    return /\.pdf$/i.test(filename);
  };

  const uploadReceitas = async () => {
    await createReceita(name, description, `uploads/${url}`);
    alert("Receita uploaded com sucesso!");
    navigation.navigate("Main", { title: "" });
  };

  const uploadFile = async (fileUri: string) => {
    try {
      const filename = fileUri.substring(fileUri.lastIndexOf("/") + 1);
      const extension = filename.split(".").pop()?.toLowerCase();

      let mimeType = "";
      if (extension === "pdf") {
        mimeType = "application/pdf";
      } else {
        mimeType = `image/${extension}`;
      }

      const formData = new FormData();
      formData.append(
        "file",
        JSON.parse(
          JSON.stringify({
            name: filename,
            uri: fileUri,
            type: mimeType,
          })
        )
      );

      const response = await axios.post(`${API_URL}/upload/file`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.error) {
        alert("Não foi possível enviar o arquivo");
        return { fileUploaded: false, filename: "" };
      } else {
        setUrl(response.data.filename);
        return { fileUploaded: true, filename: response.data.filename };
      }
    } catch (error: any) {
      console.error(error);
      alert("Erro ao enviar arquivo");
      return { fileUploaded: false, filename: "" };
    }
  };

  const fetchReceitas = async () => {
    try {
      const prescriptions = await allPrescriptions();

      setCount(prescriptions.data[0].count);
      setReceitas(prescriptions.data[1]);

      console.log(prescriptions.data);
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
        return;
      }

      const file = result.assets[0];
      console.log("Arquivo selecionado:", file);

      const uploadResult = await uploadFile(file.uri);
      setNameForShow(uploadResult.filename);
      if (uploadResult.fileUploaded) {
        console.log("Arquivo enviado com sucesso:", uploadResult.filename);
      }
    } catch (error) {
      console.error("Erro ao escolher arquivo:", error);
    }
  };

  const printToFile = async () => {
    let html = "";
    // html = buildHTML();

    const { uri } = await Print.printToFileAsync({ html });
  };

  const downloadAndSavePDF = async (fileUrl: string, filename: string) => {
    try {
      // const downloadResumable = FileSystem.createDownloadResumable(
      //   fileUrl, // Exemplo: http://192.168.0.10:3000/uploads/arquivo.pdf
      //   FileSystem.documentDirectory + filename
      // );

      // const downloadResult = await downloadResumable.downloadAsync();

      // if (!downloadResult) {
      //   throw new Error("Download falhou ou retornou vazio.");
      // }

      // const { uri } = downloadResult;
      await Print.printAsync({ uri: fileUrl });

      // Verifica se o compartilhamento é possível
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert(
          "Erro",
          "O compartilhamento não está disponível neste dispositivo."
        );
        return;
      }

      // Compartilha o PDF ou salva onde o usuário desejar
      // await Sharing.shareAsync();
    } catch (error) {
      console.error("Erro ao baixar e compartilhar o PDF:", error);
      Alert.alert("Erro", "Não foi possível baixar o PDF.");
    }
  };

  // const generatePDF = async () => {
  //   try {
  //     const { uri } = await Print.printToFileAsync({ html });
  //     console.log("PDF gerado em:", uri);

  //     // Compartilhar PDF
  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(uri);
  //     } else {
  //       alert("Compartilhamento não disponível no dispositivo");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao gerar PDF:", error);
  //   }
  // };

  useEffect(() => {
    fetchReceitas();
  }, []);

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-6"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Text>
              <Icon name="chevron-back-outline" size={20} color={"#505050"} />
            </Text>
          </Pressable>
        </View>
        <Text className="text-xl self-center text-center text-black font-bold">
          Receitas Médicas
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable className="mt-6">
          <TouchableOpacity
            onPress={() => {
              setReceit(true);
            }}
            className="bg-blue-500 border-dashed rounded-lg py-3 mt-2 flex-row items-center justify-center w-72 mx-auto"
          >
            <Text>
              <Icon
                name="download-outline"
                size={20}
                color="white"
                className="mr-2"
              />
            </Text>
            <Text className="text-white text-center font-semibold">
              Upload Nova Receita
            </Text>
          </TouchableOpacity>
          <Modal isOpen={receit} withInput={false}>
            <View className="p-7 bg-white rounded-2xl w-full max-w-md shadow-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-base font-bold text-black ">
                  Arquivar uma nova receita
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setReceit(false);
                  }}
                >
                  <Text>
                    <Icon name="close" size={30} color="#4A4A4A" />
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className="text-zinc-700 mb-1">Nome da Receita</Text>
              <TextInput
                placeholder="Ex: Receita para a perda do cabelo..."
                value={name}
                onChangeText={setName}
                className="border border-zinc-400 rounded-md px-3 py-2 text-black mb-4"
              />
              <Text className="text-zinc-700 mb-1">Descrição da Receita</Text>
              <TextInput
                placeholder="Receita paralela feita pra..."
                value={description}
                onChangeText={setDescription}
                className="border border-zinc-400 rounded-md px-3 py-2 text-black mb-4"
              />

              <TouchableOpacity
                className="border-2 border-zinc-300 border-dashed rounded-lg py-3 mt-2 flex-row items-center justify-center"
                onPress={() => {
                  pickFile();
                }}
              >
                <Text>
                  <Icon
                    name="download-outline"
                    size={20}
                    color="white"
                    className="mr-2"
                  />
                </Text>
                <Text className="text-black text-center font-semibold">
                  {nameForShow}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 border-dashed rounded-lg py-3 mt-2 flex-row items-center justify-center"
                onPress={() => {
                  uploadReceitas();
                  setReceit(false);
                }}
              >
                <Text>
                  <Icon name="save" size={20} color="white" className="mr-2" />
                </Text>
                <Text className="text-white text-center font-semibold">
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Pressable>
        <View className="mx-4 mt-4 p-3">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-zinc-500 text-lg">
              Receitas Guardadas(
              {count})
            </Text>
          </View>
          {receitas.length > 0 ? (
            receitas.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-zinc-50/40 p-4 rounded-lg mb-4 flex-row justify-between items-stretch border-2  border-zinc-400"
              >
                <View className="flex-col gap-3">
                  <Text className="text-black font-semibold text-[13px]">
                    Nome: {item.name}
                  </Text>
                  {isImage(item.url) && (
                    <Image
                      style={{
                        width: 280,
                        height: 380,
                        alignContent: "center",
                        borderWidth: 2,
                        borderColor: "#fff",
                        backgroundColor: "#ccc",
                      }}
                      source={{
                        uri: `http://${API_URL_UPLOAD}:3000/${item.url}`,
                      }}
                    />
                  )}
                  {isPDF(item.url) && (
                    <View
                      style={{
                        height: 500,
                        width: "100%",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      {/* <WebView
                        source={{
                          uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(`http://${API_URL_UPLOAD}:3000/${item.url}`)}`,
                        }}
                        originWhitelist={["*"]}
                        startInLoadingState={true}
                        style={{ flex: 1 }}
                      /> */}
                      <View className="flex-col justify-content-center items-center">
                        <View className="flex-row justify-center items-center mt-5">
                          <Image
                            style={{
                              height: 150,
                              width: 150,
                            }}
                            source={require("../../assets/efe.jpg")}
                          />
                        </View>

                        <TouchableHighlight
                          onPress={() => {
                            const url = `http://${API_URL_UPLOAD}:3000/${item.url}`;
                            downloadAndSavePDF(url, item.url);
                          }}
                          className="bg-blue-600 rounded-lg py-3 px-4"
                        >
                          <Text className="text-white text-center font-semibold">
                            Baixar Receita
                          </Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 ">
              <Text className="text-yellow-600  text-base text-center">
                Sem Receitas baixadas!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportsScreen;
