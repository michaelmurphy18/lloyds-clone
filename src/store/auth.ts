import { create } from "zustand";
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";

import { PostLogin } from "@/api/session";
import { DeleteLogout } from "@/api/session/logout";
import { LoginForm } from "@/schema";
import useError from "./error";
import useLoadingScreen from "./loading";
import zustandStorage from "./storage";

const useAuth = create(
  devtools(
    persist(
      combine(
        {
          accessToken: null as string | null,
          refreshToken: null as string | null,
          authenticated: false,
        },
        (set, get) => ({
          login: async ({ userId, password }: LoginForm) => {
            try {
              useLoadingScreen.getState().setLoading(true);

              const { accessToken, refreshToken } = await PostLogin(
                userId,
                password,
              );

              set({
                authenticated: true,
                accessToken,
                refreshToken,
              });
            } catch (error) {
              // handle error
              useError.getState().showToast(error);
            } finally {
              useLoadingScreen.getState().setLoading(false);
            }
          },
          logout: async () => {
            try {
              useLoadingScreen.getState().setLoading(true);

              // logout session in server
              const refreshToken = get().refreshToken;
              const accessToken = get().accessToken;

              if (!refreshToken || !accessToken) {
                throw new Error("Logout: No refresh token");
              }

              // logout session in server
              await DeleteLogout(refreshToken, accessToken);
            } catch (error) {
              // handle error
              useError.getState().showToast(error);
            } finally {
              // irrespective of server response logout the user, clear local storage

              set({
                authenticated: false,
                accessToken: null,
                refreshToken: null,
              });

              useLoadingScreen.getState().setLoading(false);
            }
          },
        }),
      ),
      {
        name: "auth",
        version: 0,
        // partialize: (state) => ({
        //   accessToken: state.accessToken,
        //   refreshToken: state.refreshToken,
        //   authenticated: state.authenticated,
        // }),
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
);

export default useAuth;
