import "./global.css";
import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { expo } from "./app.json";
import { TailwindProvider } from "tailwindcss-react-native";
import { ThemeProvider } from "./src/helpers/theme-context";
import Routes from "./src/routes";
import { ThemeContext } from "@react-navigation/native";

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
    <ThemeProvider>
      <TailwindProvider>
        <PaperProvider theme={theme}>
          <Routes />
        </PaperProvider>
      </TailwindProvider>
    </ThemeProvider>
  );
}
