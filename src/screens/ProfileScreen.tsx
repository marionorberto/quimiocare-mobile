import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import React from "react";
import Contants from "expo-constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../constants/types";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";

type props = NativeStackScreenProps<BottomTabParamList>;

const ProfileScreen = ({ route, navigation }: props) => {
  let isModalEditVisible: boolean = false;

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full pt-6"
    >
      <View className="flex-row justify-start items-center gap-10 px-4">
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
              ></Image>
              <View className="bg-white w-6 h-6 rounded-md absolute bottom-0 right-2 flex-1 justify-center items-center">
                <Icon name="pencil-outline" color={"black"} size={19}></Icon>
              </View>
            </View>
            <Text className="text-black font-semibold text-center text-lg mt-4">
              Mário Norberto
            </Text>
            <Text className="text-zinc-400 text-base">
              Lorem ipsum dolor sit amet.
            </Text>
            <Text className="text-zinc-400 text-base text-center">
              Lorem ipsum dolor
            </Text>
            <Text className="text-zinc-300 text-sm text-center">
              Lorem ipsum
            </Text>
            <View className=" w-full border-y-2 border-zinc-300 flex-row justify-around items-center py-4 mt-5">
              <View>
                <Text className="font-bold text-lg text-center">20</Text>
                <Text className="text-zinc-300 text-center text-sm">
                  Lorem, ipsum.
                </Text>
              </View>
              <View>
                <Text className="font-bold text-lg text-center">20</Text>
                <Text className="text-zinc-300 text-center text-sm">
                  Lorem, ipsum.
                </Text>
              </View>
            </View>

            <View className=" w-full border-b-2 border-zinc-300 flex-row justify-around gap-4 items-center py-4 px-6">
              <View className=" bg-blue-400/15 rounded-lg px-3 py-3 flex-1 justify-center items-center">
                <Pressable>
                  <Text className="text-blue-500 text-center font-bold">
                    Documentos
                  </Text>
                </Pressable>
              </View>
              <View className=" bg-blue-400/15 rounded-lg px-3 py-3 flex-1 justify-center items-center">
                <Pressable>
                  <Text className="text-blue-500 text-center font-bold">
                    Medicações
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
                    ></Icon>
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
            <Pressable onPress={() => (isModalEditVisible = true)}>
              <Text className="text-lg font-semibold text-black">Editar</Text>
            </Pressable>
            <Modal visible={isModalEditVisible} animationType="slide">
              <Text>Hello Modal</Text>
            </Modal>
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="person-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Name</Text>
                <Text className="text-base text-zinc-800">Mário Norberto</Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="mail-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Email</Text>
                <Text className="text-base text-zinc-800">
                  marionorberto2018@gmail.com
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="call-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Telefone</Text>
                <Text className="text-base text-zinc-800">
                  + 244 935 327 990
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="location-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Endereço</Text>
                <Text className="text-base text-zinc-800">
                  Angola, Luanda, Rangel - 34 Avenida
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="w-[92%] rounded-lg p-4 bg-white mt-6 mx-auto">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-black">
              Informações Médicas
            </Text>
            <Text className="text-lg font-semibold text-black">Editar</Text>
          </View>
          <View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="card-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Id Paciente</Text>
                <Text className="text-base text-zinc-800 font-semibold">
                  #1223llsd
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
                <Text className="text-base text-zinc-400">Idade</Text>
                <Text className="text-base text-zinc-800">34</Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="barbell-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Peso | Altura</Text>
                <Text className="text-base text-zinc-800">45 KG | 1.67</Text>
              </View>
            </View>

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="bandage-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Tipo Sanguíneo</Text>
                <Text className="text-base text-zinc-800">+A</Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Cancer</Text>
                <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                  Cancer da Mama
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Tipo de Cancer</Text>
                <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                  Carcinoma Ductal Invasivo
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">Estadiamento</Text>
                <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                  Estágio IIIB
                </Text>
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20}></Icon>
              <View>
                <Text className="text-base text-zinc-400">
                  Unidade Hospitar
                </Text>
                <Text className="text-base font-semibold py-2 px-3 rounded-lg bg-blue-300/20 text-blue-400">
                  Hospital Cajueiro
                </Text>
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
                  Ativar/Desativar lembretes de medicação
                </Text>
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
