import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../helpers/theme-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.BanUserScreen
>;

const BanUserScreen = ({ navigation }: props) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [banReason, setBanReason] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Dados mockados - substitua pela sua API
  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      type: "Paciente",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Dra. Ana Souza",
      email: "ana@clinic.com",
      type: "Médico",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Carlos Ferreira",
      email: "carlos@email.com",
      type: "Paciente",
      status: "Banido",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBanUser = () => {
    // Aqui você faria a chamada API para banir o usuário
    console.log(`Usuário ${selectedUser.name} banido. Motivo: ${banReason}`);
    setShowModal(false);
    setSelectedUser(null);
    setBanReason("");
  };

  type props = NativeStackScreenProps<
    RootStackParamsList,
    ScreenNames.BanUserScreen
  >;

  return (
    <View
      className={`mt-8 flex-1 ${theme === "dark" ? "bg-neutral-900" : "bg-white"}`}
    >
      {/* Header */}
      <View
        className={`flex-row items-center p-4 ${theme === "dark" ? "bg-neutral-800" : "bg-gray-50"}`}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text
          className={`text-xl font-bold ml-4 ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Banir Usuário
        </Text>
      </View>

      {/* Barra de Pesquisa */}
      <View
        className={`p-4 ${theme === "dark" ? "bg-neutral-800" : "bg-gray-100"}`}
      >
        <View
          className={`flex-row items-center rounded-lg px-4 ${theme === "dark" ? "bg-neutral-700" : "bg-white"}`}
        >
          <Icon name="search" size={20} color="#999" />
          <TextInput
            className="flex-1 p-3 ml-2"
            placeholder="Buscar por nome ou email"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Lista de Usuários */}
      <ScrollView className="flex-1 p-4">
        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            className={`p-4 mb-3 rounded-lg ${theme === "dark" ? "bg-neutral-800" : "bg-gray-50"} ${user.status === "Banido" ? "opacity-60" : ""}`}
            onPress={() => {
              if (user.status !== "Banido") {
                setSelectedUser(user);
                setShowModal(true);
              }
            }}
            disabled={user.status === "Banido"}
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text
                  className={`font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  {user.name}
                </Text>
                <Text
                  className={`${theme === "dark" ? "text-neutral-400" : "text-gray-600"}`}
                >
                  {user.email}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Text
                  className={`mr-3 ${theme === "dark" ? "text-neutral-400" : "text-gray-600"}`}
                >
                  {user.type}
                </Text>
                <View
                  className={`px-2 py-1 rounded-full ${user.status === "Banido" ? "bg-red-100" : "bg-green-100"}`}
                >
                  <Text
                    className={`text-xs ${user.status === "Banido" ? "text-red-800" : "text-green-800"}`}
                  >
                    {user.status}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal de Confirmação */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className={`w-11/12 p-6 rounded-xl ${theme === "dark" ? "bg-neutral-800" : "bg-white"}`}
          >
            <Text
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Confirmar Banimento
            </Text>

            <Text
              className={`mb-2 ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}
            >
              Usuário: {selectedUser?.name}
            </Text>
            <Text
              className={`mb-4 ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}
            >
              Email: {selectedUser?.email}
            </Text>

            <Text
              className={`mb-2 ${theme === "dark" ? "text-neutral-300" : "text-gray-700"}`}
            >
              Motivo do banimento:
            </Text>
            <TextInput
              className={`p-3 mb-4 rounded-lg ${theme === "dark" ? "bg-neutral-700 text-white" : "bg-gray-100 text-black"}`}
              placeholder="Descreva o motivo..."
              placeholderTextColor={theme === "dark" ? "#aaa" : "#999"}
              multiline
              numberOfLines={3}
              value={banReason}
              onChangeText={setBanReason}
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                className={`px-4 py-3 rounded-lg ${theme === "dark" ? "bg-neutral-700" : "bg-gray-200"}`}
                onPress={() => setShowModal(false)}
              >
                <Text
                  className={theme === "dark" ? "text-white" : "text-black"}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-4 py-3 rounded-lg bg-red-500 ml-4"
                onPress={handleBanUser}
                disabled={!banReason}
              >
                <Text className="text-white font-bold">
                  Confirmar Banimento
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BanUserScreen;
