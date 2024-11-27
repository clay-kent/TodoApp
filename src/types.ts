export enum Priority {
  Low = 1,
  Medium,
  High,
}
export type Todo = {
  id: string;
  name: string;
  isDone: boolean;
  priority: Priority;
  deadline: Date | null;
};
