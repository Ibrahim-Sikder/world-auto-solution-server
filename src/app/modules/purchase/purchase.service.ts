/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { ImageUpload } from '../../utils/ImageUpload';
import path from 'path';
import { Purchase } from './purchase.model';
import { purchaseSearch } from './purchase.const';
import { TPurchase } from './purchase.interface';
const createPurchase = async (payload: any, file?: Express.Multer.File) => {
  try {
 

    const newCategory = await Purchase.create(payload);
    return newCategory;
  } catch (error: any) {
    console.error('Error creating category:', error.message);
    throw new Error(
      error.message ||
        'An unexpected error occurred while creating the category',
    );
  }
};

const getAllPurchase = async (query: Record<string, unknown>) => {
  const purchaseQuery = new QueryBuilder(Purchase.find(), query)
    .search(purchaseSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await purchaseQuery.countTotal();
  const purchases = await purchaseQuery.modelQuery.populate([
    {
      path: 'suppliers',
      select: 'full_name',
    },
    {
      path: 'products.productId',
    },
  ]);

  return {
    meta,
    purchases,
  };
};
const getSiniglePurchase = async (id: string) => {
  const result = await Purchase.findById(id).populate([
    {
      path: 'suppliers',
      select: 'full_name',
    },
  ]);
  return result;
};
const updatePurchase = async (id: string, payload: Partial<TPurchase>) => {
  console.log(payload);
  const result = await Purchase.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletePurchase = async (id: string) => {
  const result = await Purchase.deleteOne({ _id: id });

  return result;
};

export const purchaseServices = {
  createPurchase,
  getAllPurchase,
  getSiniglePurchase,
  updatePurchase,
  deletePurchase,
};
