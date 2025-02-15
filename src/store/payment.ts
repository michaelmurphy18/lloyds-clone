import type { AccountBase, Payee } from "@/schema";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const usePaymentStore = create(
  combine(
    {
      searchText: "",
      account: null as AccountBase | null,
      payee: null as Payee | null,
    },
    (set) => ({
      setSearchText: (text: string) =>
        set({ searchText: text.trim().toLowerCase() }),
      setAccount: (account: AccountBase) => set({ account }),
      setPayee: (payee: Payee) => set({ payee }),
    }),
  ),
);

export const usePayeeSearch = () =>
  usePaymentStore((state) => state.searchText);

export const usePaymentAccount = () =>
  usePaymentStore((state) => state.account);

export const usePayee = () => usePaymentStore((state) => state.payee);

export const usePaymentActions = () => ({
  setSearchText: usePaymentStore.getState().setSearchText,
  setAccount: usePaymentStore.getState().setAccount,
  setPayee: usePaymentStore.getState().setPayee,
});
