import { css } from '@emotion/react'
import React, { useEffect, VFC } from 'react'
import { useAppContext } from '../context/AppContext'
import { ProjectTypes } from '../types/appContext.types'
import { readProjects } from '../utils/api'
import ProjectItem from './Project'

interface SideBarProps {}

const sideBarCss = css`
    width: 100%;
    background-color: #063861;
    color: #fff;
    padding: 16px 24px;
`

const SideBar: VFC<SideBarProps> = () => {
    const { state, dispatch } = useAppContext()

    useEffect(() => {
        readProjects().then((projects) => {
            dispatch({ type: 'SET_PROJECTS', projects })
        })
    }, [dispatch])

    const onSelectProject = (selectProjectType: ProjectTypes, id?: string) => {
        dispatch({ type: 'SET_SELECTED_PROJECT', selectProjectType, id })
    }

    return (
        <aside css={sideBarCss}>
            <p onClick={() => onSelectProject(ProjectTypes.Inbox)}>Inbox</p>
            <p onClick={() => onSelectProject(ProjectTypes.DoNow)}>DO NOW</p>
            <p onClick={() => onSelectProject(ProjectTypes.DoSoon)}>DO SOON</p>
            {state.projects.map((project) => (
                <ProjectItem project={project} onSelect={onSelectProject} />
            ))}
        </aside>
    )
}

export default SideBar
