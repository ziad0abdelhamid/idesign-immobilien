import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";
type Language = "en" | "de";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "theme-storage",
      skipHydration: true,
    },
  ),
);

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "de",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
      skipHydration: true,
    },
  ),
);
