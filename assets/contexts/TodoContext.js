import React, {Component, createContext} from 'react';
import axios from 'axios';


export const TodoContext = createContext();

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.readTodo();
    }

    // create
    createTodo(event, todo) {
        event.preventDefault();
        axios.post('/api/todo/create', todo)
            .then(response => {
                console.log(response.data);
                let data = [...this.state.todos];
                data.push(todo);
                this.setState({
                    todos: data
                })
            }).catch(error => {
                console.log(error);
        });
    }
    // read
    readTodo() {
        axios.get('/api/todo/read')
            .then(response => {
                this.setState({
                    todos: response.data
                });
                console.log(response.data);
            }).catch(error => {
                console.log(error);
        });
    }
    // update
    updateTodo(data) {
        axios.put('/api/todo/update/'+data.id, data)
            .then(response => {
                let todos = [...this.state.todos];
                let todo = todos.find(todo => {
                    return todo.id === data.id
                });

                todo.name = data.name;

                this.setState({
                    todos: todos
                });
            }).catch(error => {
                console.log(error);
        });
    }
    // delete
    deleteTodo(data) {
        let todos = [...this.state.todos];
        let todo = todos.find(todo => {
            return todo.id === data.id;
        });

        todos.splice(todos.indexOf(todo), 1);
        this.setState({
            todos: todos
        })
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;