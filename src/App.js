import React, { Component } from 'react'
import TodoList from './components/TodoList/TodoList'
import './App.css'

export default class App extends Component {

    constructor (props) {
        super(props)
    } 

    render() {
        return (
            <div>
                <TodoList></TodoList>
            </div>
        )
    }
}
