import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { tags } from "react-native-svg/lib/typescript/xmlTags";
import Icon from "react-native-vector-icons/Ionicons";

type props = {
  isVisible: boolean;
  dataProfile: {
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
    tags: {
      id: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
  dataMedical: {
    id: string;
    codHospital: string;
    bloodGroup: string;
    height: string;
    weight: string;
    hospital: string;
    stage: string;
    targetSupport: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
  };
  onSave: any;
  onClose: any;
};

const EditUserMedicalInformationModal = ({
  isVisible,
  dataProfile,
  dataMedical,
  onSave,
  onClose,
}: props) => {
  const [formDataProfile, setFormDataProfile] = useState<{
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
    tags: {
      id: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  }>(dataProfile);
  const [formDataMedical, setFormDataMedical] = useState<{
    id: string;
    codHospital: string;
    bloodGroup: string;
    height: string;
    weight: string;
    hospital: string;
    stage: string;
    targetSupport: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
  }>(dataMedical);

  const bloodGroupList = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const hospitals = [
    "Intituto IACC",
    "Hospital Américo Boa Vida",
    "Lucréci Paim",
    "Instituto - IPO PORTO(Lubango)",
    "Clínica Sagrada Esperança",
    "Clínica Girassol",
  ];
  const stageList = [
    "estágio 0",
    "estágio I",
    "estágio II",
    "estágio III",
    "estágio IV",
  ];

  useEffect(() => {
    setFormDataProfile(dataProfile);
    setFormDataMedical(dataMedical);
  }, [dataProfile, dataMedical]);

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
                  value={formDataMedical?.codHospital}
                  onChangeText={(text) =>
                    setFormDataMedical({
                      ...formDataMedical,
                      codHospital: text,
                    })
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
                  value={formDataProfile.birthday}
                  onChangeText={(text) =>
                    setFormDataProfile({ ...formDataProfile, birthday: text })
                  }
                  className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
                />
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="bandage-outline" color={"black"} size={20} />
              <View className="flex-1">
                <Text className="text-base text-zinc-400">Gênero</Text>
                <Picker
                  style={{ color: "#999" }}
                  selectedValue={formDataProfile.sex.toUpperCase()}
                  onValueChange={(text) =>
                    setFormDataProfile({ ...formDataProfile, sex: text })
                  }
                  className="border border-zinc-300 rounded-lg px-4 py-3"
                >
                  <Picker.Item
                    label={formDataProfile.sex.toUpperCase()}
                    value={formDataProfile.sex.toUpperCase()}
                  />
                  <Picker.Item label="M" value="M" />
                  <Picker.Item label="F" value="F" />
                </Picker>
                {/* <TextInput
                  value={formDataProfile.sex.toUpperCase()}
                  onChangeText={(text) =>
                    setFormDataProfile({ ...formDataProfile, sex: text })
                  }
                  className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
                /> */}
              </View>
            </View>

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="barbell-outline" color={"black"} size={20} />
              <View className="flex-1">
                <Text className="text-base text-zinc-400">Peso</Text>
                <TextInput
                  value={formDataMedical.weight}
                  onChangeText={(text) =>
                    setFormDataMedical({
                      ...formDataMedical,
                      weight: text.replace(/[^0-9.]/g, ""),
                    })
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
                  value={formDataMedical.height}
                  onChangeText={(text) =>
                    setFormDataMedical({
                      ...formDataMedical,
                      height: text.replace(/[^0-9.]/g, ""),
                    })
                  }
                  className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
                />
              </View>
            </View>

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="bandage-outline" color={"black"} size={20} />
              <View className="flex-1">
                <Text className="text-base text-zinc-400">Tipo Sanguíneo</Text>
                <Picker
                  style={{ color: "#999" }}
                  selectedValue={formDataMedical.bloodGroup}
                  onValueChange={(text) =>
                    setFormDataMedical({ ...formDataMedical, bloodGroup: text })
                  }
                  className="border border-zinc-300 rounded-lg px-4 py-3"
                >
                  <Picker.Item label="Selecione o grupo" value="" />
                  {bloodGroupList.map((group) => (
                    <Picker.Item key={group} label={group} value={group} />
                  ))}
                </Picker>
                {/* <TextInput
                  value={dataMedical.bloodGroup}
                  onChangeText={(text) =>
                    setFormDataMedical({ ...dataMedical, bloodGroup: text })
                  }
                  className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
                /> */}
              </View>
            </View>

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20} />
              <View className="flex-1">
                <Text className="text-base text-zinc-400">Cancer</Text>
                <TextInput
                  value={dataProfile.tags[0].description}
                  onChangeText={(text) =>
                    setFormDataProfile({
                      ...dataProfile,
                      tags: [
                        {
                          id: formDataProfile.tags[0].id,
                          description: text,
                          createdAt: formDataProfile.tags[0].createdAt,
                          updatedAt: formDataProfile.tags[0].updatedAt,
                        },
                      ],
                    })
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
                <Picker
                  className="border border-zinc-300 rounded-lg px-4 py-3"
                  style={{ color: "#999" }}
                  selectedValue={formDataMedical.stage}
                  onValueChange={(text) =>
                    setFormDataMedical({ ...formDataMedical, stage: text })
                  }
                >
                  <Picker.Item label="Selecione o Estágio" value="" />
                  {stageList.map((stage) => (
                    <Picker.Item key={stage} label={stage} value={stage} />
                  ))}
                </Picker>
              </View>
            </View>

            <View className="flex-row justify-start items-center gap-2 mt-3">
              <Icon name="fitness-outline" color={"black"} size={20} />
              <View className="flex-1">
                <Text className="text-base text-zinc-400">
                  Unidade Hospitalar
                </Text>
                <Picker
                  style={{ color: "#999" }}
                  selectedValue={formDataMedical.hospital}
                  onValueChange={(text) =>
                    setFormDataMedical({ ...formDataMedical, hospital: text })
                  }
                  className="border border-zinc-300 rounded-lg px-4 py-3"
                >
                  <Picker.Item label="Selecione o desejado" value="" />
                  {hospitals.map((type) => (
                    <Picker.Item key={type} label={type} value={type} />
                  ))}
                </Picker>
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
                onPress={() => onSave(formDataMedical, formDataProfile)}
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
