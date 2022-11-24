import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {InArray} from "./TodoList";

export type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    removeTask: (n: string, todolistId: string) => void
    task: InArray
    todolistid: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistid)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistid)
    }
    const onChangeTitle = useCallback( (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistid)
    },[props.changeTaskTitle, props.task.id, props.todolistid])

    return <div className={props.task.isDone ? "isdone" : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeHandler}
        />
        <EditableSpan
            title={props.task.title}
            onChange={onChangeTitle}/>
        <IconButton aria-label="delete" size="small" onClick={removeTask}>
            <Delete fontSize="inherit"/>
        </IconButton>
    </div>
})