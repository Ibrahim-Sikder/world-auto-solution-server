/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    product_name: {
      type: String,
    },
    product_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductType',
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    suppliers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    product_code: {
      type: String,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    barcode: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
    },
    product_price: {
      type: Number,
    },
    expense: {
      type: Number,
    },
    unit_price: {
      type: Number,
    },
    product_tax: {
      type: Number,
    },
    shipping: {
      type: Number,
    },
    tax_method: {
      type: String,
    },
    storageLocation: {
      type: String,
    },
    productStatus: {
      type: String,
    },
    warranty: {
      type: String,
    },
    productDescription: {
      type: String,
    },
    specifications: {
      type: String,
    },
    discount: {
      type: Number,
    },

    // Inventory fields
    initialStock: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    stockIn: {
      type: Number,
      default: 0,
    },
    stockOut: {
      type: Number,
      default: 0,
    },
    reorderLevel: {
      type: Number,
    },
    stock_alert: {
      type: Number,
    },
    lastPurchaseDate: {
      type: Date,
    },
    lastSoldDate: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    expiryDateType: {
      type: String,
      enum: ['fixed', 'variable', 'none'],
      required: true,
    },
    expiryDate: {
      type: String,
    },
    manufacturingDate: {
      type: String,
    },
    shelfLife: {
      type: Number,
    },
    shelfLifeUnit: {
      type: String,
      enum: ['Days', 'Weeks', 'Months', 'Years'],
    },
    expiryAlertDays: {
      type: Number,
    },
    batchNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', ProductSchema);
