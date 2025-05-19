
import { IStock } from './stock.interface';
import { Stocks } from './stocks.model';

const createStock = async (payload: IStock): Promise<IStock> => {
  const stock = await Stocks.create(payload);
  return stock;
};

const getAllStocks = async () => {
  const stocks = await Stocks.find().populate(['product', 'warehouse']);
  return stocks;
};

const getSingleStock = async (id: string): Promise<IStock | null> => {
  const stock = await Stocks.findById(id).populate(['product', 'warehouse']);
  return stock;
};

const updateStock = async (
  id: string,
  payload: Partial<IStock>,
): Promise<IStock | null> => {
  const updatedStock = await Stocks.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate(['product', 'warehouse']);

  return updatedStock;
};

const deleteStock = async (id: string): Promise<{ deleted: boolean }> => {
  const result = await Stocks.findByIdAndDelete(id);
  return { deleted: !!result };
};

export const stockServices = {
  createStock,
  getAllStocks,
  getSingleStock,
  updateStock,
  deleteStock,
};
