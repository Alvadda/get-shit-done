import { css } from '@emotion/react'
import React, { useEffect, useState, VFC } from 'react'
import { Project, readProjects } from '../utils/api'

interface SideBarProps {}

const sideBarCss = css`
    width: 100%;
    background-color: #063861;
    color: #fff;
    padding: 16px 24px;
`

const SideBar: VFC<SideBarProps> = () => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        readProjects().then((projects) => {
            setProjects(projects)
        })
    }, [])

    return (
        <aside css={sideBarCss}>
            Projects
            {projects.map((project) => (
                <p key={project.id}>{project.name}</p>
            ))}
        </aside>
    )
}

export default SideBar
