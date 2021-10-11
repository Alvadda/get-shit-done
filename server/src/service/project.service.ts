import { QueryResult } from 'pg'
import dbCtx from '../database/dbConnect'
import log from '../logger/logger'
import { Project, IProjectConnector } from '../interfaces/project.interfaces'

export class ProjectConnector implements IProjectConnector {
    private readonly _db = dbCtx

    async readProjects(userId: string) {
        try {
            const projectsDb = await this._db.query('SELECT * FROM projects WHERE user_id = ($1)', [userId])
            return this._mapProjects(projectsDb)
        } catch (error) {
            log.error('cant read projects', error)
        }
    }

    async createProject(userId: string, name: string) {
        try {
            const projectsDb = await this._db.query('INSERT INTO projects (name, user_id) VALUES ($1, $2) RETURNING *', [name, userId])
            return this._mapProjects(projectsDb)
        } catch (error) {
            log.error(`cant create projects ${name} error: ${error}`)
        }
    }

    async deleteProject(projectId: string) {
        try {
            await this._db.query('DELETE FROM projects WHERE projects_id = ($1)', [projectId])
            return true
        } catch (error) {
            log.error(`cant delete project with Id ${projectId}`, error)
            return false
        }
    }

    _mapProjects = (resultDb: QueryResult<any>) => {
        const projects: Project[] = []
        if (resultDb.rows.length > 0) {
            resultDb.rows.forEach((project) => {
                projects.push({
                    id: project.project_id,
                    name: project.project_name,
                })
            })
        }
        return projects
    }
}
