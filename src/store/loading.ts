import { create } from "zustand";
import { combine } from "zustand/middleware";

const useLoadingScreen = create(
  combine(
    {
      loading: false,
    },
    (set) => ({
      setLoading: (loading: boolean) => {
        set({ loading });
      },
    }),
  ),
);

export default useLoadingScreen;
