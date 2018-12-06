import { createTransport, SendMailOptions } from "nodemailer";
import { logger } from "../logging";
import { String } from "aws-sdk/clients/rdsdataservice";

interface TransportAuth {
  user: string;
  pass: string;
}

interface TransportArgs {
  host: string;
  port: string;
  auth: TransportAuth;
}

interface TokenArgs {
  id: string;
  username: string;
  email: string;
}

export const generateConfirmationUrl = async (
  token: TokenArgs,
  url: String
) => {
  try {
  } catch (error) {}
};

export const SendMail = (
  { host, port, auth }: TransportArgs,
  email: SendMailOptions
) => {
  try {
    const transport = createTransport(
      // sgTransport({
      //   auth: {
      //     api_key: SENGRID_API
      //   }
      // })
      {
        host,
        port,
        auth
      } as any
    );

    transport.sendMail(email);
  } catch (error) {
    logger("Email").error({ level: "5", message: error });

    return error;
  }
};
