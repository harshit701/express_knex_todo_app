import { getAllTodos, createTodo, deleteTodo, getTodoById, updateTodo } from '../models/todo.js';

export const findAll = async (req, res) => {
    const query = req.query;

    try {
        const todos = await getAllTodos(query);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const findById = async (req, res) => {
    const todoId = req.params.id;

    try {
        const todo = await getTodoById(todoId);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const add = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const newTodo = await createTodo(title, description, completed);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const remove = async (req, res) => {
    const todoId = req.params.id;

    try {
        const deletedTodo = await deleteTodo(todoId);

        if (deletedTodo) {
            res.status(200).json({ message: 'Todo deleted successfully', todo: deletedTodo });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const todoId = req.params.id;
        const updates = req.body;

        console.log(todoId, updates)

        const updatedTodo = await updateTodo(todoId, updates);

        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}