import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../constants/types";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../services/api";
import { handleLogout } from "../services/authService";
import { API_URL, API_URL_UPLOAD } from "../constants/data";
import Modal from "../components/Modal";
import { handleUpdatePassword } from "../services/updatePasswordService";
import { useTheme } from "../helpers/theme-context";
import { updateDoctorPersonalInformation } from "../services/profile/updateDoctorPersonalInformation";
import EditDoctorPersonalInformationModal from "../components/EditDoctorPersonalInformationModal";

type props = NativeStackScreenProps<BottomTabParamList>;

const ProfileMedicoScreen = ({ route, navigation }: props) => {
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
    hospital: "",
    bio: "",
    sex: "",
    phoneNumber: "",
    speciality: "",
    address: "",
    job: "",
    urlImg: "",
    created_at: new Date(),
    updated_at: new Date(),
  });

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

  useEffect(() => {
    fetchUserData();
    fetchProfileData();
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

  const handleSaveDoctorPersonalInformationFromModal = async (
    updatedUserData: {
      id: string;
      username: string;
      email: string;
      typeUser: string;
      createdAt: Date;
      updatedAt: Date;
    },
    updatedProfileData: {
      hospital: string;
      bio: string;
      address: string;
      phoneNumber: string;
      speciality: string;
      created_at: Date;
      updated_at: Date;
      urlImg: string;
      sex: string;
      userId: string;
      job: string;
      user_profile_id: string;
    }
  ) => {
    try {
      await updateDoctorPersonalInformation(
        updatedUserData,
        updatedProfileData
      );

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

  const fetchProfileData = () => {
    try {
      api
        .get(`${API_URL}/profiles/single/doctor`)
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
          Perfil Médico
        </Text>
      </View>

      <ScrollView className="pb-20" showsVerticalScrollIndicator={false}>
        <View className="flex-col justify-center items-center w-full mt-6">
          <View className="flex-col justify-center items-center w-full">
            <View className="relative">
              <Image
                source={{
                  uri: `http://${API_URL_UPLOAD}:3000/${profileData.urlImg}`,
                }}
                style={{
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: "#fff",
                  width: 110,
                  height: 110,
                }}
              ></Image>
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
            <EditDoctorPersonalInformationModal
              isVisible={editUserInfoModalVisible}
              userData={userData}
              profileData={profileData}
              onSave={handleSaveDoctorPersonalInformationFromModal}
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
              <Text>🩺</Text>
              <View>
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-200" : "text-zinc-400"}`}
                >
                  Especialidade Médica
                </Text>
                {profileData.speciality ? (
                  <Text
                    className={`text-base  ${theme === "dark" ? "text-zinc-300 " : "text-zinc-800"} `}
                  >
                    {profileData.speciality}
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

export default ProfileMedicoScreen;
