import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./navigations/tabs.routes";
import StackRoutes from "./navigations/stack.routes";

const Routes = () => {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
};

export default Routes;
