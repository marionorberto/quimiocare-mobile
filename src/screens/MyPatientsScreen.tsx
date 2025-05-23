import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../helpers/theme-context";
import { API_URL, API_URL_UPLOAD } from "../constants/data";
import api from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import ScreenNames from "../constants/ScreenName";
import Constants from "expo-constants";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.MyPatientsScreen
>;

const MyPatientsScreen = ({ navigation }: props) => {
  const { theme } = useTheme();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findAllPatientsFromDoctor();
  }, []);

  const findAllPatientsFromDoctor = async () => {
    await api
      .get("/my-patients/doctor/patients")
      .then(({ data: res }) => {
        setPatients(res.data);
      })
      .catch((err: any) => {
        Alert.alert("🚫Erro Carregando pacientes", err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openWhatsApp = (phoneNumber: string) => {
    const formattedNumber = phoneNumber.replace(/[^\d]/g, "");
    const url = `https://wa.me/${formattedNumber}`;
    Linking.openURL(url).catch(() =>
      alert("Não foi possível abrir o WhatsApp")
    );
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>
            <Icon
              name="arrow-back"
              size={24}
              color={theme === "dark" ? "white" : "black"}
            />
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, theme === "dark" && styles.darkText]}>
          Meus Pacientes
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>
            <ActivityIndicator size="large" color="#3B82F6" />
          </Text>
        </View>
      ) : patients.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>
            <Icon name="people-outline" size={60} color="#9CA3AF" />
          </Text>
          <Text style={[styles.emptyText, theme === "dark" && styles.darkText]}>
            Nenhum paciente vinculado
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.patientsContainer}>
          {patients.map((patient) => (
            <View
              key={patient.id}
              style={[styles.patientCard, theme === "dark" && styles.darkCard]}
            >
              <Image
                source={{
                  uri: `http://${API_URL_UPLOAD}:3000/${patient.imgUrl}`,
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "#fff",
                  backgroundColor: "#ccc",
                }}
              />

              <View style={styles.patientInfo}>
                <Text
                  style={[
                    styles.patientName,
                    theme === "dark" && styles.darkText,
                  ]}
                >
                  {patient.username}
                </Text>

                <View style={styles.infoRow}>
                  <Text>
                    <Icon name="mail-outline" size={16} color="#6B7280" />
                  </Text>
                  <Text
                    style={[
                      styles.infoText,
                      theme === "dark" && styles.darkText,
                    ]}
                  >
                    {patient.email}
                  </Text>
                </View>

                {/* <View style={styles.infoRow}>
                  <Text>
                    <Icon name="location-outline" size={16} color="#6B7280" />
                  </Text>
                  <Text
                    style={[
                      styles.infoText,
                      theme === "dark" && styles.darkText,
                    ]}
                  >
                    {patient.address || "Endereço não informado"}
                  </Text>
                </View> */}

                <View style={styles.infoRow}>
                  <Icon name="medical-outline" size={16} color="#6B7280" />
                  <Text
                    style={[
                      styles.infoText,
                      theme === "dark" && styles.darkText,
                    ]}
                  >
                    {patient.tags.description ||
                      "Tipo de câncer não especificado"}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text>
                    <Icon name="call-outline" size={16} color="#6B7280" />
                  </Text>
                  <Text
                    style={[
                      styles.infoText,
                      theme === "dark" && styles.darkText,
                    ]}
                  >
                    {patient.phoneNumber}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => openWhatsApp(patient.phoneNumber)}
              >
                <Text>
                  <Icon name="logo-whatsapp" size={24} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: Constants.statusBarHeight,
  },
  darkContainer: {
    backgroundColor: "#111827",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  darkHeader: {
    borderBottomColor: "#374151",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  darkText: {
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
  },
  patientsContainer: {
    padding: 16,
  },
  patientCard: {
    backgroundColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: "#1f2937",
    shadowColor: "#000",
  },
  patientPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 8,
    color: "#4b5563",
    fontSize: 14,
  },
  whatsappButton: {
    backgroundColor: "#25D366",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});

export default MyPatientsScreen;
