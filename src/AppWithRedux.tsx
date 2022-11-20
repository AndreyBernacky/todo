import React, {useReducer} from 'react'
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, store} from "./state/store";

export type filterValuesType = "all" | "active" | "complited"

export type todoListsType = {
    id: string,
    title: string,
    filter: filterValuesType
}

export type tasksStateType = {
    [key: string]: Array<InArray>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<todoListsType>>(store => store.todolists)
    const tasksObj = useSelector<AppRootState, tasksStateType>(store => store.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }


    function changeFilter(value: filterValuesType, todolistId: string) {
        dispatch(changeTodoListFilterAC(value, todolistId))
    }

    function onChangeTodoListTitle(id: string, newTitle: string) {
        dispatch(changeTodoListTitleAC(id, newTitle))
    }

    function removeTodoList(todolistId: string) {
        let action = removeTodoListAC(todolistId)
        dispatch(action)
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatch(action)
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
                <Grid container style={{margin: "24px 0"}}>
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
                                <Paper style={{padding: "14px"}}>
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

export default AppWithRedux;
