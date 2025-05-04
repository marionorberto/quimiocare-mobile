import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Contants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import { faqQuestions } from "../constants/data";

type props = NativeStackScreenProps<RootStackParamsList, ScreenNames>;

const faqs = faqQuestions;

const FaqScreen = ({ route, navigation }: props) => {
  const [agreed, setAgreed] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full px-4 pt-8 pb-10"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-start items-center gap-10">
          <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-outline" size={20} color={"#505050"} />
            </Pressable>
          </View>
          <Text className="text-xl self-center text-center text-black font-bold">
            Perguntas Frequentes
          </Text>
        </View>
        <View className="mt-6 px-4">
          <Text className="text-black text-2xl font-bold mb-4 text-center">
            FAQs - Perguntas Frequentes
          </Text>

          {faqs.map((faq, index) => (
            <View key={index} className="mb-3 border-b border-gray-300 pb-3">
              <TouchableOpacity
                onPress={() => toggleFAQ(index)}
                className="flex-row justify-between items-center py-3"
              >
                <Text className="text-black text-lg font-semibold">
                  {faq.question}
                </Text>
                <Text className="text-blue-500 text-xl">
                  {expandedIndex === index ? "-" : "+"}
                </Text>
              </TouchableOpacity>

              {expandedIndex === index && (
                <Text className="text-gray-700 mt-2">{faq.answer}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default FaqScreen;
