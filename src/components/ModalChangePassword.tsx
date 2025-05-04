import {
  View,
  Text,
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";

type props = ModalProps & {
  isOpen: boolean;
  withInput: boolean;
  atualPassword: string;
  newPassword: string;
};

const ModalChangePassword = ({
  isOpen,
  withInput,
  children,
  ...rest
}: props) => {
  const [atualPasswordForUpdate, setAtualPassword] = useState("");
  const [newPasswordForUpdate, setNewPassword] = useState("");

  const onSave = (atualPassword: string, newPassword: string) => {
    alert(`${atualPassword} ${newPassword}`);
  };

  const content = withInput ? (
    <KeyboardAvoidingView className="flex-1 justify-center items-center p-3 bg-zinc-900/40">
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View className="flex-1 justify-center items-center p-3 bg-zinc-900/40">
      {children}
    </View>
  );

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <View className="flex-1 justify-center items-center p-3 bg-zinc-900/40">
        <View className="p-6 bg-white rounded-2xl w-full max-w-md shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-zinc-900">
              Atualizar Password
            </Text>
          </View>
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-2 mb-3"
            placeholder="Ex: Náusea, Fadiga..."
            value={atualPasswordForUpdate}
            onChangeText={setAtualPassword}
          />
          <TextInput
            className="border border-zinc-300 rounded-lg px-4 py-2 mb-3 h-20"
            placeholder="Detalhe os sintomas, duração, intensidade..."
            multiline
            value={newPasswordForUpdate}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 mt-2 flex-row items-center justify-center"
            onPress={() => onSave(atualPasswordForUpdate, newPasswordForUpdate)}
          >
            <Text className="text-white text-center font-semibold">
              Atualizar Senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
};

export default ModalChangePassword;
