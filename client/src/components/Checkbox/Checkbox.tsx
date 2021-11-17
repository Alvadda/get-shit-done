import { css, keyframes } from '@emotion/react'
import React, { useState, VFC } from 'react'

interface CheckboxProps {
    onClick: Function
}

const checkAnimanton = keyframes`
        0% {
            height: 0;
            width: 0;
            opacity: 1;
        }
        20% {
            height: 0;
            width: 9px;
            opacity: 1;
        }
        40% {
            height: 18px;
            width: 9px;
            opacity: 1;
        }
        100% {
            height: 18px;
            width: 9px;
            opacity: 1;
        }
`

const checkboxCss = css`
    height: 24px;
    width: 24px;
    border-radius: 100px;
    border: 2px solid #fff;
    position: relative;

    .checkmark {
        display: block;
    }

    .checkmark.draw::after {
        animation: ${checkAnimanton} 800ms ease;
        transform: scale(-0.5, 0.5) rotate(135deg);
    }

    .checkmark::after {
        opacity: 1;
        height: 18px;
        width: 9px;
        transform-origin: left top;
        border-right: 4px solid #5cb85c;
        border-top: 4px solid #5cb85c;
        border-radius: 4px;
        content: '';
        left: 4px;
        top: 11px;
        position: absolute;
    }
`
const Checkbox: VFC<CheckboxProps> = ({ onClick }) => {
    const [isAktive, setIsAktive] = useState(false)
    return (
        <div
            data-testid="checkbox"
            css={checkboxCss}
            onClick={() => {
                setIsAktive(!isAktive)
                setTimeout(() => {
                    onClick()
                }, 650)
            }}
        >
            <div className={`${isAktive ? 'checkmark' : ''} draw`}></div>
        </div>
    )
}

export default Checkbox
