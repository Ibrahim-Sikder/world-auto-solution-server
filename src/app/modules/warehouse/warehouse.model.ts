import mongoose, { Document, Schema } from 'mongoose';
import { IWarehouse } from './warehouse.interface';

const warehouseSchema = new Schema<IWarehouse>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    address: { type: String, required: true },
    city: { type: String, required: true },
    division: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'Bangladesh' },
    latitude: { type: String, default: '' },
    longitude: { type: String, default: '' },
    manager: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    totalProducts: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
  },
  { timestamps: true },
);

const Warehouse = mongoose.model<IWarehouse>('Warehouse', warehouseSchema);

export default Warehouse;
