import "./global.css";
import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { expo } from "./app.json";
import { TailwindProvider } from "tailwindcss-react-native";
import Routes from "./src/routes";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "blue",
  },
};

export default function App() {
  return (
    <TailwindProvider>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </TailwindProvider>
  );
}
