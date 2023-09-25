import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookCtrl } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.create),
  BookCtrl.insertIntoDB,
);
router.get('/', BookCtrl.getAllData);
router.get('/:id/:category', BookCtrl.getCategoryBooks);
router.get('/:id', BookCtrl.getData);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookCtrl.updateData,
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookCtrl.deleteData);
export const BookRoutes = router;
