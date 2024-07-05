import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbTabsetModule,
} from '@nebular/theme';
import { todoRoutes } from './todo.routes';
import { TodoListComponent } from './list/todo-list.component';
import { TodoCreateComponent } from './create/todo-create.component';
import { TodoEditComponent } from './edit/todo-edit.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoCreateComponent,
    TodoEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(todoRoutes),
    ReactiveFormsModule,
    NbTabsetModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbButtonModule,
    NbDatepickerModule.forRoot(),
    NbActionsModule,
    NbIconModule,
  ],
})
export class TodoModule {}
