import { NextFunction, Request, Response } from 'express'
import log from '../logger/logger'
import jtw from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('jwt_token')
    if (!token) return res.status(403).send('authorization denied')

    try {
        const verify: any = jtw.verify(token, process.env.jwtSecret || '')
        res.locals.userId = verify.user
        return next()
    } catch (error: any) {
        log.error(error.message)
        res.status(500).send(error.message)
    }
}

export default authorization
