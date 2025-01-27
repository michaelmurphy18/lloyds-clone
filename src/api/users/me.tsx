import { validateSchema } from "@/libs/validator";
import privateClient from "@/api/privateClient";
import { currentUserResponseSchema } from "@/schema";

export async function GetCurrentUser() {
  const response = await privateClient()
    .get("/users/me")
    .then((res) => {
      return validateSchema({
        schema: currentUserResponseSchema,
        schemaName: "api/users/me",
        dto: res.data,
      });
    });
  return response;
}
