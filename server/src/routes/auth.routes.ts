import { Router } from 'express'
import { loginSchema, registerSchema } from '../schema/auth.schema'
import { loginHandler, registerHandler, testHandler } from '../controller/auth.controller'
import valdiation from '../middleware/validation.middleware'
import authorization from '../middleware/auth.middleware'

const router = Router()

router.post('/register', valdiation(registerSchema), registerHandler)
router.post('/login', valdiation(loginSchema), loginHandler)
router.post('/verify', valdiation(loginSchema), authorization, testHandler)

export default router
