import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { Picker } from "@react-native-picker/picker";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  createPersonalInformations,
  createProfileDoctorInformation,
} from "../services/personalInformationService";
import axios from "axios";
import { API_URL } from "../constants/data";
import { countries } from "../constants/data";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;
const GatherDoctorProfileFirstScreen = ({ route, navigation }: props) => {
  const FormData = global.FormData;
  const [sex, setSex] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [urlImg, seturlImg] = useState<string>();
  const [hospital, setHospital] = useState<string>("");

  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
  };
  const hospitals = [
    "Intituto IACC",
    "Hospital Américo Boa Vida",
    "Lucréci Paim",
    "Instituto - IPO PORTO(Lubango)",
    "Clínica Sagrada Esperança",
    "Clínica Girassol",
    "Outro",
  ];

  const uploadImage = async (urlImg: string) => {
    try {
      const formData = new FormData();
      const filename = urlImg.substring(
        urlImg.lastIndexOf("/") + 1,
        urlImg.length
      );
      const extension = filename.split(".")[1];
      console.log("peguei da phone e troquei o filename", filename, extension);
      formData.append(
        "file",
        JSON.parse(
          JSON.stringify({
            name: filename,
            uri: urlImg,
            type: "image/" + extension,
          })
        )
      );
      const response = await axios.post(`${API_URL}/upload/file`, formData, {
        headers: {
          Accept: "Application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.error) {
        alert("não foi possivel enviar imagem");
        return { imageUploaded: false, filename: "" };
      } else {
        return { imageUploaded: true, filename: response.data.filename };
      }
    } catch (error: any) {
      alert("error ao enviar imagem");
      return { imageUploaded: false, filename: "" };
    }
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Deve permitir que a sua aplicação acesse as images!"
      );
    } else {
      let { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else {
        if (!assets) return;
        seturlImg(assets[0].uri);
      }
    }
  };

  const handleCreatePersonalInformation = async () => {
    if (
      !hospital ||
      !sex ||
      !bio ||
      !job ||
      !urlImg ||
      !address ||
      !phoneNumber
    )
      return alert("Todos os campos são obrigatórias!");

    try {
      const { imageUploaded, filename } = await uploadImage(urlImg);

      if (!imageUploaded) {
        ToastAndroid.show(
          "Não foi possivel cadastrar a imagem",
          ToastAndroid.SHORT
        );
        return;
      } else {
        ToastAndroid.show("Imagem cadastrada com sucesso", ToastAndroid.SHORT);
      }
      await createProfileDoctorInformation(
        hospital,
        bio,
        job,
        phoneNumber,
        sex,
        address,
        `uploads/${filename}`
      );
      navigation.navigate("Login", { title: "SECOND" });
    } catch (error: any) {
      alert(`${error.message.map((error: string) => error)}`);
    } finally {
    }
  };

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <Text className=" ps-5 text-xl self-center text-center text-black font-bold">
          Informações Pessoais do Doctor
        </Text>
      </View>

      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="px-10 pb-20">
          <Text className="text-3xl text-zinc-900 py-5">
            Regista os seus dados pessoais!
          </Text>
          <View className="flex flex-col gap-2 pt-10">
            <View>
              <Text className="text-zinc-700 mb-1">Número De Telefone</Text>
              <TextInput
                className="border border-zinc-300 rounded-lg px-4 py-3"
                placeholder="Teu Telefone"
                value={phoneNumber}
                onChangeText={(text) =>
                  setPhoneNumber(text.replace(/[^0-9+]/g, ""))
                }
                keyboardType="visible-password"
              />
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Morada</Text>
              <TextInput
                className="border border-zinc-300 rounded-lg px-4 py-3"
                placeholder="Endereço"
                value={address}
                onChangeText={setAddress}
                keyboardType="visible-password"
              />
            </View>

            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Gênero</Text>

              <Picker
                className="border border-zinc-300 rounded-lg px-4 py-3"
                style={{ color: "#999" }}
                selectedValue={sex}
                onValueChange={(itemValue) => setSex(itemValue)}
              >
                <Picker.Item label="Escolha o Gênero" value="" />
                <Picker.Item label="Masculino" value="m" />
                <Picker.Item label="feminino" value="f" />
              </Picker>
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">
                Hospital onde trabalha/trabalhou
              </Text>
              <Picker
                style={{ color: "#999" }}
                selectedValue={hospital}
                onValueChange={(itemValue) => setHospital(itemValue)}
                className="border border-zinc-300 rounded-lg px-4 py-3"
              >
                <Picker.Item label="Selecione o hospital" value="" />
                {hospitals.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">
                Bio (Ex: Profissional dedicada e eficiente)
              </Text>
              <TextInput
                placeholder="Ex: Positiva, alegre, confiante"
                className="border border-zinc-300 rounded-lg px-4 py-3"
                value={bio}
                onChangeText={setBio}
              />
            </View>

            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Trabalho</Text>
              <Picker
                className="border border-zinc-300 rounded-lg px-4 py-3"
                style={{ color: "#999" }}
                selectedValue={job}
                onValueChange={(itemValue) => setJob(itemValue)}
              >
                <Picker.Item label="Escolha a profissão" value="" />
                <Picker.Item
                  label="Oncologista Clínico"
                  value="oncologista Clinico"
                />
                <Picker.Item
                  label="Oncologista Pediátrico"
                  value="oncologista Pediatrico"
                />
                <Picker.Item
                  label="Cirurgião Oncológico"
                  value="cirurgiao Oncologico"
                />
                <Picker.Item label="Radioterapeuta" value="radioterapeuta" />
                <Picker.Item label="Hematologista" value="hematologista" />
                <Picker.Item
                  label="Enfermeiro Oncológico"
                  value="enfermeiro Oncologico"
                />
                <Picker.Item
                  label="Psico-oncologista"
                  value="psico Oncologista"
                />
                <Picker.Item
                  label="Fisioterapeuta Oncológico"
                  value="fisioterapeuta Oncologico"
                />
                <Picker.Item
                  label="Farmacêutico Oncológico"
                  value="farmaceutico Oncologico"
                />
                <Picker.Item
                  label="Nutricionista Oncológico"
                  value="nutricionista Oncologico"
                />
                <Picker.Item
                  label="Técnico em Radiologia"
                  value="tecnico Radiologia"
                />
                <Picker.Item label="Geneticista" value="geneticista" />
                <Picker.Item label="Patologista" value="patologista" />
                <Picker.Item
                  label="Pesquisador em Câncer"
                  value="pesquisador Cancer"
                />
                <Picker.Item
                  label="Biomédico Oncológico"
                  value="biomedico Oncologico"
                />
                <Picker.Item label="Físico Médico" value="fisicoMedico" />
                <Picker.Item
                  label="Cuidador de Paciente Oncológico"
                  value="cuidador Oncologico"
                />
                <Picker.Item
                  label="Assistente Social em Oncologia"
                  value="assistente Social Oncologia"
                />
                <Picker.Item
                  label="Especialista em Cuidados Paliativos"
                  value="cuidados Paliativos"
                />
                <Picker.Item label="Outra Profissão" value="Outro" />
              </Picker>

              {/* <TextInput
                className="border border-zinc-300 rounded-lg px-4 py-3"
                placeholder=" Ex. Cozinheira, Farmaceutica!"
                value={job}
                onChangeText={setJob}
              /> */}
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">
                Carregar Foto de Perfil
              </Text>

              <View className="bg-zinc-200 w-full p-2">
                <Button title="Carregar" onPress={pickImage} />
                {urlImg && (
                  <Image
                    source={`${urlImg}`}
                    style={{ height: 200, width: 200 }}
                  />
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleCreatePersonalInformation();
              }}
              className="text-white bg-blue-500 px-5 py-5 rounded-lg ring-1 ring-blue-400/25"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Avançar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GatherDoctorProfileFirstScreen;
