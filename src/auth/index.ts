import {
    sign,
    verify,
    decode,
    DecodeOptions,
    VerifyOptions,
    SignOptions,
} from 'jsonwebtoken'
import { hash, compare } from 'bcryptjs'

export const createToken = (
    data: string | {} | [],
    secret: string,
    options: SignOptions,
    refreshSecret: string | undefined = undefined,
    refreshData: string | {} | [] | undefined = undefined,
): string[] => {
    try {
        const token = sign(data, secret, options)

        if (refreshSecret && refreshData) {
            const refreshToken: string = sign(
                refreshData,
                refreshSecret,
                options,
            )
            return [token, refreshToken]
        }

        return [token]
    } catch (error) {
        return error
    }
}

export const verifyToken = (
    token: string,
    secret: string,
    options?: VerifyOptions,
): string | {} => {
    return verify(token, secret, options)
}

export const hashPassword = async (
    password: string,
    salt: number,
): Promise<string> => {
    return await hash(password, salt)
}

export const decodeToken = (
    token: string,
    options?: DecodeOptions,
):
    | string
    | {
          [key: string]: any
      }
    | null => {
    if (typeof token === 'string') {
        return decode(token, options)
    } else {
        return new Error('Please enter a string based token')
    }
}

export const comparePassword = async (
    password: string,
    userPassword: string,
): Promise<boolean> => {
    return await compare(password, userPassword)
}
