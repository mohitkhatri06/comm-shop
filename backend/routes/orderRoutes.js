import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
   addOrderItems,
   getMyOrders,
   getOrderById,
   upadteOrderToPaid,
} from '../controllers/orderController.js';
const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, upadteOrderToPaid);

export default router;
