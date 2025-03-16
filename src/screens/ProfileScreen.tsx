import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  SafeAreaView,
  Switch,
  Alert,
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
import { API_URL } from "../constants/data";

type props = NativeStackScreenProps<BottomTabParamList>;

const ProfileScreen = ({ route, navigation }: props) => {
  let isEnabledLayoutMode: boolean = false;
  const [isEnabledMedicationReminder, setIsEnabledMedicationReminder] =
    useState(false);
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
    createdAt: "",
    updatedAt: "",
    notifications: [],
    tags: [],
  });
  const [profileData, setProfileData] = useState({
    birthday: "",
    bio: "",
    address: "",
    country_name: "",
    phone: "",
    created_at: "",
    updated_at: "",
    url_img: "",
    sex: "",
    userId: "",
    job: "",
    user_profile_id: "",
    tags: [],
  });
  const [medicalData, setMedicalData] = useState({
    bloodGroup: "",
    codHospital: "",
    created_at: "",
    height: "",
    hospital: "",
    stage: "",
    target_support: "",
    updated_at: "",
    userId: "",
    user_id: "",
    weight: "",
  });

  const handleSave = (updatedData: any) => {
    setUserData(updatedData);
  };

  useEffect(() => {
    fetchUserData();
    fetchProfileData();
    fetchMedicalData();
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
      Alert.alert("Erro", "erro tentando pegar os dados de usuários");
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

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-6"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
        <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={20} color={"#505050"} />
          </Pressable>
        </View>
        <Text className="text-xl self-center text-center text-black font-bold">
          Perfil
        </Text>
      </View>
      <ScrollView className="pb-20" showsVerticalScrollIndicator={false}>
        <View className="flex-col justify-center items-center w-full mt-6">
          <View className="flex-col justify-center items-center w-full">
            <View className="relative">
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  alignContent: "center",
                  borderWidth: 5,
                  borderColor: "white",
                  backgroundColor: "#ccc",
                }}
                source={require("../../assets/user.png")}
              />
              <View className="bg-white w-6 h-6 rounded-md absolute bottom-0 right-2 flex-1 justify-center items-center">
                <Icon name="pencil-outline" color={"black"} size={19} />
              </View>
            </View>
            {userData ? (
              <Text className="text-black font-semibold text-center text-lg mt-4">
                {userData.username}
              </Text>
            ) : (
              <Text>--</Text>
            )}
            {profileData ? (
              <Text className="text-zinc-500 text-base">{profileData.job}</Text>
            ) : (
              <Text>--</Text>
            )}
            {profileData ? (
              <Text className="text-zinc-400 text-base">{profileData.bio}</Text>
            ) : (
              <Text>--</Text>
            )}

            <View className=" w-full border-y-2 border-zinc-300 flex-row justify-around items-center py-4 mt-5">
              <View>
                <Text className="font-bold text-lg text-center">0</Text>
                <Text className="text-zinc-300 text-center text-sm">
                  Consultas
                </Text>
              </View>
              <View>
                <Text className="font-bold text-lg text-center">0</Text>
                <Text className="text-zinc-300 text-center text-sm">
                  Remédios
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

              <View className=" bg-blue-400/15 rounded-lg px-3 py-2 flex-1 justify-center items-center">
                <Pressable>
                  <Text className=" text-center font-bold">
                    <Icon
                      name="chatbox-ellipses-sharp"
                      color={"#3b82f6"}
                      size={22}
                    />
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 bg-white mt-6 mx-auto">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-black">
              Informações Pessoais
            </Text>
            <Pressable onPress={() => setEditUserInfoModalVisible(true)}>
              <Text className="text-lg font-semibold text-black">Editar</Text>
            </Pressable>
            <EditPersonalInformationModal
              isVisible={editUserInfoModalVisible}
              onClose={() => setEditUserInfoModalVisible(false)}
              data={userData}
              onSave={handleSave}
            />
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="person-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Username</Text>
                {userData ? (
                  <Text className="text-base text-zinc-800">
                    {userData.username}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="mail-outline" color={"black"} size={20} />
              <View>
                <Text className="text-base text-zinc-400">Email</Text>
                {userData ? (
                  <Text className="text-base text-zinc-800">
                    {userData.email}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="call-outline" color={"black"} size={20} />
              <View>
                <Text className="text-base text-zinc-400">Telefone</Text>
                {profileData ? (
                  <Text className="text-base text-zinc-800">
                    {profileData.phone}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="location-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Endereço</Text>
                {userData ? (
                  <Text className="text-base text-zinc-800">
                    {profileData.address}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 bg-white mt-6 mx-auto">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-black">
              Informações Médicas
            </Text>
            <Pressable onPress={() => setEditUserMedicalInfoModalVisible(true)}>
              <Text className="text-lg font-semibold text-black">Editar</Text>
            </Pressable>
            <EditUserMedicalInformationModal
              isVisible={editUserMedicalInfoModalVisible}
              onClose={() => setEditUserMedicalInfoModalVisible(false)}
              data={userData}
              onSave={handleSave}
            />
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="card-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Id Paciente</Text>
                <Text className="text-base text-zinc-800 font-semibold">
                  {medicalData ? (
                    <Text className="text-base text-zinc-800">
                      {medicalData.codHospital}
                    </Text>
                  ) : (
                    <Text>--</Text>
                  )}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="calendar-clear-outline"
                color={"black"}
                size={20}
              ></Icon>
              <View>
                <Text className="text-base text-zinc-400">Nascimento</Text>
                {profileData ? (
                  <Text className="text-base text-zinc-800">
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
                color={"black"}
                size={20}
              ></Icon>
              <View>
                <Text className="text-base text-zinc-400">Sexo</Text>
                {profileData ? (
                  <Text className="text-base text-zinc-800">
                    {profileData.sex.toUpperCase()}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="barbell-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Peso | Altura</Text>
                <View className="flex-row justify-start items-center">
                  {medicalData ? (
                    <Text className="text-base text-zinc-800">
                      {medicalData.height}
                    </Text>
                  ) : (
                    <Text>--</Text>
                  )}

                  <Text className="text-base text-zinc-800 mx-3">|</Text>
                  {medicalData ? (
                    <Text className="text-base text-zinc-800">
                      {medicalData.weight}
                    </Text>
                  ) : (
                    <Text>--</Text>
                  )}
                </View>
              </View>
            </View>

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="bandage-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Tipo Sanguíneo</Text>
                {medicalData ? (
                  <Text className="text-base text-zinc-800">
                    {medicalData.bloodGroup}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Cancer</Text>
                <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                  ---
                </Text>
              </View>
            </View>
            {/* <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20} />
              <View>
                <Text className="text-base text-zinc-400">Tipo de Cancer</Text>
                <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                  Carcinoma Ductal Invasivo
                </Text>
              </View>
            </View> */}
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20} />
              <View>
                <Text className="text-base text-zinc-400">Estadiamento</Text>
                {medicalData ? (
                  <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                    {medicalData.stage}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20} />
              <View>
                <Text className="text-base text-zinc-400">
                  Unidade Hospitar
                </Text>
                {medicalData ? (
                  <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                    {medicalData.hospital}
                  </Text>
                ) : (
                  <Text>--</Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 bg-white mt-6 mx-auto">
          <View className="flex-row justify-start items-center">
            <Text className="text-xl font-bold text-black">Preferências</Text>
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon
                name="notifications-circle-outline"
                color={"black"}
                size={20}
              ></Icon>
              <View>
                <Text className="text-base text-zinc-400">
                  Ativar Notificações
                </Text>
                <Text className="text-base text-zinc-800">
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
                      onValueChange={() => setIsEnabledMedicationReminder(true)}
                      value={isEnabledLayoutMode}
                    />
                  </SafeAreaView>
                </SafeAreaProvider>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="moon-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Tema</Text>
                <Text className="text-base text-zinc-800">
                  Modo Claro/Escuro
                </Text>
              </View>
              <View className="ms-auto">
                <SafeAreaProvider>
                  <SafeAreaView>
                    <Switch
                      trackColor={{ false: "#52525b", true: "#2563eb" }}
                      thumbColor={isEnabledLayoutMode ? "#000" : "#fff"}
                      ios_backgroundColor="#fff"
                      onValueChange={() =>
                        alert("Apenas o modo claro está disponível!")
                      }
                      value={isEnabledLayoutMode}
                    />
                  </SafeAreaView>
                </SafeAreaProvider>
              </View>
            </View>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 bg-white mt-6 mx-auto">
          <View className="flex-row justify-start items-center">
            <Text className="text-xl font-bold text-black">
              Segurança & Conta
            </Text>
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="lock-open-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">
                  Alterar Palavra-Passe
                </Text>
                <TextInput
                  placeholder="Password Atual"
                  className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400"
                ></TextInput>
                <TextInput
                  placeholder="Password Nova"
                  className="py-4 px-4 bg-zinc-200/50 rounded-lg placeholder:text-zinc-400 mt-3"
                ></TextInput>
              </View>
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
