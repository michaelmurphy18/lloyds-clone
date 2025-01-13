type TransactionType = "deposit" | "withdrawal";

type Transaction = {
  id: string; // Unique identifier for the transaction
  amount: number; // Transaction amount
  balanceAfter: number; // Account balance after the transaction
  date: string; // Date the transaction occurred
  clearedDate?: string; // Date the transaction was cleared (optional, in case it differs)
  type: TransactionType; // Type of transaction
  payee: {
    name: string; // Payee or payer name
    reference?: string; // Optional reference or description for the transaction
    iconUrl?: string; // Optional icon or logo URL for the payee
  };
  category?: string; // Optional category of the transaction (e.g., "Bills", "Shopping")
  notes?: string; // Optional additional notes about the transaction
};

type TransactionTimeline = string[]; // List of months in the transaction timeline

type TransactionSection = {
  date: string; // Section title - e.g., "06 January 2023"
  data: Transaction[]; // List of transactions for the section
};

export type {
  Transaction,
  TransactionTimeline,
  TransactionSection,
  TransactionType,
};

// type Example = {
//   id: string;
// } & (
//   | {
//       type: "deposit";
//       payee: string;
//     }
//   | {
//       type: "withdrawal";
//       recipient: string;
//     }
// );
