import { ObjectId } from 'mongoose';

export type TProduct = {
  product_name: string;
  product_type: ObjectId;
  image: string;
  category: ObjectId;
  product_code: string;
  storageLocation: string;
  productStatus: string;
  brand: ObjectId;
  barcode: string[];
  tags: string[];
  unit: ObjectId;
  product_price: number;
  expense: number;
  unit_price: number;
  product_tax: number;
  tax_method: string;
  warranty: string;
  productDescription: string;
  specifications: string;
  discount: number;
  stock_alert: number;
  product_quantity: number;
  suppliers: ObjectId;
  productCost: number;
  isDeleted: boolean;
  shipping: number;

  // Inventory Management Fields
  initialStock: number;
  stock: number;
  stockIn: number;
  stockOut: number;
  reorderLevel: number;
  lastPurchaseDate?: string;
  lastSoldDate?: string;

  // Expiry-related Fields
  expiryDateType: 'fixed' | 'variable' | 'none';
  expiryDate?: string;
  manufacturingDate?: string;
  batchNumber?: string;
  shelfLife?: number;
  shelfLifeUnit?: 'Days' | 'Weeks' | 'Months' | 'Years';
  expiryAlertDays?: number;
};
