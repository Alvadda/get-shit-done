import React, { VFC } from 'react'
import { ProjectTypes } from '../../types/appContext.types'
import { Project } from '../../utils/api'

interface ProjectItemProps {
    project: Project
    numberOfTodos: number
    onSelect: (selectProjectType: ProjectTypes, id?: string) => void
}

const ProjectItem: VFC<ProjectItemProps> = ({ project, onSelect, numberOfTodos }) => {
    return (
        <div>
            <p onClick={() => onSelect(ProjectTypes.Id, project.id)}>
                {project.name} {numberOfTodos}
            </p>
        </div>
    )
}

export default ProjectItem
