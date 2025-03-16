import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type props = { isVisible: boolean; onClose: any; data: any; onSave: any };

const EditUserMedicalInformationModal = ({
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
            <Icon name="card-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Id Paciente</Text>
              <TextInput
                value={editedData.idPacient}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, idPacient: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="calendar-clear-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Idade</Text>
              <TextInput
                value={editedData.age}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, age: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="barbell-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Peso</Text>
              <TextInput
                value={editedData.weight}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, phone: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="barbell-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Altura</Text>
              <TextInput
                value={editedData.height}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, height: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="bandage-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Tipo Sanguíneo</Text>
              <TextInput
                value={editedData.bloodType}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, bloodType: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="fitness-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Cancer</Text>
              <TextInput
                value={editedData.cancer}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, cancer: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="fitness-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Tipo De Cancer</Text>
              <TextInput
                value={editedData.cancerType}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, cancerType: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="fitness-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Estadiamento</Text>
              <TextInput
                value={editedData.stage}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, stage: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>

          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="fitness-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">
                Unidade Hospitalar
              </Text>
              <TextInput
                value={editedData.hospital}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, hospital: text })
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

export default EditUserMedicalInformationModal;
