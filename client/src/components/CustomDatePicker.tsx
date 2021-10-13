import React, { VFC } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface CostumeDataPickerProps {
    date: Date
    setDate: Function
}

const CostumDatePicker: VFC<CostumeDataPickerProps> = ({ date, setDate }) => {
    return <DatePicker selected={date} onChange={(date: Date) => setDate(date)} />
}

export default CostumDatePicker
