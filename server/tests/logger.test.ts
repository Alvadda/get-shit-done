import { formatErrorMessage } from '../src/logger/logger'

describe('logger', () => {
    test('p_formatErrorMessage', () => {
        const errorMessage = formatErrorMessage('test')

        const expected = { message: 'test' }
        expect(errorMessage).toMatchObject(expected)
        expect(errorMessage.message).toBe('test')
    })
})
