import * as path from 'path'
import * as shortid from 'shortid'
import { S3 } from 'aws-sdk'

import { createWriteStream, WriteStream } from 'fs'

interface S3ImageResponse {
    filename: string
    mimetype: string
    encoding: string
    key: string
    url: string
    ETag: string
}

export const S3imageUpload = async (
    s3: S3,
    bucket: string,
    apolloUpload: any,
    folder: string,
): Promise<S3ImageResponse | Error> => {
    const { stream, filename, mimetype, encoding } = await apolloUpload
    const key = folder + '/' + shortid.generate() + '-' + filename

    if (s3) {
        const response = await s3
            .upload({
                Bucket: bucket,
                Key: key,
                ACL: 'public-read',
                Body: stream,
            })
            .promise()

        return {
            filename,
            mimetype,
            encoding,
            key: response.Key,
            url: response.Location,
            ETag: response.ETag,
        }
    }

    return new Error('Please add a S3 Client')
}

const processUpload = async (
    stream: WriteStream,
    mimetype: string,
    path: string,
): Promise<any> => {
    const extension = mimetype.split('/')[1]
    const id = `${shortid.generate()}.${extension}`

    return new Promise((resolve, reject) => {
        stream
            .pipe(createWriteStream(path))
            .on('finish', () => resolve({ id, path }))
            .on('error', reject)
    })
}

export const localUpload = async (
    apolloUpload: any,
    userPath: string,
): Promise<number | string> => {
    userPath = userPath ? userPath : path.join(__dirname)

    const { stream, mimetype } = await apolloUpload
    const { id } = await processUpload(stream, mimetype, userPath)

    return id
}
