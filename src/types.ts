export enum Priority {
    Low = 1,
    Medium = 2,
    High = 3
}
export type Todo = {
    id: string
    name: string
    isDone: boolean
    priority: Priority
    deadline: Date | null
}