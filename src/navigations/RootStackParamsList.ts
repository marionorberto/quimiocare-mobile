type  HomeScreenParams = {
  title: string;
}

type  SettingScreenParams = {
  title: string;
  description: string;
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

export type RootStackParamsList = {
  Home: HomeScreenParams;
  Setting: SettingScreenParams;
  Welcome: WelcomeScreenParams;
  Login: LoginScreenParams;
  Register: HomeScreenParams;
  Landing: LandingScreenParams;
  Forgot: ForgotScreenParams;
  Main: MainScreenParams;
  Notification: NotificationScreenParams;
  Profile: ProfileScreenParams;
  Community: CommunityScreenParams;
  Medical: MedicalScreenParams;
  VerificationPassword: VerificationPasswordScreenParams;
}
