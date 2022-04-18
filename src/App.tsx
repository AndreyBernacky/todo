import React, {useState} from 'react';
import './App.css';
import {InArray, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type filterValuesType = "all" | "active" | "complited"

type todoListsType = {
    id: string,
    title: string,
    filter: filterValuesType
}

type tasksStateType = {
    [key: string]: Array<InArray>
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

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
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

    function onChangeTodoListTitle(id: string, newTitle: string) {
        const todolist = todolists.find(f => f.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<todoListsType>>([
        {id: todolistId1, title: "What to lern", filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "all"}
    ])

    let [tasksObj, setTasks] = useState<tasksStateType>({
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

    function addTodoList(title: string) {
        const todolist: todoListsType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position={'relative'}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={ {margin:"24px 0"} }>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>

                    {todolists.map((tl) => {

                        let tasksForToDoList = tasksObj[tl.id]

                        if (tl.filter === "active") {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
                        }
                        if (tl.filter === "complited") {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
                        }

                        return (
                            <Grid item>
                                <Paper style={ {padding: "14px"} }>
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
                                        changeTaskTitle={changeTaskTitle}
                                        onChangeTodoListTitle={onChangeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}

                </Grid>
            </Container>
        </div>
    );
}

export default App;
