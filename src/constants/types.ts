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
