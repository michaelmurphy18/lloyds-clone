import { validateSchema } from "@/libs/validator";
import privateClient from "../privateClient";
import { getPayeeSchema } from "@/schema/response/payee.schema";

export async function getPayees(
  name?: string,
  id?: string,
  limit: number = 10,
) {
  const params = new URLSearchParams({ limit: String(limit) });

  if (id && name) {
    params.append("id", id);
    params.append("name", name);
  }

  const response = await privateClient()
    .get(`users/payee?${params}`)
    .then((res) =>
      validateSchema({
        schema: getPayeeSchema,
        dto: res.data,
        schemaName: res.request.url,
      }),
    );

  //   await new Promise((resolve) => setTimeout(resolve, 5000));

  return response;
}

export async function CreatePayee() {
  const response = await privateClient().put("users/payee", {
    name: "Alexandra Besquite",
    sortCode: "348608",
    accountNumber: "10492854",
  });
}

export async function DeletePayee(id: string) {
  const response = await privateClient().delete(`users/payee/${id}`);
}
