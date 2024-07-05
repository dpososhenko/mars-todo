export enum TodoStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface ITodo {
  id: string,
  title: string,
  description: string,
  dueDate: Date,
  status: TodoStatus,
}
