import log from './logger/logger'
import startServer from './server'
import ProjectConnector from './service/project.service'
import TodoPostgresConnector from './service/todo.service'
import UserPostgresConnector from './service/user.service'

const app = startServer(new TodoPostgresConnector(), new UserPostgresConnector(), new ProjectConnector())

app.listen(5000, () => {
    log.info('server is listening on port 5000')
})
