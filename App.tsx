import "./global.css";
import * as React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { ThemeProvider } from "./src/helpers/theme-context";
import Routes from "./src/routes";

export default function App() {
  return (
    <ThemeProvider>
      <TailwindProvider>
        <Routes />
      </TailwindProvider>
    </ThemeProvider>
  );
}
