import pg from 'pg'
import log from '../logger/logger'
import dotenv from 'dotenv'

dotenv.config()
var pg_client = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
})

pg_client.connect().then(() => {
    log.info('DB Connected')
})

export default pg_client
