import { z } from 'zod';

export const stockCreateValidation = z.object({
  body: z.object({
    product: z.string({ required_error: 'Product ID is required' }),
    warehouse: z.string({ required_error: 'Warehouse ID is required' }),
    quantity: z
      .number({ required_error: 'Quantity is required' })
      .min(0, 'Quantity cannot be negative'),
    batchNumber: z.string().optional(),
    expiryDate: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
  }),
});
