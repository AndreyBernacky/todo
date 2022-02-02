import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(newTitle:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activateEditMode = () => {
        setTitle(props.title)
        setEditMode(true)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode ?
            <input
                value={title}
                onBlur={activateViewMode}
                autoFocus
                onChange={onChangeTitleHandler}
            /> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}