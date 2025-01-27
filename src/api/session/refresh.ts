import publicClient from "@/api/publicClient";

const GetNewAccessToken = async (refreshToken: string) => {
  try {
    const accessToken: string = await publicClient
      .get("session/refresh", {
        headers: {
          "x-fresh": refreshToken,
        },
      })
      .then((res) => res.data.accessToken)
      .catch((err) => {
        throw new Error(err);
      });

    return accessToken;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export default GetNewAccessToken;
