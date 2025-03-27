import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
  Button,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { ProfileTagType } from "../constants/types";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { createPersonalInformations } from "../services/personalInformationService";
import axios from "axios";
import api from "../services/api";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const GatherProfileFirstScreen = ({ route, navigation }: props) => {
  const FormData = global.FormData;
  const [countryName, setcountryName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [sex, setSex] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [urlImg, seturlImg] = useState<string>();
  const [tag, setTags] = useState<string>("");
  const [cancerTypes, setCancerTypes] = useState([]);
  const [selectedCancerType, setSelectedCancerType] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const coutries = [
    {
      label: "Angola",
      value: "ao",
    },
    {
      label: "Portugal",
      value: "pt",
    },
    {
      label: "Brasil",
      value: "br",
    },
    {
      label: "EUA",
      value: "US",
    },
    {
      label: "França",
      value: "fr",
    },
    {
      label: "Cabo Verde",
      value: "cv",
    },
    {
      label: "Inglatera",
      value: "EN",
    },
  ];

  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      seturlImg(result.assets[0].uri);
      console.log(urlImg);
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
      await createPersonalInformations(
        countryName,
        birthday.toISOString().split("T")[0],
        bio,
        job,
        phoneNumber,
        sex,
        address,
        urlImg,
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
        const { data: response } = await api.get("/tags/all");
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
        {/* <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={"#505050"}
            ></Icon>
          </Pressable>
        </View> */}
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
            <View>
              <Text className="text-zinc-700 mb-1">
                Número De Telefone(Opcional)
              </Text>
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
              <Text className="text-zinc-700 mb-1">Data de Nascimento</Text>
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
                  onChange={onChange}
                />
              )}
            </View>
            <View className="mt-1">
              <Text className="text-zinc-700 mb-1">Sexo</Text>

              <Picker
                className="border border-zinc-300 rounded-lg px-4 py-3"
                style={{ color: "#999" }}
                selectedValue={sex}
                onValueChange={(itemValue) => setSex(itemValue)}
              >
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
                {coutries.map((country) => (
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
                // alert(birthday.toLocaleDateString());
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
