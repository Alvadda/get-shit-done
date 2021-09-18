import WebSocket from 'ws'
import log from '../logger/logger'

const server = new WebSocket.Server({
    port: 8080,
})
log.info('WebSocket is listening on port 8080')

export default server
