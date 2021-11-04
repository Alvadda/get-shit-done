import { IProjectConnector, Project } from '../../src/interfaces/project.interfaces'

const todos: Project[] = [
    {
        id: '1',
        name: 'Project 1',
    },
    {
        id: '2',
        name: 'Project 1',
    },
    {
        id: '3',
        name: 'Project 1',
    },
]
export class ProjectConnectorMock implements IProjectConnector {
    readProjects = jest.fn()
    createProject = jest.fn()
    deleteProject = jest.fn()
}
