import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthCtrl } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signupZodSchema),
  AuthCtrl.createUser,
);
router.post(
  '/signin',
  validateRequest(AuthValidation.loginZodSchema),
  AuthCtrl.loginUser,
);

export const AuthRoute = router;
