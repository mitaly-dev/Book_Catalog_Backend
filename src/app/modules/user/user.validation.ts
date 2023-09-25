import { z } from 'zod';

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.number().optional(),
    address: z.number().optional(),
    profileImg: z.string().optional(),
  }),
});
export const UserValidation = {
  update,
};
