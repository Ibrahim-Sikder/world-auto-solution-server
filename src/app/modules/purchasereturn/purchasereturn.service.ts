import QueryBuilder from '../../builder/QueryBuilder';
import { PurchaseReturn } from './purchasereturn.model';
import { TPurchaseReturn } from './purchasereturn.interface';
import { purchaseReturnSearch } from './purchasereturn.constant';

const createPurchaseReturn = async (payload: TPurchaseReturn) => {
  const newReturn = await PurchaseReturn.create(payload);
  return newReturn;
};

const getAllPurchaseReturns = async (query: Record<string, unknown>) => {
  const builder = new QueryBuilder(PurchaseReturn.find(), query)
    .search(purchaseReturnSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await builder.countTotal();
  const data = await builder.modelQuery.populate([
    { path: 'supplier', select: 'full_name' },
    { path: 'items.productId' },
  ]);

  return {
    meta,
    returns: data,
  };
};

const getSinglePurchaseReturn = async (id: string) => {
  const result = await PurchaseReturn.findById(id).populate([
    { path: 'supplier', select: 'full_name' },
    { path: 'items.productId' },
  ]);
  return result;
};

const updatePurchaseReturn = async (
  id: string,
  payload: Partial<TPurchaseReturn>
) => {
  console.log(payload)
  const result = await PurchaseReturn.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  console.log('result this  ',result)
  return result;
};

const deletePurchaseReturn = async (id: string) => {
  const result = await PurchaseReturn.deleteOne({ _id: id });
  return result;
};

export const purchaseReturnServices = {
  createPurchaseReturn,
  getAllPurchaseReturns,
  getSinglePurchaseReturn,
  updatePurchaseReturn,
  deletePurchaseReturn,
};
