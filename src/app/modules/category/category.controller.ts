import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllData();

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getData = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User getched successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateData(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Uers deleted successfully',
    data: result,
  });
});
export const CategoryCtrl = {
  getAllData,
  getData,
  updateData,
  deleteData,
};
