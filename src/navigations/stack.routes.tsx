import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import registerScreen from "../screens/registerScreen";
import LandingScreen from "../screens/LandingScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import TabRoutes from "./tabs.routes";
import VerificationPasswordScreen from "../screens/VerificationPasswordScreen";
import NotificatioScreen from "../screens/NotificatioScreen";
import PolicyScreen from "../screens/PolicyScreen";
import TermsScreen from "../screens/TermsScreen";
import AboutScreen from "../screens/AboutScreen";
import FaqScreen from "../screens/FaqScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ReportScreen from "../screens/ReportScreen";
import BookingScreen from "../screens/BookingScreen";
import SymptomScreen from "../screens/SymptomScreen";
import MedicationScreen from "../screens/MedicationScreen";
import ChooseUserScreen from "../screens/ChooseUserScreen";
import GatherProfileFirstScreen from "../screens/GatherProfileFirstScreen";
import GatherProfileSecondScreen from "../screens/GatherProfileSecondScreen";

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
        name={ScreenNames.Policy}
        component={PolicyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Terms}
        component={TermsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.About}
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Faq}
        component={FaqScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.History}
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Report}
        component={ReportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Booking}
        component={BookingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Symptom}
        component={SymptomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.Medication}
        component={MedicationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.ChooseUserScreen}
        component={ChooseUserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.GatherProfileFirstScreen}
        component={GatherProfileFirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.GatherProfileSecondScreen}
        component={GatherProfileSecondScreen}
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
