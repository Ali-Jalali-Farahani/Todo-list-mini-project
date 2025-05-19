import React, { Component } from 'react'
import Header from './Header'
import Todo from './Todo'
import { Container,Row,Col } from 'react-bootstrap'
export default class TodoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            todoTitle: '',
            status: 'all'
        }

        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.todoTitleHandler = this.todoTitleHandler.bind(this)
        this.statusHandler = this.statusHandler.bind(this)

    }

    todoTitleHandler(event) {
        this.setState({
            todoTitle: event.target.value
        })
    }

    addTodo(event) {
        event.preventDefault()

        let newTodoObject = {
            id: this.state.todos.length + 1,
            title: this.state.todoTitle,
            completed: false
        }

        this.setState(prevState => {
            return {
                todos: [...prevState.todos, newTodoObject],
                todoTitle: ''
            }
        })

    }

    removeTodo(todoId) {

        let newTodos = this.state.todos.filter(todo => {
            return todo.id !== todoId
        })

        this.setState({
            todos: newTodos
        })
    }

    editTodo(todoId) {

        let newTodos = [...this.state.todos]

        newTodos.forEach(todo => {
            if (todo.id === todoId) {
                todo.completed = !todo.completed
            }
        })

        this.setState({
            todos: newTodos
        })

    }

    statusHandler(event) {
        this.setState({
            status: event.target.value
        })
    }

    render() {

        return (
            <>
                <Header />
                <form onSubmit={this.addTodo}>
                    <Container>
                        <Row>
                            <Col xs={12} md={8}>
                                <div style={{position:"relative",margin:" 16px 0"}}>
                                    <input type="text" className="todo-input" maxLength="40" value={this.state.todoTitle} onChange={this.todoTitleHandler} style={{width:"100%"}}/>
                                    <button className="todo-button" type="submit" style={{position:"absolute",right:"0"}}>
                                        <i className="fas fa-plus-square"></i>
                                    </button>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className="select" style={{width:"100%",marginLeft:"0px"}}>
                                    <select name="todos" className="filter-todo" onChange={this.statusHandler} style={{width:"100%"}}>
                                        <option value="all">All</option>
                                        <option value="completed">Completed</option>
                                        <option value="uncompleted">Uncompleted</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </form>

                <div className="todo-container">
                    <ul className="todo-list">

                        {
                            this.state.status === 'completed' && this.state.todos.filter(todo => todo.completed).map(todo => (
                                <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo} />

                            ))
                        }

                        {
                            this.state.status === 'uncompleted' && this.state.todos.filter(todo => !todo.completed).map(todo => (
                                <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo} />

                            ))
                        }

                        {
                            this.state.status === "all" && this.state.todos.map(todo => (
                                <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo} />
                            ))
                        }


                    </ul>
                </div>
            </>
        )
    }
}
