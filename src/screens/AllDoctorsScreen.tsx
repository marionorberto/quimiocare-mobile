import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../services/api";
import { useTheme } from "../helpers/theme-context";
import CheckBox from "expo-checkbox";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.AllDoctorsScreen
>;

const AllDoctorsScreen = ({ route, navigation }: props) => {
  const { theme, toggleTheme } = useTheme();
  const [agreed, setAgreed] = useState(false);
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
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

  const handleAutorization = (item: any) => {
    alert("certeza?");
  };

  const fetchUsers = async () => {
    await api
      .get("/users/all")
      .then(({ data: res }) => {
        setPatientCount(res.data[2].patients.length);
        setDoctorCount(res.data[3].doctors.length);
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

  return (
    <View
      style={{ marginTop: Constants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pb-14"
    >
      <View className="flex-row justify-start it{ems-center gap-10 px-4 mt-2">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={"#505050"}
            ></Icon>
          </Pressable>
        </View>
        <Text className="text-xl self-center text-center text-black font-bold">
          Todos Médicos
        </Text>
      </View>

      <ScrollView
        className={` px-4 pt-10 ${theme === "dark" ? "bg-neutral-900" : ""}`}
        style={{ backgroundColor: theme === "dark" ? undefined : "#f1f1f1" }}
      >
        <Text
          className={`text-xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
        >
          Usuários Como médico na aplicação
        </Text>

        <Text className="text-zinc-600 mb-3">
          Essa é a lista de todos os usuários cadastrados como médicos na
          aplicação.
        </Text>

        <View className="mb-6">
          <Text
            className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-zinc-800"}`}
          >
            Médicos({doctorCount})
          </Text>
          {allDoctors.length &&
            allDoctors.map((item) => (
              <TouchableOpacity
                key={item.id}
                className={`p-4 rounded-lg flex-row items-center mb-3 relative ${theme === "dark" ? "bg-neutral-800" : "bg-white"}`}
              >
                <Text>
                  <Icon name={"medkit-outline"} size={24} color="#2563EB" />
                </Text>

                <View className="overflow-hidden text-wrap ps-3">
                  <Text
                    className={`font-medium ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
                  >
                    {item.username}
                  </Text>
                  <Text
                    className={`font-medium ${theme === "dark" ? "text-white" : "text-zinc-900"}`}
                  >
                    {item.email}
                  </Text>
                  <Text
                    className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}
                  >
                    Médico
                  </Text>
                  <View
                    className={` rounded-full  p-1  mt-1  ${item.active ? "bg-green-300/20" : "bg-red-300/50"}`}
                  >
                    <Text
                      className={` font-semibold text-sm text-center ${item.active ? "text-green-500" : "text-red-500"}`}
                    >
                      Usuario {item.active ? "ativado" : "desativado"}
                    </Text>
                  </View>
                </View>

                <View className="absolute top-5 right-8 rounded-full h-7 w-6 flex-row gap-2"></View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AllDoctorsScreen;
