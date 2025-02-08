import { create } from "zustand";
import { combine } from "zustand/middleware";

const useTransactionListStore = create(combine({}, (set) => ({})));
