import { css } from '@emotion/react'
import React, { createRef, FormEvent, useEffect, useState, VFC } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useAppSelector } from '../../hooks/useAppSelector'
import { ProjectTypes } from '../../types/appContext.types'
import { readProjects, createProject, createSendTodoSession } from '../../utils/api'
import ProjectItem from '../Project/Project'
import Plus from '../Svg/Plus'

const sideBarCss = css`
    width: 100%;
    background-color: #063861;
    color: #fff;
    padding: 16px 24px;

    form {
        display: flex;
        gap: 12px;

        margin-top: 32px;
    }

    form input {
        width: 100%;
    }
    form button {
        width: 30px;
        height: 30px;

        background-color: transparent;
        border: none;

        font-family: inherit;
        cursor: pointer;

        svg {
            stroke: #fff;
        }
    }

    .project {
        display: flex;
        gap: 8px;

        p {
            cursor: pointer;
        }
    }

    .link-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .link-categorie {
        display: flex;
        gap: 12px;
    }
`

const SideBar: VFC = () => {
    const { state, dispatch } = useAppContext()
    const { selectTodosInbox, selectTodosNow, selectTodosSoon, selectTodosFromProject } = useAppSelector()

    const projectRef = createRef<HTMLInputElement>()
    const sendTodoSessionLinkRef = createRef<HTMLInputElement>()
    const sendTodoSessionDaysRef = createRef<HTMLInputElement>()
    const sendTodoSessionTodosRef = createRef<HTMLInputElement>()
    const [link, setLink] = useState<string>('')

    useEffect(() => {
        readProjects().then((projects) => {
            dispatch({ type: 'SET_PROJECTS', projects })
        })
    }, [dispatch])

    const onSelectProject = (selectProjectType: ProjectTypes, id?: string) => {
        dispatch({ type: 'SET_SELECTED_PROJECT', selectProjectType, id })
    }

    const onAddProject = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!projectRef.current?.value) return
        const newProject = await createProject(projectRef.current.value)
        dispatch({ type: 'ADD_PROJECTS', projects: newProject })
    }

    const sendTodoSessionLink = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const guid = await createSendTodoSession(
            Number(sendTodoSessionTodosRef.current?.value),
            Number(sendTodoSessionDaysRef.current?.value)
        )
        setLink(`http://localhost:3000/${guid}`)
        console.log(link)
    }
    return (
        <aside css={sideBarCss}>
            <div data-testid="project-container">
                <div className="project">
                    <p onClick={() => onSelectProject(ProjectTypes.Inbox)}>Inbox</p>
                    <div data-testid="inbox-number">{selectTodosInbox.length}</div>
                </div>
                <div className="project">
                    <p onClick={() => onSelectProject(ProjectTypes.DoNow)}>DO NOW</p>
                    <div data-testid="do-now-number">{selectTodosNow.length}</div>
                </div>
                <div className="project">
                    <p onClick={() => onSelectProject(ProjectTypes.DoSoon)}>DO SOON</p>
                    <div data-testid="do-soon-number">{selectTodosSoon.length}</div>
                </div>

                {state.projects.map((project) => {
                    const numberOfTodos = selectTodosFromProject(project.id).length
                    return <ProjectItem key={project.id} project={project} onSelect={onSelectProject} numberOfTodos={numberOfTodos} />
                })}
            </div>
            <form onSubmit={onAddProject}>
                <button data-testid="add-project">
                    <Plus />
                </button>
                <input type="text" placeholder="new Project" ref={projectRef} />
            </form>
            <form className="link-container" onSubmit={sendTodoSessionLink}>
                <div className="link-categorie">
                    <button data-testid="get-link">
                        <Plus />
                    </button>
                    <input id="sendTodoSessionLink" type="text" placeholder="Link" readOnly ref={sendTodoSessionLinkRef} value={link} />
                </div>
                <div className="link-categorie">
                    <input id="sendTodoSessionLink" type="number" placeholder="Todos" ref={sendTodoSessionDaysRef} />
                    <input id="sendTodoSessionLink" type="number" placeholder="Days" ref={sendTodoSessionTodosRef} />
                </div>
            </form>
        </aside>
    )
}

export default SideBar
