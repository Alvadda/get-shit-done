import { getDDMMYYYY, isDateWithinOneWeekRange, isSameDay } from './helper'

describe('utils/helper', () => {
    test('p_is_same_day', async () => {
        expect(isSameDay(new Date(), new Date())).toBe(true)
    })

    test('n_is_not_same_day', async () => {
        const anotherDay = new Date()
        anotherDay.setMonth(1)
        expect(isSameDay(new Date(), anotherDay)).toBe(false)
    })

    test('p_get_formeted_date', async () => {
        expect(getDDMMYYYY(new Date('December 17, 1995'))).toBe('17.12.1995')
    })

    test('p_date_in_one_week_range', async () => {
        var endDate = new Date()
        endDate.setDate(endDate.getDate() + 4)
        expect(isDateWithinOneWeekRange(endDate)).toBe(true)
    })

    test('n_date_more_then_in_one_week_range', async () => {
        var date = new Date()
        date.setDate(date.getDate() + 9)
        expect(isDateWithinOneWeekRange(date)).toBe(false)
    })

    test('n_date_today', async () => {
        var date = new Date()
        expect(isDateWithinOneWeekRange(date)).toBe(false)
    })
})
