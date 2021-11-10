import React, { createRef, VFC } from 'react'
import { useAppContext } from '../context/AppContext'
import { Project } from '../utils/api'

interface SelectProjectProps {
    onSelect: (project: Project) => void
}

const SelectProject: VFC<SelectProjectProps> = ({ onSelect }) => {
    const { state } = useAppContext()
    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const projectId = event.target.value
        const project = state.projects.find((project) => project.id.toString() === projectId)
        if (!project) return

        onSelect(project)
    }
    return (
        <select onChange={(e) => onSelectChange(e)}>
            <option value=""> Select a Project:</option>
            {state.projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
            ))}
        </select>
    )
}

export default SelectProject
