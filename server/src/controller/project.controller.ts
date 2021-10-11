import { Project, IProjectConnector } from '../interfaces/project.interfaces'
import { Request, Response } from 'express'
import log from '../logger/logger'

export default class ProjectController {
    _projectConnector: IProjectConnector

    constructor(projectConnector: IProjectConnector) {
        this._projectConnector = projectConnector
    }

    readProjectsHandler = async (req: Request, res: Response) => {
        const userId = res.locals.userId
        try {
            const project = await this._projectConnector.readProjects(userId)
            res.json(project)
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }

    createProjectHandler = async (req: Request, res: Response) => {
        const userId = res.locals.userId
        const { name } = req.body
        try {
            const project = await this._projectConnector.createProject(userId, name)
            res.json(project)
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }
}
