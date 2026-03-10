import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colors = {
  light: {
    bg: {
      primary: "bg-white",
      secondary: "bg-neutral-50",
      tertiary: "bg-neutral-100",
    },
    text: {
      primary: "text-neutral-900",
      secondary: "text-neutral-600",
      tertiary: "text-neutral-500",
    },
    border: "border-neutral-200",
    shadow: "shadow-card",
  },
  dark: {
    bg: {
      primary: "dark:bg-neutral-900",
      secondary: "dark:bg-neutral-800",
      tertiary: "dark:bg-neutral-700",
    },
    text: {
      primary: "dark:text-neutral-50",
      secondary: "dark:text-neutral-300",
      tertiary: "dark:text-neutral-400",
    },
    border: "dark:border-neutral-700",
    shadow: "dark:shadow-glass-dark",
  },
};

export const buttonVariants = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 dark:bg-secondary-600 dark:hover:bg-secondary-700",
  outline:
    "border border-primary-500 text-primary-500 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900",
  ghost:
    "text-neutral-900 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-800",
};

export const focusRing =
  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900";

export function formatPrice(price: number, currency = "SAR"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculatePayment(
  totalPrice: number,
  downPayment: number,
  months: number = 12,
): { paid: number; remaining: number; monthly: number } {
  const paid = downPayment;
  const remaining = Math.max(0, totalPrice - downPayment);
  const monthly = remaining > 0 ? remaining / months : 0;

  return {
    paid: Math.round(paid),
    remaining: Math.round(remaining),
    monthly: Math.round(monthly),
  };
}
