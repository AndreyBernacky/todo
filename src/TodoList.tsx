import React, {ChangeEvent} from "react";
import {filterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type propsType = {
    id: string
    title: string
    task: Array<InArray>
    removeTask: (n: string, todolistId: string) => void
    changeFilter: (value: filterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    onChangeTodoListTitle: (id: string, newTitle: string) => void
    filter: filterValuesType
    removeTodoList: (todolistId: string) => void
}

export type InArray = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = (props: propsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onComplitedClickHandler = () => props.changeFilter('complited', props.id)

    const onRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }
    const onChangeTodoListTitle = (newTitle: string) => {
        props.onChangeTodoListTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan
                title={props.title}
                onChange={onChangeTodoListTitle}
            />
                <IconButton aria-label="delete" size="small" onClick={onRemoveTodoList}>
                    <Delete fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.task.map(t => {
                        const removeTask = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitle = (newTitle: string) => {
                            props.changeTaskTitle(t.id, newTitle, props.id)
                        }

                        return <div key={t.id} className={t.isDone ? "isdone" : ""}>
                            <Checkbox
                                   checked={t.isDone}
                                   onChange={onChangeHandler}
                            />
                            <EditableSpan
                                title={t.title}
                                onChange={onChangeTitle}/>
                            <IconButton aria-label="delete" size="small" onClick={removeTask}>
                                <Delete fontSize="inherit"/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        color={'inherit'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === "complited" ? "contained" : "text"}
                        color={'error'}
                        onClick={onComplitedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}


