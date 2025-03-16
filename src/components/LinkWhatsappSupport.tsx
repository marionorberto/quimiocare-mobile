import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Image } from "expo-image";

const openWhatsApp = () => {
  const phoneNumber = "935327990"; //
  const message = "Olá, preciso de ajuda do uma questão no App QuimioCare!";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch((err) =>
    alert("Não foi possívbel abrir o WhatsApp")
  );
};

const WhatsAppButton = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        onPress={openWhatsApp}
        className="bg-zinc-200/50 px-6 py-3 rounded-lg w-full text-zinc-800 flex-row justify-start gap-2"
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
          source={require("../../assets/whatsapp-icon.png")}
        />
        <Text className="text-lg font-semibold text-zinc-800">
          Fale no WhatsApp!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WhatsAppButton;
