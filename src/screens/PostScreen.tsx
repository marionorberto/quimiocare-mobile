import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Contants from "expo-constants";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const PostScreen = ({ route, navigation }: props) => {
  const [email, setEmail] = useState("");

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-1 justify-center items-stretch px-10 pt-6 pb-8"
    >
      <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white w-8 text-center">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={22} color={"#505050"}></Icon>
        </Pressable>
      </View>
      <Text className="text-5xl text-zinc-900 py-5">Post single page!</Text>
      <ScrollView>
        <View>
          <View>
            <Text>Título</Text>
            <TextInput />
            <Text>mensagem</Text>
          </View>
          <View>
            <Text>Upload o poster</Text>
            <TextInput />
            <Text>mensagem</Text>
          </View>

          <View>
            <Text>Tags*</Text>
            <Text>Duas ao máximo</Text>
            <TextInput />
            <Text>mensagem</Text>
          </View>
          <Text>Seccão 1</Text>
          <View>
            <Text>Subtítulo</Text>
            <TextInput placeholder="subtítulo" />
            <Text>mensagem</Text>
          </View>
          <View>
            <Text>upload imagem(opcional)</Text>
            <TextInput placeholder="subtítulo" />
            <Text>mensagem</Text>
          </View>
          <View>
            <TextInput placeholder="conteudo"></TextInput>
          </View>
          <TouchableOpacity>
            <Text>Adicionar Seccão da postagem </Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Submeter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostScreen;
