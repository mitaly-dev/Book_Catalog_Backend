import { z } from 'zod';

const create = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({
          required_error: 'bookId is required',
        }),
        quantity: z.number({
          required_error: 'quantity is required',
        }),
      }),
    ),
  }),
});

export const OrderValidation = {
  create,
};
