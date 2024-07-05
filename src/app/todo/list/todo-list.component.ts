import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ITodo, TodoStatus } from '../todo.interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];

  constructor(
    private readonly todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.todos = this.todoService.getAll();
  }

  done(todo: ITodo): void {
    this.todos = this.todos.map(((item: ITodo) => {
      if (item.id === todo.id) {
        return { ...item, status: TodoStatus.DONE };
      }

      return item;
    }));

    this.todoService.updateAll(this.todos);
  }

  delete(todo: ITodo): void {
    this.todos = this.todos.filter(({ id }) => todo.id !== id);
    this.todoService.updateAll(this.todos);
  }

  protected readonly TodoStatus = TodoStatus;
}
