import { z } from 'zod';

/**
 * Shared schema for product items in purchase return
 */
const productReturnSchema = z.object({
  productId: z.string({ required_error: 'Product ID is required' }),
  productCode: z.string({ required_error: 'Product code is required' }),
  productName: z.string({ required_error: 'Product name is required' }),
  quantity: z.union([z.number(), z.string()], {
    required_error: 'Quantity is required',
  }),
  maxQuantity: z.union([z.number(), z.string()]).optional(),
  unitPrice: z.union([z.number(), z.string()], {
    required_error: 'Unit price is required',
  }),
  unit: z.string({ required_error: 'Unit is required' }),
  totalAmount: z.union([z.number(), z.string()], {
    required_error: 'Total amount is required',
  }),
});

/**
 * Create Purchase Return Schema
 */
export const createPurchaseReturn = z.object({
  body: z.object({
    returnDate: z.string({ required_error: 'Return date is required' }),
   
    referenceNo: z.number({ required_error: 'Reference number is required' }),
    supplierName: z.string().optional(),
    warehouse: z.string({ required_error: 'Warehouse is required' }),
    returnReason: z.string({ required_error: 'Reason is required' }),
    returnNote: z.string().optional(),
    purchaseInvoiceNo: z.string().optional(),
    items: z
      .array(productReturnSchema)
      .nonempty({ message: 'At least one item is required' }),
    totalReturnAmount: z.union([z.number(), z.string()], {
      required_error: 'Total return amount is required',
    }),
    status: z.enum(['pending', 'completed', 'cancelled']).optional(),
  }),
});

/**
 * Update Purchase Return Schema
 */
export const updatePurchaseReturn = z.object({
  body: z.object({
    returnDate: z.string().optional(),
    referenceNo: z.number().optional(),
    supplierName: z.string().optional(),
    warehouse: z.string().optional(),
    returnReason: z.string().optional(),
    returnNote: z.string().optional(),
    purchaseInvoiceNo: z.string().optional(),
    items: z
      .array(productReturnSchema)
      .nonempty({ message: 'At least one item is required' }).optional(),
    totalReturnAmount: z.union([z.number(), z.string()], {
      required_error: 'Total return amount is required',
    }).optional(),
    status: z.enum(['pending', 'completed', 'cancelled']).optional(),
  }),
});

export const PurchaseReturnValidations = {
  createPurchaseReturn,
  updatePurchaseReturn,
};
