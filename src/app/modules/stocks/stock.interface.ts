import { Document, Types } from 'mongoose';

export interface IStock extends Document {
  product: Types.ObjectId;
  warehouse: Types.ObjectId;
  quantity: number;
  batchNumber?: string;
  expiryDate?: Date;          
}
