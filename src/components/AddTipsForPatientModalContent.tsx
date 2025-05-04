import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ModalProps,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";

type props = ModalProps & {
  isOpen: boolean;
};

const AddTipsForPatientModalContent = ({ isOpen, ...rest }: props) => {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState(0);
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  return (
    <Modal
      visible={isModalOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <View className="flex-1 justify-center items-center p-3 bg-zinc-900/40">
        <View className="p-6 bg-white rounded-2xl w-full max-w-md shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-zinc-900">
              Adicionar Sintoma
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsModalOpen(false);
              }}
            >
              <Ionicons name="close" size={24} color="#4A4A4A" />
            </TouchableOpacity>
          </View>
          <Text className="text-zinc-700 mb-1">Nome do sintoma</Text>
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
            placeholder="Ex: Náusea, Fadiga..."
            value={symptom}
            onChangeText={setSymptom}
          />
          <Text className="text-zinc-700 mb-1">Descrição</Text>
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-2 mb-3 h-20"
            placeholder="Detalhe os sintomas, duração, intensidade..."
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <Text className="text-zinc-700 mb-1">Intensidade</Text>
          <View className="flex-row gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <TouchableOpacity key={level} onPress={() => setSeverity(level)}>
                <Ionicons
                  name={level <= severity ? "star" : "star-outline"}
                  size={24}
                  color={level <= severity ? "#3B82F6" : "#D1D5DB"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
            onPress={() => onSave({ symptom, severity, description })}
          >
            <Ionicons name="save" size={20} color="white" className="mr-2" />
            <Text className="text-white text-center font-semibold">
              Salvar Sintoma
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const onSave = ({
  symptom,
  severity,
  description,
}: {
  symptom: string;
  severity: number;
  description: string;
}) => {
  console.log({ symptom, severity, description });
};

export default AddTipsForPatientModalContent;
