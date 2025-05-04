import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { Medication } from "./storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  }),
});

export async function registerForPushNotificationAsync() : Promise<string|null> {
  let token:  string | null = null;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  try {
    const response = await Notifications.getExpoPushTokenAsync();
    token = response.data;

    if(Platform.OS = 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#1a8e2d'
      })
    }

    return token;
  } catch (error) {
    console.error("error getting push token:", error);
    throw null;
  }
}

export async function scheduleMedicationReminder(medication:  Medication): Promise<string | undefined> {
  // if (!medication.reminderEnable) return;

  try {
  
      const [hour, minute] = medication.reminderTime.toLocaleTimeString().split(":").map(Number);
      const today = new Date();
      today.setHours(hour, minute, 0, 0);
       
      if (today < new Date() ) {
        today.setDate(today.getDate() + 1);
      }

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete de Remédio",
          subtitle: 'Hora para tomar a sua remédio',
          body: `Horário ${medication.medicationName} ${medication.dosage}`,
          data: { medicationId: medication.medicationName },
        },
        trigger: {
          hour: hour,
          minute: minute,
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
        }
      });

      return identifier;
    
  } catch (error) {
    console.error(" error agendando lembrete de medicaco", error);
    return undefined;
  }
}


export async function cancelScheduleMedicationReminder(medicationId:  string): Promise<void> {
  try {
    const scheduleNotifications = await Notifications.getAllScheduledNotificationsAsync();

    for (const notification of scheduleNotifications) {
      const data = notification.content.data as  {
        medicationId: string;
      } | null;

      if (data?.medicationId === medicationId) {
        await Notifications.cancelScheduledNotificationAsync(
          notification.identifier
        );
      }

    }
  } catch (error) {
    console.error(" error cancelar lembrete de medicaco", error);
  }
}

export async function updateScheduleMedicationReminder(medication:  Medication): Promise<void> {
  try {
    await cancelScheduleMedicationReminder(medication.medicationName);  

    await scheduleMedicationReminder(medication);
  } catch (error) { 
    console.error(" error updating lembrete de medicaco", error);
  }
}