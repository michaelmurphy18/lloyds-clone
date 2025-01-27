import { z } from "zod";

const currentUserResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  fullName: z.string(),
  iat: z.number(),
  exp: z.number(),
});

type CurrentUserResponse = z.infer<typeof currentUserResponseSchema>;

export { currentUserResponseSchema, type CurrentUserResponse };

// {
//     "userId": "docren155",
//     "email": "amilmohd155@gmail.com",
//     "firstName": "Amil",
//     "lastName": "Hamza",
//     "dob": "1998-11-28",
//     "createdAt": "2025-01-21T20:47:36.257Z",
//     "updatedAt": "2025-01-21T20:47:36.257Z",
//     "fullName": "Amil Hamza",
//     "id": "679007e87c267f9bfe542313",
//     "iat": 1737963744,
//     "exp": 1738050144
// }
