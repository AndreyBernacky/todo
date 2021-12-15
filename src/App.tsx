import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    const task1=[
        {id:1, title:'HTML&CSS',isDone:true},
        {id:1, title:'JS',isDone:false},
        {id:1, title:'React',isDone:true}
    ]

    const task2=[
        {id:1, title:'Vino',isDone:false},
        {id:1, title:'Vodka',isDone:true},
        {id:1, title:'HJin',isDone:false}
    ]

    return (
        <div className="App">
            <TodoList title={'What to learn'} task={task1}/>
            <TodoList title={'What to Drink'} task={task2}/>
        </div>
    );
}

export default App;
