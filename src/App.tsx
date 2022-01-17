import React, {useState} from 'react';
import './App.css';
import {InArray, TodoList} from "./TodoList";
import {v1} from "uuid";

export type filterValuesType = "all" | "active" | "complited"

type todoListsType = {
    id: string,
    title: string,
    filter: filterValuesType
}

function App() {

    function removeTask(id: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((t) => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        let task = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }

    }

    function changeFilter(value: filterValuesType, todolistId: string) {
        const todolist = todolists.find(f => f.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTodoList(todolistId: string) {
        const filteredTodoList = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodoList)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<todoListsType>>([
        {id: todolistId1, title: "What to lern", filter: "active"},
        {id: todolistId2, title: "What to bye", filter: "complited"}
    ])

    let [tasksObj, setTasks] = useState({
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
    })

    return (
        <div className="App">
            {todolists.map((tl) => {

                let tasksForToDoList = tasksObj[tl.id]

                if (tl.filter === "active") {
                    tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
                }
                if (tl.filter === "complited") {
                    tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
                }

                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        task={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}

        </div>
    );
}

export default App;
