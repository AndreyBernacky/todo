type stateType = {
    age: number
    childrenCount: number
    name: string
}
type actionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: stateType, action: actionType): stateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state}
            newState.age = state.age + 1
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            };
        case 'CHANGE-NAME':
            return {
                ...state,
                name:action.newName
            }
        default:
            throw new Error("I don't understand this AT")
    }

}