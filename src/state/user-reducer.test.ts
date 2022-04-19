import {userReducer} from "./user-reducer";

test('Use reducer should increment only age', () => {
    const startState = {
        age: 35,
        childrenCount:1,
        name:'Andrey'
    }

    const endState = userReducer(startState, { type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(36)
    expect(endState.childrenCount).toBe(1)
});

test('Use reducer should increment only childrenCount', () => {
    const startState = {
        age: 35,
        childrenCount:1,
        name:'Andrey'
    }

    const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(35)
    expect(endState.childrenCount).toBe(2)
});

test('Use reducer should change only name', () => {
    const startState = {
        age: 35,
        childrenCount:1,
        name:'Andrey'
    }

    const newName = "Viktor"

    const endState = userReducer(startState, { type: 'CHANGE-NAME', newName:newName})

    expect(endState.name).toBe(newName)
});