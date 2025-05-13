import React, { useState } from "react";
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
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Modal from "../components/Modal";
import axios from "axios";
import { API_URL } from "../constants/data";
import { createReceita } from "../services/receitas";
// import * as DocumentPicker from "expo-document-picker";

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

  type fileIconsType = {
    pdf: string;
    word: string;
    excel: string;
    image: string;
  };

  const uploadReceitas = async () => {
    // const { fileUploaded, filename } = await uploadFile(url);

    // if (!fileUploaded) {
    //   ToastAndroid.show(
    //     "Não foi possivel cadastrar a arquivo",
    //     ToastAndroid.SHORT
    //   );
    //   return;
    // } else {
    //   ToastAndroid.show("Arquivo cadastrado com sucesso", ToastAndroid.SHORT);
    // }

    // console.log(url);

    alert(name);
    await createReceita(name, description, `uploads/${url}`);
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

      // Se quiser, exibir preview se for imagem
      // if (file.mimeType?.includes("image")) {
      //   setFile(file.uri); // exibir no preview, por exemplo
      // }

      const uploadResult = await uploadFile(file.uri);
      if (uploadResult.fileUploaded) {
        console.log("Arquivo enviado com sucesso:", uploadResult.filename);
      }
    } catch (error) {
      console.error("Erro ao escolher arquivo:", error);
    }
  };

  type ReportType = string[];

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

      <View className="relative w-64 ms-4 mt-5">
        <TextInput
          placeholder="Pesquisar ..."
          className="bg-white p-3 rounded-lg mb-4 ps-10"
        />
        <View className="absolute left-3 top-2">
          <Icon name="search-outline" color={"#545454"} size={21}></Icon>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => {
            setReceit(true);
          }}
        >
          <View className="rounded-lg border-2 bg-white border-zinc-100 p-3 py-3 mx-4 w-72">
            <View className="flex-row justify-between items-center">
              <View className="flex-row justify-start items-center gap-2">
                <Text>
                  <Icon name="download-outline" color={"black"} size={20} />
                </Text>
                <Text className="text-black font-semibold">
                  Upload Nova Receita
                </Text>
              </View>
            </View>
          </View>
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
                  <Icon name="close" size={24} color="#4A4A4A" />
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
                <Icon
                  name="download-outline"
                  size={20}
                  color="white"
                  className="mr-2"
                />
                <Text className="text-black text-center font-semibold">
                  Upload Ficheiro
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 border-dashed rounded-lg py-3 mt-2 flex-row items-center justify-center"
                onPress={() => {
                  uploadReceitas();
                  setReceit(false);
                }}
              >
                <Icon name="save" size={20} color="white" className="mr-2" />
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
              {reportCounter.count})
            </Text>
            <Text className="text-zinc-400 text-lg">
              <Icon name="ellipsis-horizontal-sharp" color={"#999"} size={24} />
            </Text>
          </View>
          {reportCounter.count ? (
            report.map((item) => (
              <View
                key={item.id}
                className="bg-zinc-50/40 p-4 rounded-lg mb-4 flex-row justify-between items-stretch"
              >
                <View className="flex-col gap-3">
                  <Text className="text-black font-semibold text-[13px]">
                    Nome: {item.name}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View className="bg-yellow-500/50 w-full p-4 rounded-lg mt-1">
              <Text className="text-yellow-600 font-semibold text-sm text-center flex-row justify-center items-center gap-3 py-2">
                <Text>
                  Adicione um <Text className="font-bold">Receitas</Text> para
                  poder vê-los!
                </Text>
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportsScreen;
