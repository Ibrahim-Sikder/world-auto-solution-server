import { ISubscription } from "../subscription/subscription.interface";


export interface ITenant {
  _id?: string;
  name: string;
  domain: string; 
  dbUri: string;
  subscription: ISubscription;
  isActive: boolean;
}
