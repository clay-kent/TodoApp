import { useEffect, useState } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import TodoList from "./components/TodoList";
import NewTodoForm from "./components/NewTodoForm";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [initiated, setInitiated] = useState<boolean>(false);

  const localStorageKey = "todos";

  //初回実行時復元
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      setTodos(initTodos);
    }
    setInitiated(true);
  }, []);

  //状態変更時保存
  useEffect(() => {
    if (initiated) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initiated]);

  const addTodo = (newTodo: Todo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  };

  const updateIsDone = (id: string, value: boolean) => {
    //イミュータブルな変更にしないと再レンダリングされないことに注意
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <TodoList todos={todos} updateIsDone={updateIsDone} removeTodo={removeTodo} />
      <NewTodoForm addTodo={addTodo} />
      <button
        type="button"
        onClick={removeCompletedTodos}
        className={
          "mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
        }
      >
        完了済みのタスクを削除
      </button>
    </div>
  );
};

export default App;