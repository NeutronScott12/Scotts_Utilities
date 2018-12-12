import {
    hashPassword,
    comparePassword,
    createToken,
    verifyToken,
    decodeToken,
} from '..'

describe('Auth Tests', () => {
    test('Test hashing password & comparison', async () => {
        const hashed = await hashPassword('bob', 10)

        expect(await comparePassword('bob', hashed)).toBe(true)
    })

    test('Create Token and verify it', () => {
        const token = createToken('stuff', 'secret', '7d')

        if (typeof token === 'string') {
            expect(verifyToken(token, 'secret')).toBe('stuff')
        }
    })

    test('Create token and decode it', () => {
        const [token] = createToken(
            {
                id: 1,
            },
            'secret',
            '7d',
        )

        const decode: any = decodeToken(token)

        expect(parseInt(decode.id, 10)).toBe(1)
    })
})
