import { object, string } from 'yup'

const createProjectSchema = object({
    body: object({
        name: string().required('Name is required'),
    }),
})

export { createProjectSchema }
