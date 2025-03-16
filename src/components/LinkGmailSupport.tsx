import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Image } from "expo-image";

const openEmail = () => {
  const email = "marionorberto2018@gmail.com";
  const subject = "Ajuda com o QuimioCare";
  const body = "Olá, preciso de suporte para...";
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  Linking.openURL(url).catch((err) => alert("Não foi possível abrir o e-mail"));
};

const EmailButton = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        onPress={openEmail}
        className="bg-zinc-200/50 px-6 py-3 rounded-lg w-full flex-row justify-start items-center gap-2"
      >
        <Image
          style={{
            width: 25,
            height: 25,
            borderRadius: 50,
            alignContent: "center",
            borderWidth: 2,
            borderColor: "#fff",
            backgroundColor: "#ccc",
          }}
          source={require("../../assets/gmail-icon.png")}
        />
        <Text className=" text-lg font-semibold text-zinc-800">
          Suporte pelo Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailButton;
