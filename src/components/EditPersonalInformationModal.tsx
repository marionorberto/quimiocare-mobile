import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type props = {
  isVisible: boolean;
  userData: {
    id: string;
    username: string;
    email: string;
    typeUser: string;
    createdAt: Date;
    updatedAt: Date;
  };
  profileData: {
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
  onSave: any;
  onClose: any;
};

const EditPersonalInformationModal = ({
  isVisible,
  userData,
  profileData,
  onSave,
  onClose,
}: props) => {
  const [formDataUser, setFormDataUser] = useState<{
    id: string;
    username: string;
    email: string;
    typeUser: string;
    createdAt: Date;
    updatedAt: Date;
  }>(userData);
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
  }>(profileData);

  useEffect(() => {
    setFormDataUser(userData);
    setFormDataProfile(profileData);
  }, [userData, profileData]);

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
              <Text className="text-base text-zinc-400">username</Text>
              <TextInput
                value={formDataUser?.username}
                onChangeText={(text) =>
                  setFormDataUser({ ...formDataUser, username: text })
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
                value={formDataUser.email}
                onChangeText={(text) =>
                  setFormDataUser({ ...formDataUser, email: text })
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
                value={formDataProfile.phoneNumber}
                onChangeText={(text) =>
                  setFormDataProfile({ ...formDataProfile, phoneNumber: text })
                }
                className="text-base text-zinc-800 border-b-2 border-zinc-400 p-2"
              />
            </View>
          </View>
          <View className="flex-row justify-start items-center gap-2 mt-3">
            <Icon name="location-outline" color={"black"} size={20} />
            <View className="flex-1">
              <Text className="text-base text-zinc-400">Endereço</Text>
              <TextInput
                value={formDataProfile.address}
                onChangeText={(text) =>
                  setFormDataProfile({ ...formDataProfile, address: text })
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
              onPress={() => onSave(formDataUser, formDataProfile)}
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

export default EditPersonalInformationModal;
