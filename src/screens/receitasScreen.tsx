import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { PermissionsAndroid, Platform } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Image } from "expo-image";
import { createReport } from "../services/reports";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const ExportarRelatorio = ({ navigation }: props) => {
  const [dataInicial, setDataInicial] = useState(new Date());
  const [mostrarInicial, setMostrarInicial] = useState(false);
  const [mostrarFinal, setMostrarFinal] = useState(false);

  const [data, setdata] = useState([
    {
      countSymptoms: 0,
      symptoms: [
        {
          createdAt: "",
          description: "",
          id: "",
          name: "",
          severity: 0,
          updatedAt: "",
        },
      ],
    },
    {
      appointments: [
        {
          createdAt: "",
          dateAppointment: "",
          description: "",
          id: "",
          name: "",
          note: "",
          statusAppointment: "",
          type: "",
          updatedAt: "",
        },
      ],
      countAppointments: 1,
    },
    {
      countMedications: 1,
      medications: [
        {
          createdAt: "",
          dosage: "",
          id: "",
          name: "",
          note: "",
          timeReminder: "",
          updatedAt: "",
        },
      ],
    },
    {
      countDailys: 1,
      dailys: [
        {
          collateralEffect: "",
          createdAt: "",
          emoccioanlState: "",
          exercicesToday: false,
          feedToday: true,
          hidratedToday: true,
          id: "",
          note: "",
          painLevel: "",
          sleepWell: true,
          tiredLevelToday: "",
          updatedAt: "",
        },
      ],
    },
  ]);

  const buildHTML = () => {
    const [symptomsData, appointmentsData, medicationsData, dailysData] = data;

    if (!symptomsData || !appointmentsData || !medicationsData || !dailysData) {
      alert("sem DaDos para serem exportaDos nessa Data, escolha outra Data!");
      return;
    }

    let html = `
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            h2 {
              color: #3b82f6;
            }
          </style>
        </head>
        <body>
 <header>
          <h1>QuimioCare</h1>
          <div class="subtitle">Relatório médico completo com base nos dados registrados</div>
        </header>

          <h2>Sintomas</h2>
          <table>
            <tr>
              <th>Nome</th><th>Descrição</th><th>Gravidade</th><th>Data</th>
            </tr>
            ${symptomsData.symptoms
              .map(
                (sym) => `
              <tr>
                <td>${sym.name}</td>
                <td>${sym.description}</td>
                <td>${sym.severity}</td>
                <td>${new Date(sym.createdAt).toLocaleDateString()}</td>
              </tr>
            `
              )
              .join("")}
          </table>
  
          <h2>Consultas</h2>
          <table>
            <tr>
              <th>Nome</th><th>Descrição</th><th>Data</th><th>Status</th><th>Tipo</th>
            </tr>
            ${appointmentsData.appointments
              .map(
                (app) => `
              <tr>
                <td>${app.name}</td>
                <td>${app.description}</td>
                <td>${new Date(app.dateAppointment).toLocaleDateString()}</td>
                <td>${app.statusAppointment}</td>
                <td>${app.type}</td>
              </tr>
            `
              )
              .join("")}
          </table>
  
          <h2>Medicações</h2>
          <table>
            <tr>
              <th>Nome</th><th>Dosagem</th><th>Lembrete</th><th>Notas</th>
            </tr>
            ${medicationsData.medications
              .map(
                (med) => `
              <tr>
                <td>${med.name}</td>
                <td>${med.dosage}</td>
                <td>${med.timeReminder}</td>
                <td>${med.note}</td>
              </tr>
            `
              )
              .join("")}
          </table>
  
          <h2>Registros Diários</h2>
          <table>
            <tr>
              <th>Estado Emocional</th><th>Alimentado</th><th>Hidratado</th><th>Dormiu Bem</th><th>Exercícios</th><th>Nível de Cansaço</th><th>Nível de Dor</th><th>Efeitos Colaterais</th><th>Notas</th><th>Data</th>
            </tr>
            ${dailysData.dailys
              .map(
                (daily) => `
              <tr>
                <td>${daily.emoccioanlState}</td>
                <td>${daily.feedToday ? "Sim" : "Não"}</td>
                <td>${daily.hidratedToday ? "Sim" : "Não"}</td>
                <td>${daily.sleepWell ? "Sim" : "Não"}</td>
                <td>${daily.exercicesToday ? "Sim" : "Não"}</td>
                <td>${daily.tiredLevelToday}</td>
                <td>${daily.painLevel}</td>
                <td>${daily.collateralEffect}</td>
                <td>${daily.note}</td>
                <td>${new Date(daily.createdAt).toLocaleDateString()}</td>
              </tr>
            `
              )
              .join("")}
          </table>
        </body>
      </html>
    `;

    return html;
  };

  async function requestStoragePermission() {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Permissão de Armazenamento",
            message:
              "Este app precisa de acesso ao armazenamento para salvar PDFs",
            buttonNeutral: "Pergunte-me depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  }

  const handleExportar = async () => {
    let options = {
      html: "<html><h1>testan</h1></html> ",
      filename: "teste",
      directory: "Movies",
      base64: true,
    };

    let file = await RNHTMLtoPDF.convert(options);

    // console.log(file.filePath);

    alert(`${file.filePath}`);

    // Aqui você pode chamar a função de exportação com base nas datas
    // Ex: gerarPDF(dataInicial, dataFinal);
  };

  const onSaveReport = async () => {
    try {
      const response = await createReport(dataInicial.toLocaleDateString());

      setdata(response);
      // alert("report get com sucesso");
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const print = async () => {
    await onSaveReport();

    let html: string = "";

    html = buildHTML();

    await Print.printAsync({ html });
  };

  const printToFile = async () => {
    let html = "";
    // html = buildHTML();

    const { uri } = await Print.printToFileAsync({ html });
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
  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-1 bg-white pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#505050"} />
          </Pressable>
        </View>
        <Text className="text-xl text-black font-bold">
          Exportar Relatório Médico
        </Text>
      </View>

      <ScrollView
        className="mt-6 px-8"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="flex-row justify-center items-center mt-5">
          <Image
            style={{
              height: 100,
              width: 100,
            }}
            source={require("../../assets/efe.jpg")}
          />
        </View>
        <Text className="text-black font-bold text-lg mb-2">
          Selecione a data para exportar o seu relatório médico:
        </Text>

        {/* Data Inicial */}
        <Pressable
          onPress={() => setMostrarInicial(true)}
          className="border border-zinc-400 rounded-md px-4 py-3 mb-4"
        >
          <Text className="text-black">
            Data Requerida: {format(dataInicial, "dd/MM/yyyy")}
          </Text>
        </Pressable>

        {/* Date Pickers */}
        {mostrarInicial && (
          <DateTimePicker
            value={dataInicial}
            mode="date"
            minimumDate={new Date(2025, 0, 1)}
            maximumDate={new Date()}
            display="default"
            onChange={(_, date) => {
              setMostrarInicial(false);
              if (date) setDataInicial(date);
            }}
          />
        )}

        <TouchableHighlight
          onPress={() => {
            print();
          }}
          className="bg-blue-600 rounded-lg py-3 px-4"
        >
          <Text className="text-white text-center font-semibold">
            Exportar Relatório
          </Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};

export default ExportarRelatorio;
