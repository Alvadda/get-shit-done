import { css } from '@emotion/react'
import React, { createRef, VFC } from 'react'

interface loginProps {
    onLogin: (email: string, password: string) => void
}

const loginCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(243.01deg, #001528 -0.25%, #012a4a 93.73%);

    height: 100vh;

    .login-container {
        display: grid;
        grid-template-columns: 468px 1fr;

        width: 1100px;
        height: 800px;

        border-radius: 10px;
        box-shadow: 0px 7px 15px 3px rgba(0, 0, 0, 0.25);

        .login-formular {
            display: flex;
            justify-content: center;
            align-items: center;

            padding: 0 70px;
            background-color: #f4f9fe;
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;

            .formular-conainer {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                width: 100%;
            }

            label,
            input {
                width: 100%;
            }

            label {
                margin-bottom: 20px;
            }

            input {
                height: 50px;

                padding: 8px 16px;
                margin-top: 8px;

                background: #ffffff;
                box-shadow: 0px 7px 6px rgba(0, 0, 0, 0.15);
                border-radius: 10px;
                border-radius: 8px;
                border: none;

                font-size: 22px;
            }

            input:focus {
                /* outline: none; */
                outline-color: #00162b;
            }

            .login-text {
                width: 100%;
                font-weight: bold;
                font-size: 47px;
                line-height: 1.1;
                display: flex;
                align-items: center;
                letter-spacing: -0.03em;
                margin-bottom: 40px;
            }

            .login-btn {
                height: 40px;
                padding: 8px 16px;

                background: #00162b;
                border-radius: 10px;
                border: none;

                color: #f4f9fe;
                font-size: 22px;
            }

            .register-btn {
                height: 40px;
                padding: 8px 16px;

                background: #f4f9fe;
                border: 2px solid #00162b;
                box-sizing: border-box;
                border-radius: 10px;

                color: #00162b;
                font-size: 22px;
            }

            button:active {
                opacity: 0.7;
            }

            .row {
                margin-top: 40px;
                display: flex;
                justify-content: space-between;
                width: 100%;
            }
        }

        .login-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
            padding: 0 70px;

            height: 100%;
            background-color: #002848;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;

            .login-info-todo {
                height: 50px;
                width: 100%;

                border-radius: 10px;
                background-color: #f4f9fe;
            }

            .login-info-todo:nth-child(odd) {
                background-color: #f4f9fe;
            }
            .login-info-todo:nth-child(even) {
                background-color: #013865;
            }
        }
    }
`

const Login: VFC<loginProps> = ({ onLogin }) => {
    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    return (
        <div css={loginCss}>
            <div className="login-container">
                <div className="login-formular">
                    <div className="formular-conainer">
                        <p className="login-text">
                            Login & <br />
                            GET SHIT DONE
                        </p>
                        <label htmlFor="email">
                            <p>Email</p>
                            <input type="email" id="email" ref={emailRef}></input>
                        </label>

                        <label htmlFor="password">
                            <p>Password</p>
                            <input type="password" id="password" ref={passwordRef}></input>
                        </label>

                        <div className="row">
                            <button className="register-btn">Register</button>
                            <button
                                className="login-btn"
                                onClick={() => {
                                    if (emailRef.current?.value && passwordRef.current?.value) {
                                        onLogin(emailRef.current?.value, passwordRef.current?.value)
                                    }
                                }}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div className="login-info">
                    <div className="login-info-todo"></div>
                    <div className="login-info-todo"></div>
                    <div className="login-info-todo"></div>
                    <div className="login-info-todo"></div>
                    <div className="login-info-todo"></div>
                    <div className="login-info-todo"></div>
                </div>
            </div>
        </div>
    )
}

export default Login
