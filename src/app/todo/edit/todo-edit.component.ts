import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITodo } from '../todo.interfaces';
import { TodoService } from '../todo.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoEditComponent implements OnInit {
  todoForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl(null),
    status: new FormControl(null),
    id: new FormControl(''),
  });

  constructor(
    private readonly todoService: TodoService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const todo: ITodo = this.todoService.getById(this.route.snapshot.params['todoId']);

    this.todoForm.setValue({
      ...todo,
      dueDate: new Date(todo.dueDate),
    });
  }

  update(): void {
    this.todoService.update(this.todoForm.value);
    this.todoForm.markAsPristine();
  }
}
