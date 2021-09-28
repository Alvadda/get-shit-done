import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtGenerator = (user_id: string) => {
    return jwt.sign({ user: user_id }, process.env.jwtSecret || '', {
        expiresIn: '5h',
    })
}

export default jwtGenerator
