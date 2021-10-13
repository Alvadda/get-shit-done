import { css } from '@emotion/react'
import React, { createRef, VFC } from 'react'
import { theme } from '../../utils/Theme'

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

        border-radius: ${theme.borderRadius[1]};
        box-shadow: 0px 7px 15px 3px rgba(0, 0, 0, 0.25);

        .login-formular {
            display: flex;
            justify-content: center;
            align-items: center;

            padding: 0 ${theme.spacing['6-4']};
            background-color: ${theme.colors.backgroundLight};
            border-bottom-left-radius: ${theme.borderRadius[1]};
            border-top-left-radius: ${theme.borderRadius[1]};
            .formular-conainer {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: ${theme.spacing['0-8']};
                width: 100%;
            }

            label,
            input {
                width: 100%;
            }

            label {
                margin-bottom: ${theme.spacing['3-2']};
            }

            input {
                height: 50px;

                padding: ${theme.spacing['0-8']} ${theme.spacing['1-6']};
                margin-top: ${theme.spacing['0-8']};

                background: #ffffff;
                box-shadow: 0px 7px 6px rgba(0, 0, 0, 0.15);
                border-radius: ${theme.borderRadius[1]};
                border-radius: ${theme.borderRadius['0-8']};
                border: none;

                font-size: ${theme.fontSize['2-4']};
            }

            input:focus {
                /* outline: none; */
                outline-color: ${theme.colors.backgroundDark};
            }

            .login-text {
                width: 100%;
                font-weight: bold;
                font-size: ${theme.fontSize['4-4']};
                line-height: 1.1;
                display: flex;
                align-items: center;
                letter-spacing: -0.03em;
                margin-bottom: ${theme.spacing['3-2']};
            }

            .login-btn {
                height: 40px;
                padding: ${theme.spacing['0-8']} ${theme.spacing['1-6']};

                background: ${theme.colors.backgroundDark};
                border-radius: ${theme.borderRadius[1]};
                border: none;

                color: ${theme.colors.backgroundLight};
                font-size: ${theme.fontSize['2-4']};
            }

            .register-btn {
                height: 40px;
                padding: ${theme.spacing['0-8']} ${theme.spacing['1-6']};

                background: ${theme.colors.backgroundLight};
                border: 2px solid ${theme.colors.backgroundDark};
                border-radius: ${theme.borderRadius[1]};

                color: ${theme.colors.backgroundDark};
                font-size: ${theme.fontSize['2-4']};
            }

            button:active {
                opacity: 0.7;
            }

            .row {
                margin-top: ${theme.spacing['3-2']};
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
            gap: ${theme.spacing['3-2']};
            padding: 0 ${theme.spacing['6-4']};

            height: 100%;
            background-color: ${theme.colors.backgroundDarkLight};
            border-bottom-right-radius: ${theme.borderRadius[1]};
            border-top-right-radius: ${theme.borderRadius[1]};

            .login-info-todo {
                height: 50px;
                width: 100%;

                border-radius: ${theme.borderRadius[1]};
                background-color: ${theme.colors.backgroundLight};
            }

            .login-info-todo:nth-of-type(odd) {
                background-color: ${theme.colors.backgroundLight};
            }
            .login-info-todo:nth-of-type(even) {
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
