import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenNames from "../constants/ScreenName";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigations/RootStackParamsList";
import api from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { handleLogout } from "../services/authService";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

type props = NativeStackScreenProps<
  RootStackParamsList,
  ScreenNames.AdminMainScreen
>;

const AdminMainScreen = ({ navigation, route }: props) => {
  const adminData = {
    totalDoctors: 24,
    totalPatients: 156,
    activeAppointments: 18,
    newRegistrations: 12,
    // recentDoctors: [
    //   { id: 1, name: "Dr. Ana Sousa", specialty: "Oncologista" },
    //   { id: 2, name: "Dr. Pedro Martins", specialty: "Radioterapia" },
    // ],
    // recentPatients: [
    //   { id: 1, name: "Maria Silva", lastAppointment: "15/05/2024" },
    //   { id: 2, name: "João Ferreira", lastAppointment: "14/05/2024" },
    // ],
  };
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState([
    {
      totalAppointments: 0,
    },
  ]);
  const [recentDoctors, setRecentDoctors] = useState([
    {
      id: "",
      username: "",
      email: "",
      typeUser: "",
      active: true,
      password: "",
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: "",
      updatedAt: "",
      notifications: [],
      tags: [],
    },
  ]);
  const [recentPatients, setRecentPatients] = useState([
    {
      id: "",
      username: "",
      email: "",
      typeUser: "",
      active: true,
      password: "",
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: "",
      updatedAt: "",
      notifications: [],
      tags: [],
    },
  ]);

  const fetchUsers = async () => {
    await api
      .get("/users/all")
      .then(({ data: res }) => {
        setPatientCount(res.data[2].patients.length);
        setDoctorCount(res.data[3].doctors.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAppointments = async () => {
    await api
      .get("/appointments/count")
      .then(({ data: res }) => {
        setAppointmentCount(res.data);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const lastUsersRegistered = async () => {
    await api
      .get("/users/lastUsersRegistered")
      .then(({ data: res }) => {
        setRecentDoctors(res.data.lastTwoDoctors);
        setRecentPatients(res.data.lastTwoPatients);
        console.log("last users", res.data.lastTwoDoctors);
        console.log("last patients", res.data.lastTwoPatients);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      // Essa função é chamada sempre que a tela ganha foco
      fetchUsers();
      fetchAppointments();
      lastUsersRegistered();
      return () => {
        // Opcional: código quando sai da tela
      };
    }, [])
  );

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      <View className="flex-row justify-start items-strech gap-3 bg-blue-500 w-full pt-10 px-5 h-56">
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            alignContent: "center",
            borderWidth: 2,
            borderColor: "#fff",
            backgroundColor: "#ccc",
          }}
          source={require("../../assets/admin.png")}
        />
        <View
          className="flex-row justify-between items-stretch w-full"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <View className="flex-col justify-stretch items-start w">
            <Text className="text-lg font-bold text-white/50">
              Conta Restrita
            </Text>
            <Text className="text-base font-semibold text-white/70">admin</Text>
            <Text className="text-base font-bold text-white/70">
              admin@gmail.com
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileAdminScreen", { title: "ssd" })
              }
              className=" mt-2 p-3 bg-white/30 rounded-lg text-lg flex-row gap-1 items-center"
            >
              <Text className="text-white">Meu Perfil</Text>
              <Icon name="chevron-forward-outline" color={"#fff"} size={10} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await handleLogout();
                navigation.navigate("Login", { title: "ssd" });
              }}
              className=" mt-2 p-2 bg-white/30 rounded-lg text-lg flex-row gap-1 items-center"
            >
              <Text className="text-[#f87171]" style={{ color: "#f87171" }}>
                Sair
              </Text>
              <Icon name="log-out-outline" color={"#f87171"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="p-4">
        <View className="flex-row  justify-between gap-4 mb-6 ">
          <MetricCard
            icon="medkit-outline"
            value={doctorCount}
            label="Médicos"
            color="bg-stone-500"
          />
          <MetricCard
            icon="people-outline"
            value={patientCount}
            label="Pacientes"
            color="bg-black"
          />
        </View>

        <View className="flex-row flex-wrap justify-between gap-4 mb-6 ">
          <View
            className={`${"bg-blue-500"} rounded-xl p-4 w-[48%] aspect-square`}
          >
            <View className="bg-white/20 rounded-full w-14 h-14 items-center justify-center mb-2">
              <Icon name={"calendar-outline"} size={40} color="white" />
            </View>
            <Text className="text-white text-4xl font-bold">
              {appointmentCount[0].totalAppointments}
            </Text>
            <Text className="text-white/90 text-2xl">{"Consultas"}</Text>
          </View>
        </View>

        <Text className="text-lg font-bold text-black mb-3">Ações Rápidas</Text>
        <View className="flex-row flex-wrap gap-3 mb-6">
          <ActionButton
            icon="plus-circle-outline"
            label="Reactivar Usuário"
            onPress={() =>
              navigation.navigate("ActivateUserScreen", { title: "" })
            }
          />
          <ActionButton
            icon="remove-circle-outline"
            label="Banir Usuário"
            onPress={() => navigation.navigate("BanUserScreen", { title: "" })}
          />
          {/* 
          <ActionButton
            icon="document-text-outline"
            label="Gerar Relatório"
            onPress={() =>
              navigation.navigate("GenerateReportScreen", { title: "" })
            }
          />

          <ActionButton
            icon="alert-circle-outline"
            label="Enviar Alerta"
            onPress={() =>
              navigation.navigate("SendAlertScreen", { title: "" })
            }
          /> */}

          {/* 5. Atualizar Estoque */}
          <ActionButton
            icon="cube-outline"
            label="Criar categoria de dicas"
            onPress={() =>
              navigation.navigate("AddTipsCategoryScreen", { title: "" })
            }
          />

          {/* 7. Criar Grupo */}
          <ActionButton
            icon="people-circle-outline"
            label="Atribuir Paciente"
            onPress={() =>
              navigation.navigate("CreateGroupScreen", { title: "" })
            }
          />
        </View>

        <View className=" rounded-xl p-4 mb-6">
          <Text className="text-lg font-bold text-black ">
            Novos Usuários no Quimiocare (Mês)
          </Text>
          <View className="bg-white rounded-lg p-4 pb-0 items-center justify-center">
            <View className=" p-5 pt-0">
              <BarChart
                data={{
                  labels: ["Dez", "Jan", "Feb", "Mar", "Abr", "Mai"],
                  datasets: [
                    {
                      data: [34, 12, 44, 89, 12, 33],
                    },
                  ],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#3b82f6",
                  backgroundGradientFrom: "#3b82f6",
                  backgroundGradientTo: "#3b82f6",
                  // decimalPlaces: , // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 0,
                    padding: 10,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                // bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 0,
                }}
              />
            </View>
          </View>
        </View>

        <View className="flex-row gap-4 mb-6">
          <RecentList
            title="Médicos Recentes"
            data={recentDoctors}
            icon="medkit-outline"
            onPress={() => {
              navigation.navigate("AllDoctorsScreen", { title: "Doutores" });
            }}
          />
          <RecentList
            title="Pacientes Recentes"
            data={recentPatients}
            icon="person-outline"
            onPress={() => {
              navigation.navigate("AllPatientsScreen", { title: "Pacientes" });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const MetricCard = ({
  icon,
  value,
  label,
  color,
}: {
  icon: any;
  value: any;
  label: any;
  color: any;
}) => (
  <View className={`${color} rounded-xl p-4 w-[48%] aspect-square`}>
    <View className="bg-white/20 rounded-full w-14 h-14 items-center justify-center mb-2">
      <Icon name={icon} size={40} color="white" />
    </View>
    <Text className="text-white text-4xl font-bold">{value}</Text>
    <Text className="text-white/90 text-2xl">{label}</Text>
  </View>
);

const ActionButton = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: any;
  onPress: any;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-zinc-100 rounded-lg p-4 flex-row items-center w-[48%]"
  >
    <Icon name={icon} size={20} color="#3B82F6" className="mr-2" />
    <Text className="text-black">{label}</Text>
  </TouchableOpacity>
);

const RecentList = ({
  title,
  data,
  icon,
  onPress,
}: {
  title: any;
  data: any;
  icon: any;
  onPress: any;
}) => (
  <View className="bg-zinc-100 rounded-xl p-4 flex-1 mb-20">
    <Text className="text-lg font-bold text-black mb-3">{title}</Text>
    {data &&
      data.map((item: any) => (
        <View
          key={item.id}
          className="flex-row items-center py-2 border-b border-zinc-200"
        >
          <Icon name={icon} size={18} color="#3B82F6" className="mr-2" />
          <View>
            <Text className="text-black">{item.username}</Text>
            <Text className="text-zinc-500 text-sm">
              {item.createdAt.split("T")[0]}
            </Text>
          </View>
        </View>
      ))}

    {data == false && (
      <TouchableOpacity className="p-4 bg-zinc-50 shadow-lg rounded-lg flex-row  justify-center items-center mb-3 ">
        <Text className="text-blue-500  text-base text-center">
          Sem nova notificações disponível!
        </Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={onPress} className="mt-2 flex-row items-center">
      <Text className="text-blue-500 text-sm">Ver todos</Text>
      <Icon
        name="chevron-forward-outline"
        size={16}
        color="#3B82F6"
        className="ml-1"
      />
    </TouchableOpacity>
  </View>
);

export default AdminMainScreen;
