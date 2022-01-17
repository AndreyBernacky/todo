import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";

export type propsType = {
    id:string
    title: string
    task: Array<InArray>
    removeTask: (n: string, todolistId:string) => void
    changeFilter: (value: filterValuesType, todolistId:string) => void
    addTask: (title: string, todolistId:string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId:string) => void
    filter: filterValuesType
    removeTodoList:(todolistId:string) => void
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
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if(newTaskTitle.trim() !== ""){
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle("")
        } else {
            setError("Input required")
        }

    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onComplitedClickHandler = () => props.changeFilter('complited', props.id)

    const onRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={onRemoveTodoList}>x</button></h3>
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
                        const removeTask = () => {props.removeTask(t.id, props.id)}
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
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