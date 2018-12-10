import { createTransport, SendMailOptions } from 'nodemailer'
import { logger } from '../logging'
import { createToken } from '..'

interface TransportAuth {
    user: string
    pass: string
}

interface TransportArgs {
    host: string
    port: string
    auth: TransportAuth
}

interface TokenArgs {
    id: string | number
    username: string
    email: string
}

export const generateEmailLink = async (
    { id, username, email }: TokenArgs,
    clientUrl: string,
) => {
    try {
        const [token]: string[] = await createToken(
            { id, username, email },
            'secret',
            '7d',
        )

        const link: string = `${clientUrl}?t=${token}`

        return link
    } catch (error) {
        logger('Generate Email Confirmation').error({
            level: '5',
            message: error,
        })

        return error
    }
}

export const SendMail = (
    { host, port, auth }: TransportArgs,
    email: SendMailOptions,
): boolean => {
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
                auth: {
                    user: auth.user,
                    pass: auth.pass,
                },
            } as any,
        )

        transport.sendMail(email)

        return true
    } catch (error) {
        logger('Email').error({ level: '5', message: error })

        return false
    }
}

// const {
// 	EMAIL_HOST = 'smtp.mailtrap.io',
// 	EMAIL_PORT = 2525,
// 	EMAIL_USER = '984C1182cd3546',
// 	EMAIL_PASS = 'c468fcdc66d05b'
// } = process.env;

// const bob = SendMail({
// 	port: EMAIL_PORT as any,
// 	host: EMAIL_HOST,
// 	auth: {
// 		user: EMAIL_USER,
// 		pass: EMAIL_PASS
// 	}
// });

// bob({

// });
