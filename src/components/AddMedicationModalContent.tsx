import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type props = { isVisible: boolean; onClose: any; data: any; onSave: any };

const EditMedicalInformationModal = ({
  isVisible,
  onClose,
  data,
  onSave,
}: props) => {
  const [editedData, setEditedData] = useState({ ...data });

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center p-3 bg-zinc-900/40">
        <View className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
          <Text className="text-2xl font-semibold text-zinc-900 mb-4">
            Editar Dados
          </Text>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="person-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Nome</Text>
              <TextInput
                value={editedData.name}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, name: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="mail-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Email</Text>
              <TextInput
                value={editedData.email}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, email: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="call-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Telefone</Text>
              <TextInput
                value={editedData.phone}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, phone: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          {/* Endereço */}
          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="location-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Endereço</Text>
              <TextInput
                value={editedData.address}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, address: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-end gap-4 mt-6">
            <TouchableOpacity
              onPress={onClose}
              className="bg-zinc-300 p-2 rounded-lg"
            >
              <Text className="text-zinc-900">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 p-2 rounded-lg"
            >
              <Text className="text-white">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditMedicalInformationModal;
