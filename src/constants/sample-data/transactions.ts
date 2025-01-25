import { Transaction, TransactionSection, TransactionTimeline } from "@/types";

// Sample data for Transaction
const sampleTransactions: Transaction[] = [
  {
    id: "txn1",
    amount: 500,
    balanceAfter: 1500,
    date: "2023-01-06",
    clearedDate: "2023-01-07",
    type: "deposit",
    payee: {
      name: "Salary",
      reference: "Monthly paycheck",
      iconUrl: "https://picsum.photos/200",
    },
    category: "Income",
    notes: "January salary deposit.",
  },
  {
    id: "txn11",
    amount: 100,
    balanceAfter: 1050,
    date: "2023-01-06",
    type: "deposit",
    payee: {
      name: "Refund",
      reference: "Supermarket refund",
    },
    category: "Refunds",
    notes: "Refund for returned groceries.",
  },
  {
    id: "txn2",
    amount: -200,
    balanceAfter: 1300,
    date: "2023-01-08",
    type: "withdrawal",
    payee: {
      name: "Supermarket",
      reference: "Groceries",
      iconUrl: "https://picsum.photos/200",
    },
    category: "Shopping",
    notes: "Weekly grocery shopping.",
  },
  {
    id: "txn3",
    amount: -50,
    balanceAfter: 1250,
    date: "2023-01-09",
    type: "withdrawal",
    payee: {
      name: "Coffee Shop",
      reference: "Coffee and snacks",
    },
    category: "Food & Drinks",
    notes: "Coffee with friends.",
  },
  {
    id: "txn4",
    amount: -300,
    balanceAfter: 950,
    date: "2023-01-10",
    clearedDate: "2023-01-12",
    type: "withdrawal",
    payee: {
      name: "Electric Company",
      reference: "Electricity bill",
      iconUrl: "https://example.com/icons/electric.png",
    },
    category: "Bills",
    notes: "January electricity bill.",
  },
  {
    id: "txn5",
    amount: 100,
    balanceAfter: 1050,
    date: "2023-01-15",
    type: "deposit",
    payee: {
      name: "Refund",
      reference: "Supermarket refund",
    },
    category: "Refunds",
    notes: "Refund for returned groceries.",
  },
  {
    id: "txn6",
    amount: -50,
    balanceAfter: 1000,
    date: "2023-01-16",
    type: "withdrawal",
    payee: {
      name: "Gym",
      reference: "Membership fee",
      iconUrl: "https://example.com/icons/gym.png",
    },
    category: "Health",
    notes: "Monthly gym membership fee.",
  },
  {
    id: "txn7",
    amount: 300,
    balanceAfter: 1300,
    date: "2023-02-01",
    type: "deposit",
    payee: {
      name: "Freelance",
      reference: "Web development project",
    },
    category: "Income",
    notes: "Freelance payment.",
  },
  {
    id: "txn8",
    amount: -75,
    balanceAfter: 1225,
    date: "2023-02-03",
    type: "withdrawal",
    payee: {
      name: "Restaurant",
      reference: "Dinner",
    },
    category: "Food & Drinks",
    notes: "Dinner with family.",
  },
  {
    id: "txn9",
    amount: -120,
    balanceAfter: 1105,
    date: "2023-02-05",
    type: "withdrawal",
    payee: {
      name: "Online Store",
      reference: "Clothing purchase",
    },
    category: "Shopping",
    notes: "Bought winter clothing.",
  },
  {
    id: "txn10",
    amount: 200,
    balanceAfter: 1305,
    date: "2023-02-06",
    type: "deposit",
    payee: {
      name: "Gift",
      reference: "Birthday gift",
    },
    category: "Income",
    notes: "Gift from a friend.",
  },
];

// Sample data for TransactionTimeline
export const sampleTransactionTimeline: TransactionTimeline = [
  "all",
  "January 2023",
  "February 2023",
];

// Sample data for TransactionSectionList
export const sampleTransactionSectionList: TransactionSection[] = [
  {
    date: "2023-01-06",
    data: [sampleTransactions[0], sampleTransactions[1]],
  },
  {
    date: "2023-01-08",
    data: [sampleTransactions[2]],
  },
  {
    date: "2023-01-09",
    data: [sampleTransactions[3]],
  },
  {
    date: "2023-01-10",
    data: [sampleTransactions[4]],
  },
  {
    date: "2023-01-15",
    data: [sampleTransactions[5]],
  },
  {
    date: "2023-01-16",
    data: [sampleTransactions[6]],
  },
  {
    date: "2023-02-01",
    data: [sampleTransactions[7]],
  },
  {
    date: "2023-02-03",
    data: [sampleTransactions[8]],
  },
  {
    date: "2023-02-05",
    data: [sampleTransactions[9]],
  },
  {
    date: "2023-02-06",
    data: [sampleTransactions[10]],
  },
];
