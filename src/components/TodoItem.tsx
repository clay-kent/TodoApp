import React from 'react';
import { Todo, Priority } from '../types';
import IconButton from './IconButton';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
    todo: Todo,
    updateIsDone: (id: string, value: boolean) => void;
    removeTodo: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, updateIsDone, removeTodo }) => {
    const priorityLabel = (priority: Priority) => {
        switch (priority) {
            case Priority.Low:
                return 'Low';
            case Priority.Medium:
                return 'Medium';
            case Priority.High:
                return 'High';
            default:
                return '';
        }
    };

    return (
        <div>
            <input type="checkbox" checked={todo.isDone} onChange={(e) => updateIsDone(todo.id, e.target.checked)} />
            <h3>{todo.name}</h3>
            <p>優先度: {priorityLabel(todo.priority)}</p>
            <p>期限: {todo.deadline ? todo.deadline.toDateString() : 'No deadline'}</p>
            <IconButton icon={faTrash} onClick={() => removeTodo(todo.id)} color='bg-red-500' />
        </div>
    );
}

export default TodoItem;