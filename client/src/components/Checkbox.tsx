import { css } from '@emotion/react'
import React, { useState, VFC } from 'react'

interface CheckboxProps {
    onClick: Function
}

const checkboxCss = css`
    height: 24px;
    width: 24px;
    border-radius: 100px;
    border: 2px solid #fff;
    position: relative;

    .checkmark {
        display: block;
    }

    .checkmark::after {
        opacity: 1;
        height: 9px;
        width: 19px;
        transform-origin: left top;
        border-right: 4px solid #5cb85c;
        border-top: 4px solid #5cb85c;
        content: '';
        left: 17px;
        top: 8px;
        position: absolute;
        transform: scale(0.5) rotate(135deg);
    }
`
const Checkbox: VFC<CheckboxProps> = ({ onClick }) => {
    const [isAktive, setIsAktive] = useState(false)
    return (
        <div
            css={checkboxCss}
            onClick={() => {
                setIsAktive(!isAktive)
                setTimeout(() => {
                    onClick()
                }, 50)
            }}
        >
            <div className={`${isAktive ? 'checkmark' : ''} draw`}></div>
        </div>
    )
}

export default Checkbox
