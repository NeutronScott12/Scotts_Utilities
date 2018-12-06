interface TransportAuth {
    user: string;
    pass: string;
}
interface TransportArgs {
    host: string;
    port: string;
    auth: TransportAuth;
}
export declare const SendMail: ({ host, port, auth }: TransportArgs, email: import("nodemailer/lib/mailer").Options) => any;
export {};
