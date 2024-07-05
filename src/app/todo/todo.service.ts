import { Injectable } from '@angular/core';
import { ITodo } from './todo.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todosStorageKey = 'todos';

  getAll(): ITodo[] {
    const fallbackValue: ITodo[] = [];

    try {
      return JSON.parse(localStorage.getItem(this.todosStorageKey)) || fallbackValue;
    } catch (_) {
      return fallbackValue;
    }
  }

  getById(todoId: string): ITodo {
    return this.getAll().filter(({ id }) => todoId === id)[0];
  }

  update(todo: ITodo): void {
    let todos: ITodo[] = this.getAll();

    todos = todos.map((item: ITodo) => {
      if (item.id === todo.id) {
        return { ...todo };
      }

      return item;
    });

    this.updateAll(todos);
  }

  updateAll(todos: ITodo[]): void {
    localStorage.setItem(this.todosStorageKey, JSON.stringify(todos));
  }

  create(todo: ITodo): void {
    localStorage.setItem(this.todosStorageKey, JSON.stringify([...this.getAll(), todo]));
  }
}
