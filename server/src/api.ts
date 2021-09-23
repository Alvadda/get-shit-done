import log from './logger/logger'
import startServer from './server'
import TodoPostgresConnector from './service/todo.service'

const app = startServer(new TodoPostgresConnector())

app.listen(5000, () => {
    log.info('server is listening on port 5000')
})
