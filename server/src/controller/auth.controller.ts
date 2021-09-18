import { Request, Response } from 'express'
import { createUser, readUser } from '../service/user.service'
import bcrypt from 'bcrypt'
import log from '../logger/logger'
import jwtGenerator from '../config/utils/jwtGenerator'

const registerHandler = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    try {
        const user = await readUser(email)
        if (user !== null) return res.status(401).send('User alrdy exist')

        const encryptedPassword = await encryptPassword(password)
        const newUser = await createUser(name, email, encryptedPassword)

        if (newUser == null) return res.sendStatus(401)
        const token = jwtGenerator(newUser.id)

        res.json({ token })
    } catch (err: any) {
        log.error(err.message)
        res.sendStatus(500)
    }
}

const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await readUser(email)
        if (user == null) return res.status(404).send('Password or Email is incorrect')

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return res.status(403).send('Password or Email is incorrect')

        const token = jwtGenerator(user.id)
        res.json({ token })
    } catch (err: any) {
        log.error(err.message)
        res.sendStatus(500)
    }
}

const testHandler = async (req: Request, res: Response) => {
    console.log('userid:', res.locals.userId)
    res.json()
}

const encryptPassword = async (playTextPassword: string) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(playTextPassword, salt)
}

export { registerHandler, loginHandler, testHandler }
