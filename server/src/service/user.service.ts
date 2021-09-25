import { QueryResult } from 'pg'
import dbCtx from '../database/dbConnect'
import { IUserConnector, User } from '../interfaces/user.interfaces'
import log from '../logger/logger'

export default class UserPostgresConnector implements IUserConnector {
    private readonly _db = dbCtx

    async readUser(email: string) {
        try {
            const resultDb = await this._db.query('SELECT * FROM users WHERE user_email = $1', [email])
            return mapUser(resultDb)
        } catch (error) {
            log.error(`cant read users${error}`)
        }
    }

    async createUser(name: string, email: string, password: string) {
        try {
            const resultDb = await this._db.query(
                'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
                [name, email, password]
            )
            return mapUser(resultDb)
        } catch (error) {
            log.error(`cant read users${error}`)
        }
    }
}

const mapUser = (resultDb: QueryResult<any>): User | undefined => {
    if (resultDb.rows.length === 0) return undefined

    const user: User = {
        id: resultDb.rows[0].user_id,
        name: resultDb.rows[0].user_name,
        email: resultDb.rows[0].user_email,
        password: resultDb.rows[0].user_password,
    }

    return user
}
