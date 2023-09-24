import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllData();

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User getched successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateData(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Uers deleted successfully',
    data: result,
  });
});
export const UserCtrl = {
  getAllData,
  getData,
  updateData,
  deleteData,
};
