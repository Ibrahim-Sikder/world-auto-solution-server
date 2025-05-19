import { z } from 'zod';

const commonFields = {
  product_name: z.string({ required_error: "Product name is required" }),
  product_type: z.array(z.string()).optional(),
  suppliers: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
  product_code: z.string().optional(),
  shipping: z.union([z.number(), z.string()]).optional(),
  brand: z.array(z.string()).optional(),
  unit: z.array(z.string()).optional(),
  product_price: z.union([z.number(), z.string()], { required_error: "Product price is required" }),
  expense: z.union([z.number(), z.string()]).optional(),
  unit_price: z.union([z.number(), z.string()], { required_error: "Unit price is required" }),
  product_tax: z.union([z.number(), z.string()], { required_error: "Product tax is required" }),
  discount: z.union([z.number(), z.string()]).optional(),
  stock_alert: z.union([z.number(), z.string()]).optional(),
  tags: z.array(z.string().min(1, "Tag cannot be empty")).default([]),

  // New Inventory Management Fields
  initialStock: z.union([z.number(), z.string()]).optional(),
  stock: z.union([z.number(), z.string()]).optional(),
  stockIn: z.union([z.number(), z.string()]).optional(),
  stockOut: z.union([z.number(), z.string()]).optional(),
  reorderLevel: z.union([z.number(), z.string()]).optional(),

  // Expiration & Batch
  expiryDateType: z.enum(["fixed", "variable", "none"], {
    required_error: "Expiry date type is required",
  }),
  expiryDate: z.string().optional(),
  manufacturingDate: z.string().optional(),
  shelfLife: z.union([z.number(),z.string(), z.null()]).optional(),
  shelfLifeUnit: z.enum(["Days", "Weeks", "Months", "Years"]).optional(),
  expiryAlertDays: z.union([z.number(), z.string()]).optional(),
  batchNumber: z.string().optional(),
};

const createProduct = z.object({
  body: z.object(commonFields),
});

const updateProduct = z.object({
  body: z.object({
    ...Object.fromEntries(
      Object.entries(commonFields).map(([key, value]) => [key, value.optional()])
    ),
  }),
});

export const ProductValidations = {
  createProduct,
  updateProduct,
};
