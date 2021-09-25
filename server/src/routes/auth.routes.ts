import { Router } from 'express'
import { loginSchema, registerSchema } from '../schema/auth.schema'
import { IUserConnector } from '../interfaces/user.interfaces'
import AuthController from '../controller/auth.controller'
import valdiation from '../middleware/validation.middleware'

const router = Router()

export const initAuthRoute = (connector: IUserConnector) => {
    const controller = new AuthController(connector)

    router.post('/register', valdiation(registerSchema), controller.registerHandler)
    router.post('/login', valdiation(loginSchema), controller.loginHandler)
}

export default router
