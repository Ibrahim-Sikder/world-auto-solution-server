// stock.route.ts
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { stockControllers } from './stocks.controller';

const router = express.Router();

router.post(
  '/',

  stockControllers.createStock,
);

router.get('/', stockControllers.getAllStocks);

router.get('/:id', stockControllers.getSingleStock);

router.delete('/:id', stockControllers.deleteStock);

router.put(
  '/:id',
  stockControllers.updateStock,
);

export const stockRoutes = router;
