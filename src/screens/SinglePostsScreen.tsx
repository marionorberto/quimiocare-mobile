import {
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Contants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenNames from "../constants/ScreenName";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import CheckBox from "expo-checkbox";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.SinglePostsScreen
>;

const SinglePostsScreen = ({ route, navigation }: props) => {
  const [agreed, setAgreed] = useState(true);

  return (
    <View
      style={{ marginTop: Contants.statusBarHeight }}
      className="flex-col justify-center items-stretch w-full px-4 pt-8 pb-10"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-start items-center gap-10">
          <View className="border-[1px] border-zinc-200 p-[3px] rounded-md bg-white">
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-back-outline"
                size={20}
                color={"#505050"}
              ></Icon>
            </Pressable>
          </View>
          <Text className="text-xl self-center text-center text-black font-bold">
            Single Post
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SinglePostsScreen;
