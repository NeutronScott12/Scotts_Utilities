import { sluggify, normalisePort, consolePrint } from '..'

describe('Testing Common Utilties', () => {
    test('Sluggify word', () => {
        expect(sluggify('second one')).toBe('second-one')
    })

    test('Normalise Port', () => {
        expect(normalisePort('4000')).toBe(4000)
    })

    test('Test Consoleprint to return single output', async () => {
        expect(await consolePrint('bob was here')).toBeDefined()
    })
})
