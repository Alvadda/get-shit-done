import { formatErrorMessage } from './../logger/logger'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import log from '../logger/logger'
import jwtGenerator from '../config/utils/jwtGenerator'
import { IUserConnector } from '../interfaces/user.interfaces'

export default class AuthController {
    userConnector: IUserConnector

    constructor(userConnector: IUserConnector) {
        this.userConnector = userConnector
    }

    registerHandler = async (req: Request, res: Response) => {
        const { name, email, password } = req.body
        try {
            const user = await this.userConnector.readUser(email)

            if (user) return res.status(401).json(formatErrorMessage('User alrdy exist'))

            const encryptedPassword = await encryptPassword(password)
            const newUser = await this.userConnector.createUser(name, email, encryptedPassword)

            if (!newUser) return res.sendStatus(401)
            const token = jwtGenerator(newUser.id)

            res.json({ token })
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }

    loginHandler = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user = await this.userConnector.readUser(email.toLowerCase())
            if (!user) return res.status(403).json(formatErrorMessage('Password or Email is incorrect'))

            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) return res.status(403).json(formatErrorMessage('Password or Email is incorrect'))

            const token = jwtGenerator(user.id)
            res.json({ userName: user.name, token })
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }
}

const encryptPassword = async (playTextPassword: string) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(playTextPassword, salt)
}
