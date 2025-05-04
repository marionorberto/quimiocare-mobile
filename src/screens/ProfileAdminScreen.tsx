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

const ProfileAdminScreen = ({ route, navigation }: props) => {
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
        "Password Admin atualizada com sucesso, próximo login entre com a sua nova password"
      );
      navigation.navigate("Login");
    } catch (error: any) {
      if (error.data) {
        alert(`${error.message.map((error: string) => error)}`);
      }
      alert(`${error.message}`);
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
          Perfil Admin
        </Text>
      </View>

      <ScrollView className="pb-20" showsVerticalScrollIndicator={false}>
        <View className="flex-col justify-center items-center w-full mt-6">
          <View className="flex-col justify-center items-center w-full">
            <View className="relative">
              <Image
                source={require("../../assets/admin.png")}
                style={{
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: "#fff",
                  width: 110,
                  height: 110,
                }}
              ></Image>
            </View>
            <Text
              className={` font-semibold text-center text-lg mt-4 ${theme === "dark" ? "text-white" : "text-black"}  `}
            >
              admin
            </Text>
            <Text
              className={` text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-500"} `}
            >
              Administrador
            </Text>

            <Text
              className={` text-base ${theme === "dark" ? "text-zinc-300" : "text-zinc-400"} `}
            >
              Adminstrador do Quimiocare
            </Text>

            <View
              className={` w-full border-b-2  flex-row justify-around items-center py-4 mt-5 ${theme === "dark" ? "border-zinc-500" : "border-zinc-300"} `}
            ></View>
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
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-300" : "text-zinc-800"} `}
                >
                  admin
                </Text>
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
                <Text
                  className={`text-base  ${theme === "dark" ? "text-zinc-300 " : "text-zinc-800"} `}
                >
                  admin@gmail.com
                </Text>
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

export default ProfileAdminScreen;
