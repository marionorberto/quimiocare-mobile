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

type DailyScreen = {
  title: string;
}

type AdminMainScreen = {
  title: string;
}

type AnalisesScreen = {
  title: string;
}


type MainMedicoScreen = {
  title: string;
}


type AutorizationScreen = {
  title: string;
}

type MyPostsScreen = {
  title: string;
}
 

type OptionsAdminScreen = {
  title: string;
}


type SinglePostsScreen = {
  title: string;
}


type TipsMedicoScreen = {
  title: string;
}

type QuestionScreen = {
  id: string,
  question: string,
  createdAt: string,
  updatedAt: string,
  user: {
    username: string,
    typeUser: string,
  },
  imgUrl: string,
}

type GatherDoctorProfileFirstScreen = {
  title: string;
}

type GatherDoctorProfileSecondScreen = {
  title: string;
}


type ProfileAdminScreen = {
  title: string;
}

type MyTipsScreen = {
  title: string;
}

type SuggestVideoScreen = {
  title: string;
}

type ProfileMedicoScreen = {
  title: string;
}


type CreatePostScreen = {
  title: string;
}

type ActivityRegisterScreen = {
  title: string;
}

type ExportarRelatorio = {
  title: string;
}

type CreateQuestionScreen = {
  title: string;
}


type MyQuestionScreen = {
  title: string;
}

type MyDoctorScreen = {
  title: string;
}

type BanUserScreen = {
  title: string;
}

type AllDoctorsScreen = {
  title: string;
}


type AllPatientsScreen = {
  title: string;
}

type SendAlertScreen = {
  title: string;
}

type GenerateReportScreen = {
  title: string;
}

type PinAnnouncementScreen = {
  title: string;
}


type AddTipCategoryScreen = {
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
  ChooseUserScreen: ChooseUserScreen;
  GatherProfileFirstScreen: GatherProfileFirstScreen;
  GatherProfileSecondScreen: GatherProfileSecondScreen;
  RedefinePasswordScreen: RedefinePasswordScreen;
  BookSinglePageScreen: BookSinglePageScreen;
  PostSingleScreen: PostSingleScreen;
  ArticleScreen: ArticleScreen;
  CreateMedicationScreen: CreateMedicationScreen;
  CreateSymptomScreen: CreateSymptomScreen;
  CreateAppointmentScreen: CreateAppointmentScreen;
  AskReplyScreen: AskReplyScreen;
  DailyScreen: DailyScreen;
  AdminMainScreen: AdminMainScreen;
  AnalisesScreen: AnalisesScreen;
  AutorizationScreen: AutorizationScreen;
  MainMedicoScreen: MainMedicoScreen;
  MyPostsScreen: MyPostsScreen;
  OptionsAdmincreen: OptionsAdminScreen;
  SinglePostsScreen: SinglePostsScreen;
  TipsMedicoScreen: TipsMedicoScreen;
  QuestionScreen:  QuestionScreen;
  ProfileAdminScreen:  ProfileAdminScreen;
  GatherDoctorProfileFirstScreen:  GatherDoctorProfileFirstScreen;
  MyTipsScreen: MyTipsScreen;
  SuggestVideoScreen: SuggestVideoScreen;
  ProfileMedicoScreen: ProfileMedicoScreen;
  CreatePostScreen: CreatePostScreen;
  ActivityRegisterScreen: ActivityRegisterScreen;
  ExportarRelatorio: ExportarRelatorio;
  CreateQuestionScreen: CreateQuestionScreen;
  MyQuestionScreen: MyQuestionScreen;
  MyDoctorScreen: MyDoctorScreen;
  BanUserScreen: BanUserScreen;
  AllDoctorsScreen: AllDoctorsScreen;
  AllPatientsScreen: AllPatientsScreen;
  
  SendAlertScreen: SendAlertScreen;
  GenerateReportScreen: GenerateReportScreen;
  PinAnnouncementScreen: PinAnnouncementScreen;
  AddTipCategoryScreen: AddTipCategoryScreen
}
