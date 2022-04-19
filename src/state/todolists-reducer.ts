import {filterValuesType, todoListsType} from "../App";
import {v1} from "uuid";

type removeTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type addTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
type changeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type changeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: filterValuesType
}
type actionsType = removeTodoListActionType |
    addTodoListActionType |
    changeTodoListTitleActionType |
    changeTodoListFilterActionType

export const todolistsReducer = (state: Array<todoListsType>, action: actionsType): Array<todoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(f => f.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(f => f.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this AT")
    }

}

export const RemoveTodoListAC = (todoListId:string):removeTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id:todoListId}
}
export const AddTodoListAC = (todoListTitle:string):addTodoListActionType => {
    return {type: 'ADD-TODOLIST', title:todoListTitle}
}
export const ChangeTodoListTitleAC = (todoListId:string, todoListTitle:string):changeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title:todoListTitle, id:todoListId}
}
export const ChangeTodoListFilterAC = (todoListId:string, todoListFilter:filterValuesType):changeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id:todoListId, filter:todoListFilter}
}