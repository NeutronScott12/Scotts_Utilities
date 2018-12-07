import { hashPassword, comparePassword, createToken, verifyToken } from '..'

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
})
