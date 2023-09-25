import { Order, Prisma } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (
  userId: string,
  payload: JsonArray,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: payload,
    },
  });

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllOrders = async (userId: string): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  });
  return result;
};

const getData = async (id: string, userId: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
      userId,
    },
  });
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
  getData,
  updateData,
  deleteData,
};
