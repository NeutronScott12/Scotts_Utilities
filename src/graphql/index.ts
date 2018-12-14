import { generateNamespace } from '@gql2ts/from-schema'
import { importSchema } from 'graphql-import'
import * as fs from 'fs'

import { logger } from '..'

export const createTypesFromSchema = (
    namespace: string,
    schemaPath: string,
    destintation: string,
) => {
    const typescriptTypes = generateNamespace(
        namespace,
        importSchema(schemaPath),
    )

    fs.writeFile(
        destintation,
        typescriptTypes,
        (err: NodeJS.ErrnoException) => {
            if (err)
                logger('Create Types').error({
                    level: '5',
                    message: err.message,
                })
        },
    )
}
