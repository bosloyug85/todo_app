import React, {useContext, useState, Fragment} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Icon} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import DeleteDialog from "./DeleteDialog";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';



function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    return (
        <Fragment>
            <form onSubmit={(event) => {
                context.createTodo(event, {name: addTodo})
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField value={addTodo} onChange={(event) => {setAddTodo(event.target.value)}} label="New task" fullWidth={true} />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo '+index}>
                                <TableCell>

                                    {editIsShown===todo.id ?
                                        <TextField
                                            fullWidth={true}
                                            value={editTodo}
                                            onChange={(e) => {
                                            setEditTodo(event.target.value)
                                        }}
                                            InputProps={{
                                                endAdornment: <Fragment>
                                                    <IconButton onClick={() => {setEditIsShown(false)}}><CloseIcon/></IconButton>
                                                    <IconButton onClick={() => {context.updateTodo({id: todo.id, name: editTodo}); setEditIsShown(false);}}><DoneIcon/></IconButton>
                                                </Fragment>,
                                            }}
                                        />
                                        :
                                        todo.name
                                    }

                                </TableCell>
                                <TableCell align="right">

                                    <IconButton onClick={() => {setEditIsShown(todo.id); setEditTodo(todo.name)}}>
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton onClick={() => {setDeleteConfirmationIsShown(true); setTodoToBeDeleted(todo)}}>
                                        <DeleteIcon/>
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
            {deleteConfirmationIsShown && (
                <DeleteDialog todo={todoToBeDeleted} open={deleteConfirmationIsShown} setDeleteConfirmationIsShown={setDeleteConfirmationIsShown} />
            )}
        </Fragment>
    );

}

export default TodoTable;