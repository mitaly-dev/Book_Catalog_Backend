import { Order, Prisma, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import { IOrderedBook } from './order.interface';

const insertIntoDB = async (
  userId: string,
  payload: { orderedBooks: IOrderedBook[] },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: payload?.orderedBooks,
    },
  });

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllOrders = async (userId: string, role: string): Promise<Order[]> => {
  let result;
  if (role === UserRole.customer) {
    result = await prisma.order.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
  } else {
    result = await prisma.order.findMany();
  }
  if (result?.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found!');
  }
  return result;
};

const getOrder = async (
  id: string,
  userId: string,
  role: string,
): Promise<Order | null> => {
  let result;

  if (role === 'customer') {
    result = await prisma.order.findUnique({
      where: {
        id,
        userId,
      },
    });
  } else {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found!');
  }
  return result;
};

const updateData = async (
  id: string,
  payload: Prisma.OrderUpdateInput,
): Promise<Order> => {
  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<Order> => {
  const result = await prisma.order.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllOrders,
  getOrder,
  updateData,
  deleteData,
};
