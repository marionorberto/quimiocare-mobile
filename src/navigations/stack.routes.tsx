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
import RedefineScreenPassword from "../screens/RedefinePassword";
import BookSinglePageScreen from "../screens/BookSinglePage";
import PostSingleScreen from "../screens/PostSingleScreen";
import ArticleScreen from "../screens/ArticleScreen";
import CreateMedicationScreen from "../screens/CreateMedicationScreen";
import CreateAppointmentScreen from "../screens/CreateAppointmentScreen";
import MedicalScreen from "../screens/MedicalScreen";
import DailyScreen from "../screens/DailScreen";
import MainScreen from "../screens/MainScreen";
import AdminMainScreen from "../screens/AdminMainScreen";
import AnalisesScreen from "../screens/AnalisesScreen";
import AutorizationScreen from "../screens/AutorizationScreen";
import OptionsAdmincreen from "../screens/OptionsAdminScreen";
import MainMedicoScreen from "../screens/MainMedicoScreen";
import MyPostsScreen from "../screens/MyPostsScreen";
import SinglePostsScreen from "../screens/SinglePostsScreen";
import QuestionScreen from "../screens/QuestionScreen";
import ProfileAdminScreen from "../screens/ProfileAdminScreen";
import GatherDoctorProfileFirstScreen from "../screens/GatherDoctorProfileFirstScreen";
import MyTipsScreen from "../screens/MyTipsScreen";
import SuggestVideoScreen from "../screens/SuggestVideoScreen";
import TabDoctorRoutes from "./tabs.routes-doctor";
import CreatePostScreen from "../screens/CreatePostScreen";
import ActivityRegisterScreen from "../screens/ActivityRegisterScreen";
import ExportarRelatorio from "../screens/receitasScreen";
import CreateQuestionScreen from "../screens/CreateQuestionScreen";
import MyQuestionScreen from "../screens/MyQuestionScreen";
import MyDoctorScreen from "../screens/MyDoctor";
import BanUserScreen from "../screens/BanUserScreen";
import AllDoctorsScreen from "../screens/AllDoctorsScreen";
import AllPatientsScreen from "../screens/AllPatientsScreen";

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
        name={ScreenNames.GatherDoctorProfileFirstScreen}
        component={GatherDoctorProfileFirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.RedefinePasswordScreen}
        component={RedefineScreenPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.BookSinglePageScreen}
        component={BookSinglePageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.PostSingleScreen}
        component={PostSingleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.ArticleScreen}
        component={ArticleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.CreateMedicationScreen}
        component={CreateMedicationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.AutorizationScreen}
        component={AutorizationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.AnalisesScreen}
        component={AnalisesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.AdminMainScreen}
        component={AdminMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.DailyScreen}
        component={DailyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.SinglePostsScreen}
        component={SinglePostsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.MyPostsScreen}
        component={MyPostsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.OptionsAdmincreen}
        component={OptionsAdmincreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.CreateApppoinmentScreen}
        component={CreateAppointmentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.QuestionScreen}
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.MyTipsScreen}
        component={MyTipsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.ProfileAdminScreen}
        component={ProfileAdminScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.SuggestVideoScreen}
        component={SuggestVideoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.MainMedicoScreen}
        component={TabDoctorRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.CreatePostScreen}
        component={CreatePostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.ActivityRegisterScreen}
        component={ActivityRegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.ExportarRelatorio}
        component={ExportarRelatorio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.CreateQuestionScreen}
        component={CreateQuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.MyQuestionScreen}
        component={MyQuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.MyDoctorScreen}
        component={MyDoctorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.BanUserScreen}
        component={BanUserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.AllDoctorsScreen}
        component={AllDoctorsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.AllPatientsScreen}
        component={AllPatientsScreen}
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
