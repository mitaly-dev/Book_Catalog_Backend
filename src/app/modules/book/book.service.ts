import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { filterOptions } from './book.const';
import { IfilterData } from './book.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const insertIntoDB = async (data: Book): Promise<any> => {
  const createData = await prisma.book.create({ data });
  if (!createData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
  }
  if (createData) {
    const result = await prisma.book.findUnique({
      where: {
        id: createData?.id,
      },
      include: {
        category: true,
      },
    });
    return result;
  }
};

const getAllData = async (
  filter: IfilterData,
  options: IPaginationOptions,
): Promise<IGenericResponse<Book[]>> => {
  const { search, category, ...filterData } = filter;

  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: filterOptions.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (category) {
    andConditions.push({
      category: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: category,
      },
    });
  }
  if (Object.keys(filterData)?.length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const { page, size, skip, minPrice, maxPrice } =
    paginationHelpers.calculatePagination(options);

  if (minPrice !== undefined && maxPrice !== undefined) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
        lte: Number(maxPrice),
      },
    });
  }

  const whereConditons: Prisma.BookWhereInput =
    andConditions?.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditons,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options?.sortOrder,
          }
        : { price: 'desc' },
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      page,
      size,
      total,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};
const getCategoryBooks = async (
  categoryId: string,
  title: string,
  options: IPaginationOptions,
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    where: {
      category: {
        id: categoryId,
        title,
      },
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options?.sortOrder,
          }
        : { price: 'desc' },
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count();

  if (result?.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Books not found!');
  }

  return {
    meta: {
      total,
      size: 1,
      totalPage: Math.round(total / size),
      page,
    },
    data: result,
  };
};
const getData = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateData = async (
  id: string,
  payload: Partial<Book>,
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    include: {
      category: true,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllData,
  getCategoryBooks,
  getData,
  updateData,
  deleteData,
};
