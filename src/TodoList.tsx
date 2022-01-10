import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";

export type propsType = {
    title: string
    task: Array<InArray>
    removeTask: (n: string) => void
    changeFilter: (value: filterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: filterValuesType
}

export type InArray = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = (props: propsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if(newTaskTitle.trim() !== ""){
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError("Input required")
        }

    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onComplitedClickHandler = () => props.changeFilter('complited')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                { error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.task.map(t => {
                        const removeTask = () => {props.removeTask(t.id)}
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }

                        return <li key={t.id} className={t.isDone ? "isdone" : ""}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={ onChangeHandler }
                        />
                        <span>{t.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>})
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter": ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter": ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "complited" ? "active-filter": ""} onClick={onComplitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}