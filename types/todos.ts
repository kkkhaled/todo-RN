export interface Todo {
  id: number;
  task: string;
  startedAt: string;
  endedAt: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: null | string;
}
