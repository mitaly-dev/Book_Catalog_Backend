import { Response } from 'express';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  token?: T | null;
};

const signInSendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    token: data.token || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

export default signInSendResponse;
