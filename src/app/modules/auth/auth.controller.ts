import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import signInSendResponse from '../../../shared/signinSendResponse';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUser(req.body);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { token } = result;

  const token_options = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('token', token, token_options);

  signInSendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    token,
  });
});

export const AuthCtrl = {
  createUser,
  loginUser,
};
