import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

type Props = {
    todos: Todo[],
    updateIsDone: (id: string, value: boolean) => void;
    removeTodo: (id: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, updateIsDone, removeTodo }) => {
    return (
        <div className="space-y-1">
            {todos
                .sort(todo => todo.isDone ? 1 : -1)
                .map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        updateIsDone={updateIsDone}
                        removeTodo={removeTodo}
                    />
                ))}
        </div>
    );
}

export default TodoList;