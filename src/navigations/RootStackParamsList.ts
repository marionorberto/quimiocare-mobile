type  HomeScreenParams = {
  title: string;
}

type  SettingScreenParams = {
  title: string;
}

type  WelcomeScreenParams = {
  title: string;
  description: string;
}

type  LoginScreenParams = {
  title: string;
}

type  RegisterScreenParams = {
  title: string;
  userType: string;
}

type  LandingScreenParams = {
  title: string;
}

type  ForgotScreenParams = {
  title: string;
}

type  MainScreenParams = {
  title: string;
}

type  NotificationScreenParams = {
  title: string;
}

type  ProfileScreenParams = {
  title: string;
}

type  CommunityScreenParams = {
  title: string;
}

type  MedicalScreenParams = {
  title: string;
}

type  VerificationPasswordScreenParams = {
  title: string;
}

type  TermsScreenParams = {
  title: string;
}

type  PolicyScreenParams = {
  title: string;
}

type  AboutScreenParams = {
  title: string;
}

type  FaqScreenParams = {
  title: string;
}

type  LibraryScreenParams = {
  title: string;
}

type  ReportScreenParams = {
  title: string;
}

type  HistoryScreenParams = {
  title: string;
}

type  BookingScreenParams = {
  title: string;
}

type  SymptomsScreenParams = {
  title: string;
}

type  MedicationscreenParams = {
  title: string;
}

type  ChooseUserScreen = {
  title: string;
}

type  GatherProfileFirstScreen = {
  title: string;
}

type  GatherProfileSecondScreen = {
  title: string;
}

type  RedefinePasswordScreen = {
  title: string;
}

type  BookSinglePageScreen = {
  title: string;
  art: any;
}

type  PostSingleScreen = {
  title: string;
}

type  ArticleScreen = {
  title: string;
}


type  CreateAppointmentScreen = {
  title: string;
}
type  CreateMedicationScreen = {
  title: string;
}

type CreateSymptomScreen = {
  title: string;
}

type AskReplyScreen = {
  title: string;
}

export type RootStackParamsList = {
  Home: HomeScreenParams;
  Setting: SettingScreenParams;
  Welcome: WelcomeScreenParams;
  Login: LoginScreenParams;
  Register: RegisterScreenParams;
  Landing: LandingScreenParams;
  Forgot: ForgotScreenParams;
  Main: MainScreenParams;
  Notification: NotificationScreenParams;
  Profile: ProfileScreenParams;
  Community: CommunityScreenParams;
  Medical: MedicalScreenParams;
  VerificationPassword: VerificationPasswordScreenParams;
  Policy: PolicyScreenParams;
  Terms: TermsScreenParams;
  About: AboutScreenParams;
  Faq: FaqScreenParams;
  Library: LibraryScreenParams;
  History: HistoryScreenParams;
  Report: ReportScreenParams;
  Booking: BookingScreenParams;
  Medication: MedicationscreenParams;
  Symptom: SymptomsScreenParams;
  ChooseUserScreen: ChooseUserScreen,
  GatherProfileFirstScreen: GatherProfileFirstScreen,
  GatherProfileSecondScreen: GatherProfileSecondScreen,
  RedefinePasswordScreen: RedefinePasswordScreen,
  BookSinglePageScreen: BookSinglePageScreen,
  PostSingleScreen: PostSingleScreen,
  ArticleScreen: ArticleScreen
  CreateMedicationScreen: CreateMedicationScreen
  CreateSymptomScreen: CreateSymptomScreen
  CreateAppointmentScreen: CreateAppointmentScreen
  AskReplyScreen: AskReplyScreen
}
