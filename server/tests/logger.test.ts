import { formatErrorMessage } from '../src/logger/logger'

describe('logger', () => {
    test('p_formatErrorMessage', () => {
        const errorMessage = formatErrorMessage('test')

        const expected = { errorMessage: 'test' }
        expect(errorMessage).toMatchObject(expected)
        expect(errorMessage.errorMessage).toBe('test')
    })
})
