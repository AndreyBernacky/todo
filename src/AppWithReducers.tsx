import React, {useReducer, useState} from 'react'
import './App.css';
import {InArray, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type filterValuesType = "all" | "active" | "complited"

export type todoListsType = {
    id: string,
    title: string,
    filter: filterValuesType
}

export type tasksStateType = {
    [key: string]: Array<InArray>
}

function AppWithReducer() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchToTodolistsReduser] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to lern", filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "all"}
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,{
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

    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id,todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }


    function changeFilter(value: filterValuesType, todolistId: string) {
        dispatchToTodolistsReduser(changeTodoListFilterAC(value, todolistId))
    }
    function onChangeTodoListTitle(id: string, newTitle: string) {
        dispatchToTodolistsReduser(changeTodoListTitleAC(id, newTitle))
    }

    function removeTodoList(todolistId: string) {
        let action = removeTodoListAC(todolistId)
        dispatchToTodolistsReduser(action)
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatchToTodolistsReduser(action)
        dispatchToTasksReducer(action)
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

export default AppWithReducer;
