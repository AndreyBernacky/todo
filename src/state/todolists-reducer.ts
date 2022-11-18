import {filterValuesType, todoListsType} from "../AppWithReducers";
import {v1} from "uuid";

export type removeTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type addTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type changeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string,
    title: string
}
export type changeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string,
    filter: filterValuesType
}
type actionsType = removeTodoListActionType |
    addTodoListActionType |
    changeTodoListTitleActionType | changeTodoListFilterActionType

export const todolistsReducer = (state: Array<todoListsType>, action: actionsType): Array<todoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
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

export const removeTodoListAC = (todoListId: string): removeTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
export const addTodoListAC = (todoListTitle: string): addTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: todoListTitle, todolistId: v1()}
}
export const changeTodoListTitleAC = (todoListId: string, todoListTitle: string): changeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: todoListTitle, id: todoListId}
}
export const changeTodoListFilterAC = (todoListFilter: filterValuesType, todoListId: string): changeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: todoListFilter, id: todoListId}
}