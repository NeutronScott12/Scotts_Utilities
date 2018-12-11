import winston = require('winston');
import * as glob from 'glob';
import { IResolvers } from 'graphql-tools/dist/Interfaces';

import { logger } from '..';

export const sluggify = (word: string): string => word.replace(/ /g, '-').toLowerCase();

export const normalisePort = (port: number | string): number => {
	if (typeof port === 'string') {
		return parseInt(port);
	} else {
		return port;
	}
};

export const consolePrint = (data: Array<string> | string): Promise<winston.Logger> => {
	return new Promise((resolve, reject) => {
		if (Array.isArray(data)) {
			return data.forEach((d) => {
				resolve(logger('Server Info').log({ level: '5', message: d }));
			});
		} else if (typeof data === 'string') {
			return resolve(logger('Server Info').log({ level: '5', message: data }));
		} else {
			return reject('Arguments need to be a string or an array of strings');
		}
	});
};

export const genResolvers = (path: string): IResolvers[] =>
	glob.sync(path).map((resolver) => require(resolver));
