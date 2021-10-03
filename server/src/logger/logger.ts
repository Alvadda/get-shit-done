import logger from 'pino'
import dayjs from 'dayjs'

export const formatErrorMessage = (error: string) => {
    return {
        errorMessage: error,
    }
}

const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})

export default log
