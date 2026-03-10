import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color scheme: Red and Dark Blue
        primary: {
          50: "#fee2e0",
          100: "#fcc5c0",
          200: "#f9a8a1",
          300: "#f68b82",
          400: "#f36e62",
          500: "#e1150e", // Main Red rgb(225,21,14)
          600: "#cc1209",
          700: "#b70f07",
          800: "#a20d06",
          900: "#8d0a04",
        },
        secondary: {
          50: "#f0f4f8",
          100: "#dde8f1",
          200: "#bbd1e3",
          300: "#99bad5",
          400: "#77a3c7",
          500: "#08642e", // Main Dark Blue rgb(8,44,78)
          600: "#073d6d",
          700: "#062d4f",
          800: "#051d37",
          900: "#040d1f",
        },
        accent: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Neutral grays
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--color-text-primary)",
            a: {
              color: "var(--color-primary)",
              "&:hover": {
                color: "var(--color-primary-dark)",
              },
            },
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-soft": "pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
      },
      spacing: {
        "safe-top": "max(1rem, env(safe-area-inset-top))",
        "safe-bottom": "max(1rem, env(safe-area-inset-bottom))",
        "safe-left": "max(1rem, env(safe-area-inset-left))",
        "safe-right": "max(1rem, env(safe-area-inset-right))",
      },
      transitionTimingFunction: {
        "btn-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
