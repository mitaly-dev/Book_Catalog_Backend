import { UserRole } from '@prisma/client';

export type IProfile = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  contactNo: string;
  address: string;
  profileImg: string;
};
