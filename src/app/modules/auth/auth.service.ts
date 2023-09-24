import { User } from '@prisma/client';
import httpStatus, { BAD_REQUEST } from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { IAuth, IJWTResponse } from './auth.interface';

const createUser = async (payload: User): Promise<User> => {
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: payload?.email,
    },
  });

  if (isUserExist) {
    throw new ApiError(
      BAD_REQUEST,
      `There is already an registration with this email`,
    );
  }
  const result = await prisma.user.create({ data: payload });
  return result;
};

const loginUser = async (payload: IAuth): Promise<IJWTResponse> => {
  const { email } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { id: userId, role } = isUserExist;

  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    token,
  };
};

export const AuthService = {
  createUser,
  loginUser,
};
