import React, {useCallback} from "react";
import {filterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

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

export const TodoList = React.memo((props: propsType) => {

    console.log("TodoList is called")

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onComplitedClickHandler = useCallback(() => props.changeFilter('complited', props.id), [props.changeFilter, props.id])

    const onRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }
    const onChangeTodoListTitle = useCallback((newTitle: string) => {
        props.onChangeTodoListTitle(props.id, newTitle)
    }, [props.onChangeTodoListTitle, props.id])

    let tasksForToDoList = props.task

    if (props.filter === "active") {
        tasksForToDoList = props.task.filter(t => t.isDone === false)
    }
    if (props.filter === "complited") {
        tasksForToDoList = props.task.filter(t => t.isDone === true)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

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
                    props.task.map(t => <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistid={props.id}
                        key={t.id}
                    />)
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
})


