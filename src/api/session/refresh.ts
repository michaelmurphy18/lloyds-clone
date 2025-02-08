import publicClient from "@/api/publicClient";

const GetNewAccessToken = async (refreshToken: string) => {
  const accessToken: string = await publicClient
    .get("session/refresh", {
      headers: {
        "x-refresh": refreshToken,
      },
    })
    .then((res) => res.data.accessToken)
    .catch((err) => {
      console.log("Get New Access Token", err);

      throw new Error(err);
    });

  return accessToken;
};

export default GetNewAccessToken;
