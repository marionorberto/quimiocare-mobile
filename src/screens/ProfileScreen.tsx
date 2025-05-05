import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  SafeAreaView,
  Switch,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../constants/types";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import EditPersonalInformationModal from "../components/EditPersonalInformationModal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import EditUserMedicalInformationModal from "../components/EditUserMedicalInfoModa";
import api from "../services/api";
import { handleLogout } from "../services/authService";
import { API_URL, API_URL_UPLOAD } from "../constants/data";
import Modal from "../components/Modal";
import { handleUpdatePassword } from "../services/updatePasswordService";
import { useTheme } from "../helpers/theme-context";
import { updateUserPersonalInformation } from "../services/profile/updateUserPersonalInformation";
import { updateMedicalPersonalInformation } from "../services/profile/updateMedicalPersonalInformation";

type props = NativeStackScreenProps<BottomTabParamList>;

const ProfileScreen = ({ route, navigation }: props) => {
  const [isEnabledMedicationReminder, setIsEnabledMedicationReminder] =
    useState(true);
  let isModalEditVisible: boolean = false;
  const [editUserInfoModalVisible, setEditUserInfoModalVisible] =
    useState(false);
  const [editUserMedicalInfoModalVisible, setEditUserMedicalInfoModalVisible] =
    useState(false);
  setEditUserMedicalInfoModalVisible;
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    typeUser: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [profileData, setProfileData] = useState({
    birthday: "",
    bio: "",
    address: "",
    country_name: "",
    phoneNumber: "",
    created_at: new Date(),
    updated_at: new Date(),
    urlImg: "",
    sex: "",
    userId: "",
    job: "",
    user_profile_id: "",
    tags: [
      {
        id: "",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });
  const [medicalData, setMedicalData] = useState({
    id: "",
    codHospital: "",
    bloodGroup: "",
    height: "",
    weight: "",
    hospital: "",
    stage: "",
    targetSupport: "",
    user: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [symptomsCounter, setSymptomCounter] = useState({ count: 0 });
  const [medicationCounter, setMedicationCounter] = useState({
    count: 0,
  });

  const [appointmentCounter, setAppontmentCounter] = useState({ count: 0 });
  const [atualPassword, setAtualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  const onUpdatePassword = async (
    atualPassword: string,
    newPassword: string
  ): Promise<void> => {
    try {
      await handleUpdatePassword(atualPassword, newPassword);
      setOpenModalChangePassword(false);
      Alert.alert(
        "Atualização de password",
        "Password atualizada com sucesso, próximo login entre com a sua nova password"
      );
      navigation.navigate("Login");
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const fetchSymptom = () => {
    api
      .get("/symptoms/all")
      .then(({ data: res }) => {
        setSymptomCounter(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAppointment = () => {
    api
      .get("/appointments/all")
      .then(({ data: res }) => {
        setAppontmentCounter(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchMedications = () => {
    api
      .get("/medications/all")
      .then(({ data: res }) => {
        setMedicationCounter(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchProfileData();
    fetchMedicalData();
    fetchSymptom();
    fetchMedications();
    fetchAppointment();
  }, []);

  const fetchUserData = () => {
    try {
      api
        .get(`${API_URL}/users/user`)
        .then(({ data: response }) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };

  const handleSaveUserPersonalInformationFromModal = async (
    updatedUserData: {
      id: string;
      username: string;
      email: string;
      typeUser: string;
      createdAt: Date;
      updatedAt: Date;
    },
    updatedProfileData: {
      birthday: string;
      bio: string;
      address: string;
      country_name: string;
      phoneNumber: string;
      created_at: Date;
      updated_at: Date;
      urlImg: string;
      sex: string;
      userId: string;
      job: string;
      user_profile_id: string;
      tags: [
        {
          id: string;
          description: string;
          createdAt: Date;
          updatedAt: Date;
        },
      ];
    }
  ) => {
    try {
      await updateUserPersonalInformation(updatedUserData, updatedProfileData);

      setUserData(updatedUserData);
      setProfileData(updatedProfileData);
      setEditUserInfoModalVisible(false);
      Alert.alert("Atualização de perfil", "Perfil atualizado com sucesso!");
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
    }
  };
  const handleSaveMedicalPersonalInformationFromModal =
    async (updatedProfileData: {
      birthday: string;
      bio: string;
      address: string;
      country_name: string;
      phoneNumber: string;
      created_at: Date;
      updated_at: Date;
      urlImg: string;
      sex: string;
      userId: string;
      job: string;
      user_profile_id: string;
      tags: [
        {
          id: string;
          description: string;
          createdAt: Date;
          updatedAt: Date;
        },
      ];
    }) => {
      try {
        await updateMedicalPersonalInformation(updatedProfileData);

        setProfileData(updatedProfileData);
        setEditUserMedicalInfoModalVisible(false);
        Alert.alert("Atualização de perfil", "Perfil atualizado com sucesso!");
      } catch (error: any) {
        if (error.data) {
          alert(`${error.message.map((error: string) => error)}`);
        }
        alert(`${error.message}`);
      }
    };

  const fetchProfileData = () => {
    try {
      api
        .get(`${API_URL}/profiles/single`)
        .then(({ data: response }) => {
          setProfileData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      Alert.alert("Erro", "erro tentando pegar os dados de perfil");
    }
  };

  const fetchMedicalData = () => {
    try {
      api
        .get(`${API_URL}/medical-informations/information`)
        .then(({ data: response }) => {
          setMedicalData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      Alert.alert("Erro", "erro tentando pegar os dados médicos");
    }
  };

  const { theme } = useTheme();

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className={`flex-col justify-center items-stretch w-full pt-6 ${theme === "dark" ? "bg-neutral-900" : ""} `}
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View
          className={`border-[1px]  p-[3px] rounded-md ${theme === "dark" ? "bg-neutral-700/60 border-zinc-600" : "bg-white border-zinc-200"}  `}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={20}
              color={theme === "dark" ? "white" : "#505050"}
            />
          </Pressable>
        </View>
        <Text
          className={`text-xl self-center text-center  font-bold  ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Perfil
        </Text>
      </View>

      <ScrollView className="pb-20" showsVerticalScrollIndicator={false}>
        <View className="flex-col justify-center items-center w-full mt-6">
          <View className="flex-col justify-center items-center w-full">
            <View className="relative">
              <Image
                source={{
                  uri:
                    `http://${API_URL_UPLOAD}:3000/${profileData.urlImg}` ||
                    require("../../assets/user.png"),
                }}
                style={{
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: "#fff",
                  width: 110,
                  height: 110,
                }}
              ></Image>
              {/* <View
                className={`w-8 h-8 rounded-md absolute bottom-0 right-2 flex-1 justify-center items-center ${theme === "dark" ? "bg-neutral-700/60" : "bg-white"}`}
              >
                <Icon
                  name="camera-reverse-outline"
                  color={theme === "dark" ? "white" : "#000"}
                  size={23}
                />
              </View> */}
            </View>
            {userData ? (
              <Text
                className={` font-semibold text-center text-lg mt-4 ${theme === "dark" ? "text-white" : "text-black"}  `}
              >
                {userData.username}
              </Text>
            ) : (
              <Text>--</Text>
            )}
            {profileData ? (
              <Text
                className={` text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-500"} `}
              >
                {profileData.job}
              </Text>
            ) : (
              <Text>--</Text>
            )}
            {profileData ? (
              <Text
                className={` text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-400"} `}
              >
                {profileData.bio}
              </Text>
            ) : (
              <Text>--</Text>
            )}

            <View
              className={` w-full border-y-2  flex-row justify-around items-center py-4 mt-5 ${theme === "dark" ? "border-zinc-500" : "border-zinc-300"} `}
            >
              <View>
                <Text
                  className={`font-bold text-lg text-center ${theme === "dark" ? "text-white" : ""} `}
                >
                  {medicationCounter.count}
                </Text>
                <Text
                  className={` text-center text-sm ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"} `}
                >
                  Remédios
                </Text>
              </View>
              <View>
                <Text
                  className={`font-bold text-lg text-center ${theme === "dark" ? "text-white" : ""} `}
                >
                  {symptomsCounter.count}
                </Text>
                <Text
                  className={` text-center text-sm ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"} `}
                >
                  Sintomas
                </Text>
              </View>
            </View>
            <View className=" w-full border-b-2 border-zinc-300 flex-row justify-around gap-4 items-center py-4 px-6">
              <View className=" bg-blue-400/15 rounded-lg px-3 py-3 flex-1 justify-center items-center">
                <Pressable onPress={() => navigation.navigate("History")}>
                  <Text className="text-blue-500 text-center font-bold">
                    Histórico de saúde
                  </Text>
                </Pressable>
              </View>
              <View className=" bg-blue-400/15 rounded-lg px-3 py-3 flex-1 justify-center items-center">
                <Pressable onPress={() => navigation.navigate("Report")}>
                  <Text className="text-blue-500 text-center font-bold">
                    Relatórios
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View
          className={`w-[92%] rounded-lg p-4  mt-6 mx-auto ${theme === "dark" ? "bg-neutral-700/60" : "bg-white"} `}
        >
          <View className="flex-row justify-between items-center">
            <Text
              className={`text-xl font-bold  ${theme === "dark" ? "text-white" : "text-black"} `}
            >
              Informações Pessoais
            </Text>
            <Pressable onPress={() => setEditUserInfoModalVisible(true)}>
              <Text
                className={`text-lg font-semibold  ${theme === "dark" ? "text-white" : "text-black"} `}
              >
                Editar
              </Text>
            </Pressable>
            <EditPersonalInformationModal
              isVisible={editUserInfoModalVisible}
              userData={userData}
              profileData={profileData}
              onSave={handleSaveUserPersonalInformationFromModal}
              onClose={() => setEditUserInfoModalVisible(false)}
            />
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="person-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"}`}
                >
                  Username
                </Text>
                {userData.username ? (
                  <Text
                    className={`text-base  ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"} `}
                  >
                    {userData.username}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="mail-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"}`}
                >
                  Email
                </Text>
                {userData.email ? (
                  <Text
                    className={`text-base  ${theme === "dark" ? "text-zinc-300 " : "text-zinc-800"} `}
                  >
                    {userData.email}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="call-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"} `}
                >
                  Telefone
                </Text>
                {profileData.phoneNumber ? (
                  <Text
                    className={`text-base  ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"} `}
                  >
                    {profileData.phoneNumber}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="location-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"} `}
                >
                  Endereço
                </Text>
                {profileData.address ? (
                  <Text
                    className={`text-base  ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"} `}
                  >
                    {profileData.address}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View
          className={`w-[92%] rounded-lg p-4  mt-6 mx-auto ${theme === "dark" ? "bg-neutral-700/60" : "bg-white"} `}
        >
          <View className="flex-row justify-between items-center">
            <Text
              className={`text-xl font-bold  ${theme === "dark" ? "text-white" : "text-black"} `}
            >
              Informações Médicas
            </Text>
            <Pressable onPress={() => setEditUserMedicalInfoModalVisible(true)}>
              <Text
                className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"} `}
              >
                Editar
              </Text>
            </Pressable>
            <EditUserMedicalInformationModal
              isVisible={editUserMedicalInfoModalVisible}
              dataProfile={profileData}
              dataMedical={medicalData}
              onSave={handleSaveMedicalPersonalInformationFromModal}
              onClose={() => setEditUserMedicalInfoModalVisible(false)}
            />
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="card-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text className="text-base text-zinc-400">Id Paciente</Text>
                <Text className="text-base text-zinc-800 font-semibold">
                  {medicalData.codHospital ? (
                    <Text
                      className={`text-base  ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"}`}
                    >
                      {medicalData.codHospital}
                    </Text>
                  ) : (
                    <Text className="">--</Text>
                  )}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="calendar-clear-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text className="text-base text-zinc-400">Nascimento</Text>
                {profileData.birthday ? (
                  <Text
                    className={`text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"}`}
                  >
                    {profileData.birthday}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="calendar-clear-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"} `}
                >
                  Gênero
                </Text>
                {profileData.sex ? (
                  <Text
                    className={`text-base  ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"} `}
                  >
                    {profileData.sex.toUpperCase()}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="barbell-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text
                  className={`text-base ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"}  `}
                >
                  Peso | Altura
                </Text>
                <View className="flex-row justify-start items-center">
                  {medicalData.height ? (
                    <Text
                      className={`text-base  ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"} `}
                    >
                      {medicalData.height}
                    </Text>
                  ) : (
                    <Text>--</Text>
                  )}

                  <Text
                    className={`text-base ${theme === "dark" ? "text-zinc-200" : "text-zinc-800"}  mx-3 `}
                  >
                    |
                  </Text>
                  {medicalData.weight ? (
                    <Text
                      className={`text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"}  `}
                    >
                      {medicalData.weight}
                    </Text>
                  ) : (
                    <Text>--</Text>
                  )}
                </View>
              </View>
            </View>

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="bandage-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"} `}
                >
                  Tipo Sanguíneo
                </Text>
                {medicalData.bloodGroup ? (
                  <Text
                    className={`text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"}  `}
                  >
                    {medicalData.bloodGroup}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="fitness-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text
                  className={`text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-400"}  `}
                >
                  Cancer
                </Text>
                <Text
                  className={`text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 ${theme === "dark" ? "text-zinc-300" : "text-blue-400"}  `}
                >
                  {profileData.tags[0].description ? (
                    <Text
                      className={`text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400`}
                    >
                      {profileData.tags[0].description}
                    </Text>
                  ) : (
                    <Text>--</Text>
                  )}
                </Text>
              </View>
            </View>
            {/* <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={theme === 'dark' ? 'white':"black"} size={20} />
              <View>
                <Text className="text-base text-zinc-400">Tipo de Cancer</Text>
                <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                  Carcinoma Ductal Invasivo
                </Text>
              </View>
            </View> */}
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="fitness-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
              <View>
                <Text
                  className={`text-base ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"}  `}
                >
                  Estadiamento
                </Text>
                {medicalData.stage ? (
                  <Text
                    className={`text-base font-semibold py-2 px-3 rounded-lg ${theme === "dark" ? "text-zinc-300 " : "bg-blue-300/20 text-blue-400"}    `}
                  >
                    {medicalData.stage}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="fitness-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
              <View>
                <Text
                  className={`text-base ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"}  `}
                >
                  Unidade Hospitar
                </Text>
                {medicalData.hospital ? (
                  <Text
                    className={`text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20   ${theme === "dark" ? "text-zinc-300" : "text-blue-400"} `}
                  >
                    {medicalData.hospital}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View
          className={`w-[92%] rounded-lg p-4  mt-6 mx-auto ${theme === "dark" ? "bg-neutral-700/60" : "bg-white"} `}
        >
          <View className="flex-row justify-start items-center">
            <Text
              className={`text-xl font-bold  ${theme === "dark" ? "text-white" : "text-black"} `}
            >
              Preferências
            </Text>
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="notifications-circle-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              />
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"} `}
                >
                  Ativar Notificações
                </Text>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"} `}
                >
                  On/Off lembretes de medicação
                </Text>
              </View>
              <View className="ms-auto">
                <SafeAreaProvider>
                  <SafeAreaView>
                    <Switch
                      trackColor={{ false: "#52525b", true: "#2563eb" }}
                      thumbColor={isEnabledMedicationReminder ? "#000" : "#fff"}
                      ios_backgroundColor="#fff"
                      onValueChange={() => {
                        setIsEnabledMedicationReminder(
                          !isEnabledMedicationReminder
                        );

                        ToastAndroid.show(
                          `Lembretes de Medicações  ${!isEnabledMedicationReminder ? "ativada" : "desativada"}`,
                          ToastAndroid.TOP
                        );
                      }}
                      value={isEnabledMedicationReminder}
                    />
                  </SafeAreaView>
                </SafeAreaProvider>
              </View>
            </View>
          </View>
        </View>
        <View
          className={`w-[92%] rounded-lg p-4  mt-6 mx-auto ${theme === "dark" ? "bg-neutral-700/60" : "bg-white"} `}
        >
          <View className="flex-row justify-start items-center">
            <Text
              className={`text-xl font-bold  ${theme === "dark" ? "text-white" : "text-black"} `}
            >
              Segurança & Conta
            </Text>
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="lock-open-outline"
                color={theme === "dark" ? "white" : "black"}
                size={20}
              ></Icon>
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"} `}
                >
                  Alterar Palavra-Passe
                </Text>
                <TextInput
                  onPress={() => {
                    setOpenModalChangePassword(true);
                  }}
                  placeholder="Password Atual"
                  className={`py-4 px-4  rounded-lg  ${theme === "dark" ? "bg-zinc-500/50" : "bg-zinc-200/50 placeholder:text-zinc-400"}`}
                ></TextInput>
                <TextInput
                  onPress={() => {
                    setOpenModalChangePassword(true);
                  }}
                  placeholder="Password Nova"
                  className={`py-4 px-4  rounded-lg  mt-3 ${theme === "dark" ? "bg-zinc-500/50" : "bg-zinc-200/50 placeholder:text-zinc-400"}`}
                ></TextInput>
              </View>

              <Modal isOpen={openModalChangePassword} withInput={true}>
                <View
                  className={`p-6  rounded-2xl w-full max-w-md shadow-lg ${theme === "dark" ? "bg-neutral-700/80" : "bg-white"} `}
                >
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-black dark:text-white">
                      Atualizar Password
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setOpenModalChangePassword(false);
                      }}
                    >
                      <Icon name="close" size={24} color="#4A4A4A" />
                    </TouchableOpacity>
                  </View>
                  <Text
                    className={` mb-1 ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}  `}
                  >
                    Atual Password
                  </Text>
                  <TextInput
                    className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
                    placeholder="Senha Atual..."
                    value={atualPassword}
                    onChangeText={setAtualPassword}
                  />
                  <Text
                    className={` mb-1 ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"} `}
                  >
                    Nova Password
                  </Text>
                  <TextInput
                    className="border border-zinc-300 rounded-lg px-4 py-2 mb-3 h-20"
                    placeholder="A tua nova senha requerida"
                    multiline
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />

                  <TouchableOpacity
                    className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
                    onPress={() => onUpdatePassword(atualPassword, newPassword)}
                  >
                    <Icon
                      name="save"
                      size={20}
                      color="white"
                      className="mr-2"
                    />
                    <Text className="text-white text-center font-semibold ">
                      Atualizar
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3 mb-5">
              <View className="mt-4">
                <Pressable
                  onPress={() => {
                    handleLogout();
                    navigation.navigate("Login");
                  }}
                >
                  <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-red-300/20 text-red-400">
                    Sair da Conta
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
