import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {tasksStateType} from "../App";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

test('Correct tasks Form Correct todo DELETED', () => {


    let startState = {
        todolistId1: [
        {id: "1", title: 'HTML&CSS', isDone: true},
        {id: "2", title: 'JS', isDone: true},
        {id: "3", title: 'React', isDone: false}
    ],
        todolistId2: [
        {id: "1", title: 'Book', isDone: false},
        {id: "2", title: 'Bear', isDone: true},
        {id: "3", title: 'Coca', isDone: false}
    ]
    }

    const action = removeTaskAC("2", "todolistId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(t=>t.id !== "2")).toBeTruthy()

});

test('Correct ADD task in Correct todo', () => {


    let startState = {
        todolistId1: [
            {id: "1", title: 'HTML&CSS', isDone: true},
            {id: "2", title: 'JS', isDone: true},
            {id: "3", title: 'React', isDone: false}
        ],
        todolistId2: [
            {id: "1", title: 'Book', isDone: false},
            {id: "2", title: 'Bear', isDone: true},
            {id: "3", title: 'Coca', isDone: false}
        ]
    }

    const action = addTaskAC("juice", "todolistId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juice")
    expect(endState["todolistId2"][0].isDone).toBe(false)
});

test('Correct CHANGE task STATUS in Correct todo', () => {


    let startState = {
        todolistId1: [
            {id: "1", title: 'HTML&CSS', isDone: true},
            {id: "2", title: 'JS', isDone: true},
            {id: "3", title: 'React', isDone: false}
        ],
        todolistId2: [
            {id: "1", title: 'Book', isDone: false},
            {id: "2", title: 'Bear', isDone: true},
            {id: "3", title: 'Coca', isDone: false}
        ]
    }

    const action = changeTaskStatusAC("2", false, "todolistId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(3)
    expect(endState["todolistId2"][1].isDone).toBe(false)
    expect(endState["todolistId1"][1].isDone).toBe(true)

});

test('Correct TitieChange  in Correct todo', () => {


    let startState = {
        todolistId1: [
            {id: "1", title: 'HTML&CSS', isDone: true},
            {id: "2", title: 'JS', isDone: true},
            {id: "3", title: 'React', isDone: false}
        ],
        todolistId2: [
            {id: "1", title: 'Book', isDone: false},
            {id: "2", title: 'Bear', isDone: true},
            {id: "3", title: 'Coca', isDone: false}
        ]
    }

    const action = changeTaskTitleAC("2", "Chocolate", "todolistId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Chocolate")
    expect(endState["todolistId1"][1].title).toBe("JS")


});

test('New property with Correct ADD-TODOLIST', () => {


    let startState:tasksStateType = {
        todolistId1: [
            {id: "1", title: 'HTML&CSS', isDone: true},
            {id: "2", title: 'JS', isDone: true},
            {id: "3", title: 'React', isDone: false}
        ],
        todolistId2: [
            {id: "1", title: 'Book', isDone: false},
            {id: "2", title: 'Bear', isDone: true},
            {id: "3", title: 'Coca', isDone: false}
        ]
    }

    const action = addTodoListAC("new todo")

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKye = keys.find(k => k!= "todolistId1" && k!= "todolistId2")
    if(!newKye){
        throw Error("New key should be added")
    }
    expect(keys.length).toBe(3)
    expect(endState[newKye]).toStrictEqual([])
});

test('Property with Correct ADD-TODOLIST should be deleted', () => {

    let startState:tasksStateType = {
        todolistId1: [
            {id: "1", title: 'HTML&CSS', isDone: true},
            {id: "2", title: 'JS', isDone: true},
            {id: "3", title: 'React', isDone: false}
        ],
        todolistId2: [
            {id: "1", title: 'Book', isDone: false},
            {id: "2", title: 'Bear', isDone: true},
            {id: "3", title: 'Coca', isDone: false}
        ]
    }

    const action = removeTodoListAC("todolistId2")

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
});