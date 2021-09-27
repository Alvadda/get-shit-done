import { css } from '@emotion/react'
import React, { createRef, VFC } from 'react'

interface loginProps {
    onLogin: (email: string, password: string) => void
}

const loginCss = css`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;

    .login-container {
        display: grid;
        grid-template-columns: 1fr 1fr;

        width: 70%;
        height: 60%;

        border-radius: 4px;
        box-shadow: 10px 10px 8px -6px #ccc;

        .login-formular {
            display: flex;
            justify-content: center;
            align-items: center;

            height: 100%;
            background-color: #797676;
            border-bottom-left-radius: 8px;
            border-top-left-radius: 8px;

            .formular-conainer {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                width: 40%;
            }

            label,
            input {
                width: 100%;
            }

            input {
                height: 40px;

                padding: 8px 16px;
                margin-top: 8px;
                border-radius: 8px;
                border: none;
            }

            input:focus {
                outline: none;
            }

            button {
                height: 40px;
                padding: 8px 16px;

                color: #fff;
                background-color: black;
                border: none;
                border-radius: 8px;

                font-size: large;
                font-weight: bold;
                text-transform: uppercase;
            }

            button:active {
                opacity: 0.7;
            }

            .row {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }
        }

        .login-info {
            display: flex;
            justify-content: center;
            align-items: center;

            height: 100%;
            background-color: #36393b;
            border-bottom-right-radius: 8px;
            border-top-right-radius: 8px;
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
                        <label htmlFor="email">
                            <p>Email</p>
                            <input type="email" id="email" ref={emailRef}></input>
                        </label>

                        <label htmlFor="password">
                            <p>Password</p>
                            <input type="password" id="password" ref={passwordRef}></input>
                        </label>

                        <div className="row">
                            <p>Register</p>
                            <button
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quidem qui fugiat, consequatur recusandae ad nulla soluta
                    quisquam impedit pariatur repellendus illo. Dicta aliquam itaque quibusdam et ex, perferendis, expedita illo animi nihil
                    fugit magnam reiciendis quo facere cupiditate esse sit iure obcaecati odio voluptatem eum ullam. Distinctio, nobis id?
                    Itaque modi, consequuntur optio ratione accusamus nesciunt perspiciatis eaque mollitia rerum eius aliquid. Dolor illo
                    autem quos natus porro rem fugiat optio reiciendis est magni numquam dolorem, quaerat inventore sed libero iste aliquam
                    qui accusamus doloremque quae nisi magnam maxime ipsa. Vel dicta ab expedita eligendi dolore maiores iste repudiandae
                    incidunt, blanditiis ea similique aperiam qui non quasi doloribus, voluptate iure repellendus vero! Repellendus incidunt
                    quas dolore illo dolores neque, numquam harum quisquam, quia accusantium impedit aperiam recusandae. Molestias, deleniti
                    excepturi distinctio soluta laboriosam eligendi! Incidunt voluptas vero doloribus aut fugiat labore eum veniam
                </div>
            </div>
        </div>
    )
}

export default Login
