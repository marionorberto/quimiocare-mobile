import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./RootStackParamsList";
import ScreenNames from "../constants/ScreenName";

import HomeScreen from "../screens/HomeScreen";
import settingsScreen from "../screens/settingsScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import registerScreen from "../screens/registerScreen";
import LandingScreen from "../screens/LandingScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import MainScreen from "../screens/MainScreen";
import TabRoutes from "./tabs.routes";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/settingsScreen";
import MedicalScreen from "../screens/MedicalScreen";
import VerificationPasswordScreen from "../screens/VerificationPasswordScreen";
import NotificatioScreen from "../screens/NotificatioScreen";
import CommunityScreen from "../screens/CommunityScreen";

const StackRoutes = () => {
  const Stack = createNativeStackNavigator<RootStackParamsList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Welcome}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Register}
        component={registerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.Login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Notification}
        component={NotificatioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Landing}
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Forgot}
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.VerificationPassword}
        component={VerificationPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Main}
        component={TabRoutes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
