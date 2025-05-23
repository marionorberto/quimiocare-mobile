import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";
import { API_URL } from "../constants/data";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.CreateGroupScreen
>;

const CreateGroupScreen = ({ route, navigation }: props) => {
  const [allDoctors, setDoctors] = useState([
    {
      id: "",
      username: "",
      email: "",
      typeUser: "",
      active: true,
    },
  ]);
  const [allPatients, setPatients] = useState([
    {
      id: "",
      username: "",
      email: "",
      typeUser: "",
      active: true,
    },
  ]);

  const fetchUsers = async () => {
    await api
      .get("/users/all")
      .then(({ data: res }) => {
        setPatients(res.data[2].patients);
        setDoctors(res.data[3].doctors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const assing = async (doctor: string, patient: string) => {
    try {
      const { data } = await api.post(
        `${API_URL}/my-patients/create/my-patient`,
        {
          doctor,
          patient,
        }
      );

      Alert.alert("Atribuição de Paciente", "Atribuição feita com sucesso ✅!");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Erro ao atribuir novo paciente",
        error.response.data.message + " 🚫"
      );
    }
  };

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState<string>("");

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-14  px-5  `}
    >
      <View className="flex-row justify-start items-center gap-10">
        <View
          className={`border-[1px] p-2  rounded-md  bg-white border-zinc-600" : "bg-white border-zinc-200`}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={25} color={"#000"}></Icon>
          </Pressable>
        </View>
        <Text
          className={`text-xl text-start  font-bold "text-white" : "text-black`}
        >
          Atribuir Pacientes
        </Text>
      </View>
      {allDoctors.length > 0 && allPatients.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-center mt-5">
            <TouchableOpacity
              className={`bg-zinc-200 p-4 rounded-lg mb-2 w-80   border-2 border-zinc-400 : ""}`}
            >
              <Text className="text-zinc-800 font-bold text-center text-3xl">
                👨🏽‍⚕️Doctor
              </Text>
              <Text className="text-zinc-500 text-sm mt-1 text-center">
                Associe um médico para poder auxiliar o paciente!
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-3">
            <Text className="text-zinc-900 mb-1 text-2xl font-bold">
              Médico Auxiliar - Para ser associado
            </Text>
            <Picker
              className="border border-zinc-300 rounded-lg px-4 py-3"
              style={{ color: "#000", fontSize: 16 }}
              selectedValue={doctor}
              onValueChange={(itemValue) => setDoctor(itemValue)}
            >
              <Picker.Item label="Escolha a Médico" value="" />
              {allDoctors &&
                allDoctors.map((item) => (
                  <Picker.Item
                    key={item.id}
                    color="#000"
                    label={"👨🏽‍⚕️ " + item.username}
                    value={item.id}
                  />
                ))}
            </Picker>
          </View>
          <View className="w-full h-1 bg-zinc-200"></View>
          <View className="flex-row justify-center mt-10">
            <TouchableOpacity
              className={`bg-zinc-200 p-4 rounded-lg mb-2 w-80   border-2 border-zinc-400 : ""}`}
            >
              <Text className="text-zinc-800 font-bold text-center text-3xl">
                🧑🏾‍🦱Paciente
              </Text>
              <Text className="text-zinc-500 text-sm mt-1 text-center">
                Atribui esse paciente ao médico para ser parte dos grupo desse
                médico.
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-3">
            <Text className="text-zinc-900 mb-1 text-2xl font-bold">
              Paciente com câncer - Paciente a ser atribuído!
            </Text>
            <Picker
              className="border border-zinc-300 rounded-lg px-4 py-3"
              style={{ color: "#000" }}
              selectedValue={patient}
              onValueChange={(itemValue) => setPatient(itemValue)}
            >
              <Picker.Item label="Escolha a Paciente" value="" />
              {allPatients &&
                allPatients.map((item) => (
                  <Picker.Item
                    key={item.id}
                    color="#000"
                    label={"🧑🏾‍🦱 " + item.username}
                    value={item.id}
                  />
                ))}
            </Picker>
          </View>
          <TouchableOpacity
            onPress={() => assing(doctor, patient)}
            className="bg-blue-600 py-4 rounded-xl items-center mb-4 mt-5"
          >
            <Text className="text-white text-lg font-semibold">Atribuir</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 ">
          <Text className="text-red-400  text-base text-center">
            Sem médicos ou pacientes para atribuição!
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreateGroupScreen;
