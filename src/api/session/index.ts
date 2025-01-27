import { validateSchema } from "@/libs/validator";
import { loginResponseSchema } from "@/schema";
import publicClient from "@/api/publicClient";

export async function PostLogin(userId: string, password: string) {
  const response = await publicClient
    .post("/session", {
      userId,
      password,
    })
    .then((res) => {
      return validateSchema({
        schema: loginResponseSchema,
        dto: res.data,
        schemaName: "api/session",
      });
    });

  return response;
}
