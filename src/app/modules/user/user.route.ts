import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserCtrl } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserCtrl.getAllData);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserCtrl.getData);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.update),
  UserCtrl.updateData,
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserCtrl.deleteData);
export const UserRoutes = router;
