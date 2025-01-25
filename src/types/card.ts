export const ProvidersWithIcon = new Map([
  ["visa", "cc-visa"],
  ["mastercard", "cc-mastercard"],
  ["amex", "cc-amex"],
] as const);

export type CardProviders =
  typeof ProvidersWithIcon extends Map<infer T, string> ? T : never;

export type BankCard = {
  cardHolder: string;
  accountNumber: string;
  provider: CardProviders;
  cardType: "debit" | "credit";
  accountType: string;
};
