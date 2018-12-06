import { sign, verify } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

export const createToken = (
  data: string | {} | [],
  secret: string,
  expiresIn: string | number,
  refreshSecret: string,
  refreshData: string | {} | []
): string | string[] => {
  try {
    const token = sign(data, secret, { expiresIn });

    if (refreshSecret) {
      const refreshToken: string = sign(refreshData, refreshSecret, {
        expiresIn: "7d"
      });
      return [token, refreshToken];
    }

    return token;
  } catch (error) {
    return error;
  }
};

export const verifyToken = (token: string, secret: string): string | object => {
  return verify;
};

export const hashPassword = async (
  password: string,
  salt: number
): Promise<string> => {
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  return await compare(password, userPassword);
};