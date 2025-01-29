import { z } from "zod";

const getCurrentUserSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string(),
    accounts: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
    fullName: z.string(),
    iat: z.number(),
    exp: z.number(),
  })
  .omit({ iat: true, exp: true });

type GetCurrentUser = z.infer<typeof getCurrentUserSchema>;

export { getCurrentUserSchema, type GetCurrentUser };

// {
//   id: z.string(),
//   userId: z.string(),
//   email: z.string(),
//   firstName: z.string(),
//   lastName: z.string(),
//   dob: z.string(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
//   fullName: z.string(),
//   iat: z.number(),
//   exp: z.number(),
// }

// {
//   "success": true,
//   "code": 200,
//   "message": "Current user",
//   "data": {
//       "userId": "docren155",
//       "email": "amilmohd155@gmail.com",
//       "firstName": "Amil",
//       "lastName": "Hamza",
//       "dob": "1998-11-28",
//       "accounts": [
//           "6797c797ef7b53dd72763213"
//       ],
//       "createdAt": "2025-01-27T17:51:19.613Z",
//       "updatedAt": "2025-01-27T17:51:19.613Z",
//       "fullName": "Amil Hamza",
//       "id": "6797c797ef7b53dd72763212",
//       "iat": 1738005554,
//       "exp": 1738091954
//   },
//   "request": {
//       "method": "GET",
//       "url": "/api/users/me"
//   }
// }
