export const UserQueryKey = {
  currentUser: ["current-user"],
};

export const AccountQueryKey = {
  userAccounts: (userId: string) => ["accounts", userId],
  userAccount: (userId: string, accountId: string) => [
    "account",
    userId,
    accountId,
  ],
  otherAccounts: (userId: string) => ["other-accounts", userId],
  otherAccount: (userId: string, accountId: string) => [
    "other-account",
    userId,
    accountId,
  ],
};

export const TransactionQueryKey = {
  transactions: (accountId: string) => ["transactions", accountId],
  transaction: (accountId: string, transactionId: string) => [
    "transaction",
    accountId,
    transactionId,
  ],
};

export const CardQueryKey = {
  userCards: (userId: string) => ["cards", userId],
  userCard: (userId: string, cardId: string) => ["card", userId, cardId],
};
