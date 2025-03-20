import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const ReportsScreen = ({ route, navigation }: props) => {
  const [report, setReports] = useState([{ id: "", name: "", type: "" }]);
  const [reportCounter, setReportCount] = useState({
    count: 0,
  });

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
        <View className="rounded-lg border-2 bg-white border-zinc-100 p-3 py-2 mx-4 w-72">
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center gap-2">
              <Text>
                <Icon name="menu-outline" color={"black"} size={24} />
              </Text>
              <Text className="text-black font-semibold">
                Adicionar novo relatório
              </Text>
            </View>
            <Text className="border-zinc-100 border-2 rounded-lg">
              <Icon name="add-outline" color={"black"} size={23} />
            </Text>
          </View>
        </View>
        <View className="mx-4 mt-4 p-3">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-zinc-400 text-lg">
              Todos Selatórios(
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
            <View className="bg-yellow-400/35 w-full p-4 rounded-lg">
              <Text className="text-yellow-600 font-semibold text-sm text-center flex-row justify-center items-center gap-3">
                <Icon
                  name="alert-circle-outline"
                  color={"#ca8a04;"}
                  size={24}
                />
                Adicione um <Text className="font-bold">relatórios</Text> para
                poder vê-los!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportsScreen;
