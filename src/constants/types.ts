export type BottomTabParamList = {
  Main: undefined;
  Notification: undefined;
  Community: undefined;
  Profile: undefined;
  Medical: undefined;
  Login: undefined;
  Setting: undefined;
  Policy: undefined;
  Terms: undefined;
  About: undefined;
  Faq: undefined;
  History: undefined;
  Report: undefined;
  Library: undefined,
  Booking: undefined,
  RedefinirPassword: undefined,
  MainMedicoScreen: undefined,
  ProfileMedicoScreen: undefined,
  CreatePostScreen: undefined,
  ActivityRegisterScreen: undefined,
  ExportarRelatorio: undefined,
  CreateQuestionScreen: undefined,
  MyQuestionScreen: undefined,
};

export type onSaveDateMedication = {
  medicationName: string,
  dosage: string,
  notes: string,
  reminderTime: Date
}

export type ProfileTagType = {
  description: string
}
