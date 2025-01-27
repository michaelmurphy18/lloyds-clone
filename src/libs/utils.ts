import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitDecimal(value: string) {
  const [integerPart, decimalPart = "00"] = value.split(".");
  return [
    integerPart,
    decimalPart.length === 1 ? decimalPart + "0" : decimalPart,
  ];
}

export function formatCurrency(value: number) {
  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  return formatter.format(value);
}

export const sortCodeFormatter = (value: string) => {
  const cleaned = value.replace(/\D/g, "");

  const formatted = cleaned.match(/.{1,2}/g)?.join("-") || "";

  return formatted;
};

export const formatDate = (
  date: Date,
  localisation?: string,
  options?: Intl.DateTimeFormatOptions,
) => {
  return date.toLocaleDateString(
    localisation || "en-GB",
    options || {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
};

const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];
export function getGreetings() {
  const currentHour = new Date().getHours();

  const isHi = Math.random() < 0.2;

  if (isHi) {
    return "Hi";
  }

  if (currentHour >= 5 && currentHour < 12) {
    return greetings[0]; // "Good Morning"
  } else if (currentHour >= 12 && currentHour < 18) {
    return greetings[1]; // "Good Afternoon"
  } else {
    return greetings[2]; // "Good Evening"
  }
}
