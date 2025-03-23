import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type props = {
  isVisible: boolean;
  onClose: any;
  dataProfile: any;
  dataMedical: any;
};

const EditUserMedicalInformationModal = ({
  isVisible,
  onClose,
  dataProfile,
  dataMedical,
}: props) => {
  const [profile, setProfileData] = useState(dataProfile);
  const [medical, setdataMedical] = useState(dataMedical);

  const handleSave = () => {
    alert("alert");
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <ScrollView>
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
                  value={dataMedical.codHospital}
                  onChangeText={(text) =>
                    setdataMedical({ ...dataMedical, idPacient: text })
                  }
                  className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
                />
              </View>
            </View>

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="calendar-clear-outline" color={"black"} size={20} />
              <View className="flex-1">
                <Text className="text-base text-zinc-400">
                  Data de Nascimento
                </Text>
                <TextInput
                  value={dataProfile.birthday}
                  onChangeText={(text) =>
                    setProfileData({ ...dataProfile, birthday: text })
                  }
                  className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
                />
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="bandage-outline" color={"black"} size={20} />
              <View className="flex-1">
                <Text className="text-base text-zinc-400">Sexo</Text>
                <TextInput
                  value={dataProfile.sex.toUpperCase()}
                  onChangeText={(text) =>
                    setdataMedical({ ...dataProfile, sex: text })
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
                  value={dataMedical.weight}
                  onChangeText={(text) =>
                    setdataMedical({ ...dataMedical, weight: text })
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
                  value={dataMedical.height}
                  onChangeText={(text) =>
                    setdataMedical({ ...dataMedical, height: text })
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
                  value={dataMedical.bloodGroup}
                  onChangeText={(text) =>
                    setdataMedical({ ...dataMedical, bloodGroup: text })
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
                  value={dataProfile.tags[0].description}
                  onChangeText={(text) =>
                    setProfileData({ ...dataProfile, tags: text })
                  }
                  className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
                />
              </View>
            </View>

            {/* <View className="flex-row justify-start items-center gap-2 mt-3">
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
          </View> */}

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20} />
              <View className="flex-1">
                <Text className="text-base text-zinc-400">Estadiamento</Text>
                <TextInput
                  value={dataMedical.stage}
                  onChangeText={(text) =>
                    setdataMedical({ ...dataMedical, stage: text })
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
                  value={dataMedical.hospital}
                  onChangeText={(text) =>
                    setdataMedical({ ...dataMedical, hospital: text })
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
      </ScrollView>
    </Modal>
  );
};

export default EditUserMedicalInformationModal;
