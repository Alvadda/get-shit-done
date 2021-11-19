import { rest } from 'msw'

const prefix = ''

export const handlers = [
    rest.post(`${prefix}/auth/login`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ userName: 'testUser', token: '12n3k1j2h31k4h132lkj12kj3h' }))
    }),
]
