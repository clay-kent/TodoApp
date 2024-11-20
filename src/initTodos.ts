import { Todo } from "./types";
import { v4 as uuid } from "uuid";

export const initTodos: Todo[] = [
    {
        id: uuid(),
        name: "解析問題集",
        isDone: false,
        priority: 2,
        deadline: new Date(2024, 10, 2, 17, 30),
    },
    {
        id: uuid(),
        name: "Typescript復習",
        isDone: false,
        priority: 3,
        deadline: null,
    },
    {
        id: uuid(),
        name: "物理プリ",
        isDone: false,
        priority: 1,
        deadline: new Date(2024, 10, 11),
    }
]