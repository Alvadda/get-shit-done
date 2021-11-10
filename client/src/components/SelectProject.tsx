import React, { createRef, VFC } from 'react'
import { Project } from '../utils/api'

interface SelectProjectProps {
    projects: Project[]
    onSelect: (project: Project) => void
}

const onSelectChange = () => {}

const SelectProject: VFC<SelectProjectProps> = ({ projects, onSelect }) => {
    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const projectId = event.target.value
        const project = projects.find((project) => project.id.toString() === projectId)
        if (!project) return

        onSelect(project)
    }
    return (
        <select onChange={(e) => onSelectChange(e)}>
            <option value=""> Select a Project:</option>
            {projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
            ))}
        </select>
    )
}

export default SelectProject
