export type BottomTabParamList = {
  Main: {
    idUser: string,
    username: string,
    typeUser: string,
  };
  Notification: undefined;
  Community: undefined;
  Profile: undefined;
  Medical: undefined;
  Login: undefined;
  Setting: undefined;
  Policy: undefined;
  Terms: undefined;
  Faq: undefined;
  Library: undefined,
  Booking: undefined,
  MainMedicoScreen: {
    idUser: string,
    username: string,
    typeUser: string,
  },
  ProfileMedicoScreen: undefined,
  CreatePostScreen: undefined,
  ActivityRegisterScreen: undefined,
  CreateQuestionScreen: undefined,
  settingsDoctorScreen: undefined,
  settingsDoctor: undefined,
  CommunityScreen: undefined
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
