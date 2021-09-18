import { Application } from 'express'
import express from 'express'
import log from './logger/logger'
import todosRoutes from './routes/todos.routes'
import authRoutes from './routes/auth.routes'
import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//Routes
app.use('/todos', todosRoutes)
app.use('/auth', authRoutes)

app.listen(5000, () => {
    log.info('server is listening on port 5000')
})
