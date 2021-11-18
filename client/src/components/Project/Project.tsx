import { css } from '@emotion/react'
import React, { VFC } from 'react'
import { ProjectTypes } from '../../types/appContext.types'
import { Project } from '../../utils/api'

interface ProjectItemProps {
    project: Project
    numberOfTodos: number
    onSelect: (selectProjectType: ProjectTypes, id?: string) => void
}

const projectItemCss = css`
    display: flex;
    gap: 8px;
`

const ProjectItem: VFC<ProjectItemProps> = ({ project, onSelect, numberOfTodos }) => {
    return (
        <div css={projectItemCss}>
            <p onClick={() => onSelect(ProjectTypes.Id, project.id)}>{project.name}</p>
            <div data-testid={`${project.name}-number`}>{numberOfTodos}</div>
        </div>
    )
}

export default ProjectItem
