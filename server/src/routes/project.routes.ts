import { IProjectConnector } from './../interfaces/project.interfaces'
import { Router } from 'express'
import { createProjectSchema } from '../schema/projects.schema'
import ProjectController from '../controller/project.controller'
import valdiation from '../middleware/validation.middleware'
import authorization from '../middleware/auth.middleware'

const router = Router()

export const initProjectRoute = (connector: IProjectConnector) => {
    const _controller = new ProjectController(connector)

    router.get('/', authorization, _controller.readProjectsHandler)
    router.post('/', valdiation(createProjectSchema), authorization, _controller.createProjectHandler)
}

export default router
