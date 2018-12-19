import winston = require('winston')
import * as glob from 'glob'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { logger } from '../logging'

export const sluggify = (word: string): string =>
    word
        .trim()
        .replace(/ /g, '-')
        .toLowerCase()

export const normalisePort = (port: number | string): number | boolean => {
    if (typeof port === 'string') {
        return parseInt(port)
    } else if (port >= 0) {
        return port
    } else {
        return false
    }
}

export const consolePrint = (
    data: Array<string> | string,
): Promise<winston.Logger> => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(data)) {
            return data.forEach(d => {
                resolve(logger('Server').log({ level: 'info', message: d }))
            })
        } else if (typeof data === 'string') {
            return resolve(
                logger('Server').log({ level: 'info', message: data }),
            )
        } else {
            return reject(
                'Arguments need to be a string or an array of strings',
            )
        }
    })
}

export const genResolvers = (path: string): IResolvers[] =>
    glob.sync(path).map(resolver => require(resolver).resolvers)
