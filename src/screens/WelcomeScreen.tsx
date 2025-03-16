import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const WelcomeScreen = ({ route, navigation }: props) => {
  const navigationScreen = useNavigation();

  return (
    <View
      style={styles.container}
      className="bg-blue-500 h-full w-full relative"
    >
      {/* <LinearGradient colors={["#48c6ef", "#6f86d6"]} /> */}
      <Image
        contentFit="cover"
        transition={1000}
        source={require("../../assets/welcome.svg")}
        style={{ width: 350, height: 280 }}
      />

      <View className="rounded-t-[2rem] p-3 absolute bottom-0 right-0 left-0 h-40 bg-white">
        <TouchableOpacity
          className="px-9 py-6 mt-10 rounded-xl flex gap-1 items-center bg-blue-500"
          onPress={() =>
            navigation.navigate(ScreenNames.Home, { title: "Home" })
          }
        >
          <Text className="text-white font-semibold text-lg">
            Vamos Começar{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
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
