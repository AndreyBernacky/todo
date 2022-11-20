import {tasksStateType} from "../AppWithReducers";
import {v1} from "uuid";
import {addTodoListActionType, removeTodoListActionType, todolistId1, todolistId2} from "./todolists-reducer"

type removeTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
type changeStatusTaskActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todoListId: string
    taskId: string
}
type changeStatusTaskTitileType = {
    type: 'CHANGE-TASK-TITLE'
    taskTitle: string
    todoListId: string
    taskId: string
}

type actionsType = removeTaskActionType | changeStatusTaskTitileType |
    addTaskActionType | changeStatusTaskActionType | addTodoListActionType |
    removeTodoListActionType

const initialState:tasksStateType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: 'Book', isDone: false},
        {id: v1(), title: 'Bear', isDone: true}
    ]
}



export const tasksReducer = (state: tasksStateType = initialState, action: actionsType): tasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks

            return stateCopy
        }
        case 'ADD-TASK': {
            let stateCopy = {...state}
            const tasks = state[action.todoListId]
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let newTasks = [newTask, ...tasks]
            stateCopy[action.todoListId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCppy = {...state}
            const tasks = stateCppy[action.todoListId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCppy
        }
        case "CHANGE-TASK-TITLE": {
            let stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.taskTitle
            }
            return stateCopy
        }
        case "ADD-TODOLIST":{
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todoListId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}
export const addTaskAC = (taskTitle: string, todoListId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title: taskTitle, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): changeStatusTaskActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, taskId, todoListId}
}

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todoListId: string): changeStatusTaskTitileType => {
    return {type: 'CHANGE-TASK-TITLE', taskTitle, taskId, todoListId}
}
