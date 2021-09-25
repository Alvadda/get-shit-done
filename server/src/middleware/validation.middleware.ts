import { formatErrorMessage } from './../logger/logger'
import { AnySchema } from 'yup'
import { NextFunction, Request, Response } from 'express'
import log from '../logger/logger'

const valdiation = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        })

        return next()
    } catch (error: any) {
        log.error(error.message)
        res.status(400).json(formatErrorMessage(error.message))
    }
}

export default valdiation
