import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoStatus } from '../todo.interfaces';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent {
  todoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl(new Date()),
  });

  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router,
  ) {}

  save(): void {
    this.todoService.create({
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      dueDate: this.todoForm.value.dueDate,
      status: TodoStatus.IN_PROGRESS,
      id: self.crypto.randomUUID(),
    });

    this.router.navigate(['..']);
  }
}
