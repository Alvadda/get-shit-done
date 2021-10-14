import { css } from '@emotion/react'
import React, { useEffect, VFC } from 'react'
import { useTodoContext } from '../context/TodoContext'
import { readProjects } from '../utils/api'

interface SideBarProps {}

const sideBarCss = css`
    width: 100%;
    background-color: #063861;
    color: #fff;
    padding: 16px 24px;
`

const SideBar: VFC<SideBarProps> = () => {
    const { state, dispatch } = useTodoContext()

    useEffect(() => {
        readProjects().then((projects) => {
            dispatch({ type: 'SET_PROJECTS', projects })
        })
    }, [dispatch])

    const onSelectProject = (id?: string) => {
        dispatch({ type: 'SET_SELECTED_PROJECT', id: id || null })
    }

    return (
        <aside css={sideBarCss}>
            Projects
            {state.projects.map((project) => (
                <p key={project.id} onClick={() => onSelectProject(project.id)}>
                    {project.name}
                </p>
            ))}
        </aside>
    )
}

export default SideBar
