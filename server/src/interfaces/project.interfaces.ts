export interface Project {
    id: string
    name: string
}

export interface IProjectConnector {
    readProjects: (userId: string) => Promise<Project[] | undefined>
    createProject: (userId: string, name: string) => Promise<Project[] | undefined>
    deleteProject: (ProjectId: string) => Promise<boolean>
}
