import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const WelcomeScreen = ({ route, navigation }: props) => {
  const navigationScreen = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        contentFit="cover"
        transition={1000}
        source={require("../../assets/welcome.svg")}
        style={{ width: 350, height: 280 }}
      />
      <Text style={{ marginTop: 30, fontSize: 25, color: "#999" }}>
        Bem-Vindo ao{" "}
        <Text
          className="opacity-70"
          style={{ color: "black", fontSize: 29, fontWeight: "bold" }}
        >
          QuimioCare
        </Text>
      </Text>
      <Text style={{ fontSize: 16, color: "#ddd", marginTop: 3 }}>
        Junte-se à nossa comunidade
      </Text>
      <TouchableOpacity
        className="px-12 py-6 mt-10 bg-[#3b82f6] rounded-lg flex gap-1 items-center"
        onPress={() => navigation.navigate(ScreenNames.Home, { title: "Home" })}
      >
        <Text className="text-white font-semibold text-lg">Vamos Começar </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    color: "ccc",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
  },
  buttonStart: {
    marginTop: 45,
    paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: "#007dbd",
    color: "white",
    borderRadius: 15,
  },
});
