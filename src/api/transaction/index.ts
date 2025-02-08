import privateClient from "../privateClient";

export async function getTransactions(
  accountId: string,
  cursor: string,
  limit: number,
) {
  const response = await privateClient()
    .get(`transaction/${accountId}`, {
      params: {
        cursor,
        limit,
      },
    })
    .then((res) => {
      return validateSchema({
        schema: getTransactionSchema,
        schemaName: res.request.url,
        dto: res.data,
      });
    });
}
