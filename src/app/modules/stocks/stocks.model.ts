import { Schema, model } from 'mongoose';
import { IStock } from './stock.interface';

const stockSchema = new Schema<IStock>(
  {
    product: {
      type: Schema.Types.ObjectId, // ✅ Use Schema.Types.ObjectId here
      ref: 'Product',
      required: true,
    },
    warehouse: {
      type: Schema.Types.ObjectId, // ✅ Same here
      ref: 'Warehouse',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
    },
    batchNumber: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

stockSchema.index({ product: 1, warehouse: 1, batchNumber: 1 }, { unique: true }); // Optionally include batchNumber in the unique index

export const Stocks = model<IStock>('Stocks', stockSchema);
