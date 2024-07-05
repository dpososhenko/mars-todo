import { Routes } from '@angular/router';
import { TodoListComponent } from './list/todo-list.component';
import { TodoCreateComponent } from './create/todo-create.component';
import { TodoEditComponent } from './edit/todo-edit.component';

export const todoRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: TodoListComponent,
  },
  {
    path: 'create',
    component: TodoCreateComponent,
  },
  {
    path: 'edit/:todoId',
    component: TodoEditComponent,
  },
];
