import React, {useState} from 'react';
import './App.css';
import {InArray, TodoList} from "./TodoList";
import {v1} from "uuid";

export type filterValuesType = "all" | "active" | "complited"

function App() {

    let [tasks, setTasks] = useState<Array<InArray>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    let [filter, setFilter] = useState<filterValuesType>("all")

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(id: string, isDone: boolean) {
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value)
    }

    let tasksForToDoList = tasks

    if (filter === "active") {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "complited") {
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                task={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
