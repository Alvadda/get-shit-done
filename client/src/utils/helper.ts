export const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth()
}

export const getDDMMYYYY = (date: Date) => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

export const isDateWithinOneWeekRange = (date: Date) => {
    var inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    var today = new Date()
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    var endDate = new Date(today)
    endDate.setDate(endDate.getDate() + 8)

    if (inputDate > today && inputDate < endDate) {
        return true
    }
    return false
}
