import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const useError = create(
  devtools(
    combine({ toast: false, error: null as any }, (set, get) => ({
      showToast: (error: any) => {
        set({
          toast: true,
          error,
        });

        const timeoutId = setTimeout(() => {
          set({
            toast: false,
            error: null,
          });
        }, 5000); // 5 seconds error disappear time

        return () => clearTimeout(timeoutId);
      },
    })),
  ),
);

export default useError;
