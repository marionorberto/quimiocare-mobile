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
import { createPersonalInformations } from "../services/personalInformationService";
import axios from "axios";
import { API_URL } from "../constants/data";
import { countries } from "../constants/data";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const GatherProfileFirstScreen = ({ route, navigation }: props) => {
  const FormData = global.FormData;
  const [countryName, setcountryName] = useState("");
  const [birthday, setBirthday] = useState(new Date(2010, 11, 31));
  const [sex, setSex] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [urlImg, seturlImg] = useState<string>();
  const [tag, setTags] = useState<string>("");
  const [cancerTypes, setCancerTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  // Data atual
  // const today = new Date();

  // // Define limites
  // const maxDate = new Date(); // 15 anos atrás
  // maxDate.setFullYear(today.getFullYear() - 15);

  // const minDate = new Date(); // 75 anos atrás
  // minDate.setFullYear(today.getFullYear() - 75);

  // console.log(minDate, maxDate);

  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
  };

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

  const onChange = (event: any, selectedDate?: Date) => {
    setShowDateTimePicker(Platform.OS === "ios");
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const handleCreatePersonalInformation = async () => {
    if (
      !birthday ||
      !sex ||
      !bio ||
      !countryName ||
      !job ||
      !urlImg ||
      !address ||
      !tag
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
      await createPersonalInformations(
        countryName,
        birthday.toISOString().split("T")[0],
        bio,
        job,
        phoneNumber,
        sex,
        address,
        `uploads/${filename}`,
        tag
      );
      navigation.navigate("GatherProfileSecondScreen", { title: "SECOND" });
    } catch (error: any) {
      alert(`${error.message.map((error: string) => error)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCancerTypes = async () => {
      try {
        const { data: response } = await axios.get(
          `${API_URL}/cancer-types/all`
        );
        setCancerTypes(response.data[1]);
      } catch (error: any) {
        console.error("Erro ao buscar os tipos de câncer:", error);
        Alert.alert("cancer types", error);
      }
    };
    fetchCancerTypes();
  }, []);

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-8 pb-14"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <Text className=" ps-5 text-xl self-center text-center text-black font-bold">
          Informações Pessoais
        </Text>
      </View>

      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="px-10 pb-20">
          <Text className="text-3xl text-zinc-900 py-5">
            Regista os seus dados pessoais!
          </Text>
          <View className="flex flex-col gap-2 pt-10">
            <Text className="text-zinc-700 mb-1">
              Número De Telefone(Opcional)
            </Text>
            <View className="flex-row justify-start items-center gap-1">
              <Text className="text-black">+244</Text>
              <TextInput
                className="border border-zinc-300 rounded-lg px-4 py-3 w-72"
                placeholder="Teu Telefone(Ex: 9xx xxx xxx)"
                value={phoneNumber}
                onChangeText={(text) => {
                  // Remove tudo que não for número
                  let cleaned = text.replace(/[^0-9]/g, "");

                  // Limita a 9 caracteres
                  if (cleaned.length > 9) return;

                  // Validações específicas
                  if (cleaned.length >= 1 && cleaned[0] !== "9") return;

                  if (
                    cleaned.length >= 2 &&
                    !["1", "2", "3", "4", "5", "7"].includes(cleaned[1])
                  )
                    return;

                  // Evita todos os números iguais
                  if (cleaned.length === 9 && /^(\d)\1{8}$/.test(cleaned))
                    return;

                  // Tudo certo, atualiza o estado
                  setPhoneNumber(cleaned);
                }}
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
              <Text className="text-zinc-700 mb-1">
                Data de Nascimento{" "}
                <Text className="text-red-400">
                  (Apenas permitdo usuários entre 15 à 75 anos!)
                </Text>
              </Text>
              <Button
                title="Definir"
                onPress={() => setShowDateTimePicker(true)}
              />
              <TextInput
                className="border border-zinc-300 rounded-lg px-4 py-3"
                placeholder="Endereço"
                value={birthday.toISOString().split("T")[0]}
                keyboardType="visible-password"
              />

              {showDateTimePicker && (
                <DateTimePicker
                  value={birthday}
                  mode="date"
                  display="spinner"
                  minimumDate={new Date(1950, 0, 1)}
                  maximumDate={new Date(2010, 11, 31)}
                  onChange={onChange}
                />
              )}
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
                Bio (Três palavras que te identificam)
              </Text>
              <TextInput
                placeholder="Ex: Positiva, alegre, confiante"
                className="border border-zinc-300 rounded-lg px-4 py-3"
                value={bio}
                onChangeText={setBio}
              />
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">País de origem</Text>

              <Picker
                className="border border-zinc-300 rounded-lg px-4 py-3"
                style={{ color: "#999" }}
                selectedValue={countryName}
                onValueChange={(itemValue) => setcountryName(itemValue)}
              >
                <Picker.Item label="Selecione o país" value="" />
                {countries.map((country) => (
                  <Picker.Item
                    key={country.label}
                    label={country.label}
                    value="ao"
                  />
                ))}
              </Picker>
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Trabalho</Text>
              <TextInput
                className="border border-zinc-300 rounded-lg px-4 py-3"
                placeholder=" Ex. Cozinheira, Farmaceutica!"
                value={job}
                onChangeText={setJob}
              />
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
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Tipo de cancer</Text>

              <Picker
                className="border border-zinc-300 rounded-lg px-4 py-3"
                selectedValue={tag}
                onValueChange={(itemValue) => setTags(itemValue)}
              >
                <Picker.Item label="Selecione um tipo de câncer" value="" />
                {cancerTypes.map((type: any) => (
                  <Picker.Item
                    key={type.id}
                    label={type.description}
                    value={type.description}
                  />
                ))}
              </Picker>
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

export default GatherProfileFirstScreen;
