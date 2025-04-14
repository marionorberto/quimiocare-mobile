import AsyncStorage from "@react-native-async-storage/async-storage";

const MEDICATION_KEY = "@medications";
const DOSE_HISTORY_KEY = "@dose_history";

export interface Medication  {
  // id: string;
  medicationName: string;
  dosage: string;
  // duration: string,
  // startDate: string;
  // times: string[];
  // times: "";
  // totalSupply: number;
  // refillAt: Date;
  // refillReminder: Date;
  // lastRefillDate: Date
  reminderTime: Date;
  // reminderEnable: boolean;
}

export async function getMedication() :Promise<Medication[]>{
  try {
    const data = await AsyncStorage.getItem(MEDICATION_KEY);
    return data ? JSON.parse(data): [];
  } catch (error) {
    console.error('it was not able to getting medication');
    throw error;
  }
}

export async function addMedication(medication: Medication): Promise<void> {
  try {
    const medicationFromStorage = await getMedication();
    medicationFromStorage.push(medication);
    await AsyncStorage.setItem(MEDICATION_KEY, JSON.stringify(medicationFromStorage));
  } catch(error: any) {
    console.error('it was not able to add medication');
    throw error;
  }
}