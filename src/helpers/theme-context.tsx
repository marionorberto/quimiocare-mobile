import React, { createContext, useState, useEffect, useContext } from "react";
import { Appearance } from "react-native";
import * as SecureStore from "expo-secure-store";

// Definir tipos para o contexto
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Criar contexto com valor inicial indefinido
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provedor do Tema
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Carregar o tema salvo ao iniciar o app
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await SecureStore.getItemAsync("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      } else {
        // Pegar o tema do sistema
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme === "dark" ? "dark" : "light");
      }
    };
    loadTheme();
  }, []);

  // Alternar tema e salvar no armazenamento seguro
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await SecureStore.setItemAsync("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar o contexto do tema
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  }
  return context;
};
