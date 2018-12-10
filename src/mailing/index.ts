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
                auth,
            } as any,
        )

        transport.sendMail(email)
    } catch (error) {
        logger('Email').error({ level: '5', message: error })

        return error
    }
}
