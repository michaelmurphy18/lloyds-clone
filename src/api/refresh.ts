import useAuth from "@/store/auth";
import GetNewAccessToken from "./session/refresh";

const refreshAuth = async (failedRequest: any): Promise<any> => {
  const refreshToken = useAuth.getState().refreshToken;

  if (!refreshToken) {
    return Promise.reject();
  }

  const newToken = await GetNewAccessToken(refreshToken);

  if (!newToken) {
    return Promise.reject();
  }

  failedRequest.response.config.headers["Authorization"] = `Bearer ${newToken}`;
  // Update the access token in the header
  // setHeaderToken(newToken);

  // Update the access token in the store
  useAuth.setState({ accessToken: newToken });

  return Promise.resolve(newToken);
};

export { refreshAuth };
