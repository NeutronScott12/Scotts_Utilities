import { sluggify, normalisePort } from '..'

describe('Testing Common Utilties', () => {
    test('Sluggify word', () => {
        expect(sluggify('second one')).toBe('second-one')
    })

    test('Normalise Port', () => {
        expect(normalisePort('4000')).toBe(4000)
    })
})
