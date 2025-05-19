export interface IWarehouse extends Document {
  name: string;
  code: string;
  type: string;
  status: "active" | "inactive";
  address: string;
  city: string;
  division: string;
  postalCode: string;
  country: string;
  latitude?: string;
  longitude?: string;
  manager: string;
  phone: string;
  email: string;
  description: string;

  totalProducts?: number;
  totalQuantity?: number;
}
