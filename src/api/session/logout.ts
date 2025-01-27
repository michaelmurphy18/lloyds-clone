import publicClient from "../publicClient";

export async function DeleteLogout(refreshToken: string, accessToken: string) {
  await publicClient
    .delete("/session/logout", {
      headers: {
        "x-refresh": refreshToken,
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch((err) => {
      console.log("Delete Logout", err);

      throw new Error(err);
    })
    .finally(() => {
      publicClient.interceptors.request.use(
        async (config) => {
          config.headers.Authorization = "";

          return config;
        },
        (error) => Promise.reject(error),
      );
    });
}
