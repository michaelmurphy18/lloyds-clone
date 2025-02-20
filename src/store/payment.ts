import type { AccountBase, Payee, Transaction } from "@/schema";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const usePaymentStore = create(
  combine(
    {
      searchText: "",
      account: null as AccountBase | null,
      payee: null as (Payee & { newEntry: boolean }) | null,
      details: null as { amount: number; ref?: string } | null,
      transaction: null as Transaction | null,
    },
    (set) => ({
      setSearchText: (text: string) =>
        set({ searchText: text.trim().toLowerCase() }),
      setAccount: (account: AccountBase) => set({ account }),
      setPayee: (payee: Payee & { newEntry?: boolean }) =>
        set({
          payee: {
            ...payee,
            newEntry: payee.newEntry ?? false,
          },
        }),
      setDetails: (details: { amount: number; ref?: string }) =>
        set({ details }),
      setTransaction: (transaction: Transaction) => set({ transaction }),
    }),
  ),
);

export const usePayeeSearch = () =>
  usePaymentStore((state) => state.searchText);

export const usePaymentAccount = () =>
  usePaymentStore((state) => state.account);

export const usePayee = () => usePaymentStore((state) => state.payee);

export const usePaymentDetails = () =>
  usePaymentStore((state) => state.details);

export const useTransaction = () =>
  usePaymentStore((state) => state.transaction);

export const usePaymentActions = () => ({
  setSearchText: usePaymentStore.getState().setSearchText,
  setAccount: usePaymentStore.getState().setAccount,
  setPayee: usePaymentStore.getState().setPayee,
  setPaymentDetails: usePaymentStore.getState().setDetails,
  setTransaction: usePaymentStore.getState().setTransaction,
});
