import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const ReportsScreen = ({ route, navigation }: props) => {
  const [reports, setReports] = useState([
    { id: 1, name: "Exames_Sangue.pdf", type: "pdf" },
    {
      id: 2,
      name: "Radiografia_Torax.jpg",
      type: "image",
      uri: "https://via.placeholder.com/100",
    },
    { id: 3, name: "Diagnostico.docx", type: "word" },
    { id: 4, name: "Planilha_Dados.xlsx", type: "excel" },
  ]);

  type fileIconsType = {
    pdf: string;
    word: string;
    excel: string;
    image: string;
  };

  const fileIcons: fileIconsType = {
    pdf: "document-text-outline",
    word: "document-text-outline",
    excel: "document-text-outline",
    image: "image-outline",
  };

  // const handleUpload = async () => {
  //   const result = await DocumentPicker.getDocumentAsync({
  //     type: [
  //       "image/*",
  //       "application/pdf",
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     ],
  //   });

  //   if (!result.canceled) {
  //     const newReport = {
  //       id: reports.length + 1,
  //       name: result.assets[0].name,
  //       type: result.assets?[0].mimeType.includes("image")
  //         ? "image"
  //         : result.assets?[0].mimeType.includes("pdf")
  //           ? "pdf"
  //           : result.assets?[0].mimeType.includes("word")
  //             ? "word"
  //             : "excel",
  //       uri: result.assets[0].uri,
  //     };
  //     setReports([...reports, newReport]);
  //   }
  // };

  const handleDelete = (id: number) => {
    setReports(reports.filter((report) => report.id !== id));
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
          Relatórios Médicos
        </Text>
      </View>

      <View className="mt-6 px-4">
        {/* Botão de Upload */}
        <TouchableOpacity
          // onPress={handleUpload}
          onPress={() => alert("make upload function works")}
          className="bg-black flex-row items-center justify-center py-3 rounded-lg mb-4"
        >
          <Icon name="cloud-upload-outline" size={22} color="white" />
          <Text className="text-white font-medium ml-2">Fazer Upload</Text>
        </TouchableOpacity>

        {/* Lista de Relatórios */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {reports.map((report) => (
            <View
              key={report.id}
              className="flex-row justify-between items-center bg-zinc-100 p-4 rounded-lg mb-3"
            >
              {/* Ícone e Nome do Arquivo */}
              <View className="flex-row items-center">
                {report.type === "image" ? (
                  <Image
                    source={{ uri: report.uri }}
                    className="w-12 h-12 rounded-md mr-3"
                  />
                ) : (
                  <Icon
                    // name={fileIcons[report.type]}
                    name="home-outline"
                    size={28}
                    color="#2563EB"
                    className="mr-3"
                  />
                )}
                <Text className="text-zinc-900 font-medium">{report.name}</Text>
              </View>

              {/* Ações */}
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => console.log("Abrir:", report.name)}
                  className="mr-3"
                >
                  <Icon name="eye-outline" size={22} color="#545454" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(report.id)}>
                  <Icon name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ReportsScreen;
