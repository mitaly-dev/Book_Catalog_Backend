import { prisma } from '../../../shared/prisma';
import { IProfile } from './profile.interface';

const getProfile = async (userId: string): Promise<IProfile | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      password: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

export const ProfileService = {
  getProfile,
};
