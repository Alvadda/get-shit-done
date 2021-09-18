import { object, string, number } from 'yup'

const registerSchema = object({
    body: object({
        name: string().required('Name is required'),
        email: string().email('Must be a valid email').max(255).required('Email is required'),
        password: string().required('password is required'),
    }),
})

const loginSchema = object({
    body: object({
        email: string().email('Must be a valid email').max(255).required('Email is required'),
        password: string().required('password is required'),
    }),
})

export { registerSchema, loginSchema }
