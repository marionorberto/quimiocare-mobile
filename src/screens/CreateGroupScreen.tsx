import {
  View,
  Text,
  Pressable,
  ScrollView,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../helpers/theme-context";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";

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
    await api
      .post("/my-patients/create/my-patient", {
        doctor,
        patient,
      })
      .then(({ data: res }) => {
        alert("atribuição feita com sucesso!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState<string>("");

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full pt-8 pb-14  px-5  `}
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View
          className={`border-[1px]  p-[3px] rounded-md  bg-white border-zinc-600" : "bg-white border-zinc-200`}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#000"}></Icon>
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center  font-bold "text-white" : "text-black`}
        >
          Atribuir Pacientes
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-8">
          <Text className="text-zinc-900 mb-1 text-xl">Médico Auxiliar</Text>
          <Picker
            className="border border-zinc-300 rounded-lg px-4 py-3"
            style={{ color: "#999" }}
            selectedValue={doctor}
            onValueChange={(itemValue) => setDoctor(itemValue)}
          >
            <Picker.Item label="Escolha a Médico" value="" />
            {allDoctors &&
              allDoctors.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.username}
                  value="oncologista Clinico"
                />
              ))}
          </Picker>
        </View>

        <View className="mt-3">
          <Text className="text-zinc-900 mb-1 text-xl">
            Paciente à ser associado
          </Text>
          <Picker
            className="border border-zinc-300 rounded-lg px-4 py-3"
            style={{ color: "#999" }}
            selectedValue={patient}
            onValueChange={(itemValue) => setPatient(itemValue)}
          >
            <Picker.Item label="Escolha a Paciente" value="" />
            {allPatients &&
              allPatients.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.username}
                  value="oncologista Clinico"
                />
              ))}
          </Picker>
        </View>
        <TouchableOpacity
          onPress={() => assing(doctor, patient)}
          className="bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          <Text className="text-white text-lg font-semibold">Atribuir</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateGroupScreen;
