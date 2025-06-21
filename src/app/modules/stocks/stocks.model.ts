import { Schema, model } from 'mongoose';
import { IStock } from './stock.interface';

const stockSchema = new Schema<IStock>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true,
    },
    type: {
      type: String,
      enum: ['in', 'out'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    referenceType: {
      type: String,
      enum: ['purchase', 'sale', 'repair', 'opening', 'return','transfer','adjustment'],
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      refPath: 'referenceType',
    },
    purchasePrice: {
      type: Number,
      required: function (this: IStock) {
        return this.type === 'in';
      },
    },
    sellingPrice: {
      type: Number,
      required: function (this: IStock) {
        return this.type === 'out';
      },
    },
    batchNumber: String,
    expiryDate: Date,
    note: String,
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

stockSchema.virtual('stockValue').get(function () {
  if (this.type === 'in' && this.purchasePrice != null) {
    return this.quantity * this.purchasePrice;
  }
  return null;
});


stockSchema.index({ product: 1, warehouse: 1, batchNumber: 1 });

export const Stocks = model<IStock>('Stocks', stockSchema);
