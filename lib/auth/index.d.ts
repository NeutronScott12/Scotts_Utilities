export declare const createToken: (data: string | {} | [], secret: string, expiresIn: string | number, refreshSecret: string, refreshData: string | {} | []) => string | string[];
export declare const verifyToken: (token: string, secret: string) => string | object;
export declare const hashPassword: (password: string, salt: number) => Promise<string>;
export declare const comparePassword: (password: string, userPassword: string) => Promise<boolean>;
