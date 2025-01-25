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
