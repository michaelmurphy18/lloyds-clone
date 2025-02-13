import type { AccountBase } from "@/schema";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const usePaymentStore = create(
  combine(
    {
      searchText: "",
      account: null as AccountBase | null,
      payee: null as AccountBase | null,
    },
    (set) => ({
      setSearchText: (text: string) =>
        set({ searchText: text.trim().toLowerCase() }),
      setAccount: (account: AccountBase) => set({ account }),
    }),
  ),
);

export const usePayeeSearch = () =>
  usePaymentStore((state) => state.searchText);

export const usePaymentAccount = () =>
  usePaymentStore((state) => state.account);

export const usePaymentActions = () => ({
  setSearchText: usePaymentStore.getState().setSearchText,
  setAccount: usePaymentStore.getState().setAccount,
});
