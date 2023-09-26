import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderCtrl } from './order.controller';
import { OrderValidation } from './order.validation';
const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.create),
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  OrderCtrl.insertIntoDB,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  OrderCtrl.getAllOrders,
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderCtrl.getOrder,
);

export const OrderRoutes = router;
