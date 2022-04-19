import {v1} from "uuid";
import {filterValuesType, todoListsType} from "../App";
import {
    AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolists-reducer";
import * as console from "console";

test('Coorect todo should be removed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: "What to lern", filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "all"}
    ]

    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
});

test('Coorect todo should be Added', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoTitle = 'New todo'

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: "What to lern", filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "all"}
    ]

    const endState = todolistsReducer(startState, AddTodoListAC(newTodoTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoTitle)
    expect(endState[2].filter).toBe("all")
});

test('Coorect todo should Change todo Name', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoTitle = 'New todo'

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: "What to lern", filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "all"}
    ]

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(todolistId1, newTodoTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodoTitle)
});

test('Coorect todo should Change todo Filter', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodoFilter = 'active'

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: "What to lern", filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "all"}
    ]

    const action = ChangeTodoListFilterAC(todolistId2, newTodoFilter  as filterValuesType)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodoFilter)
});