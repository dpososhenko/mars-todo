import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../todo.service';
import { ITodo, TodoStatus } from '../todo.interfaces';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbTabsetModule,
  NbThemeModule,
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  const mockTodos: ITodo[] = [
    { id: '1', title: 'Test Todo 1', description: 'Description 1', dueDate: new Date(), status: TodoStatus.IN_PROGRESS },
    { id: '2', title: 'Test Todo 2', description: 'Description 2', dueDate: new Date(), status: TodoStatus.IN_PROGRESS },
  ];

  beforeEach(() => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['getAll', 'updateAll']);

    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [
        RouterModule.forRoot([]),
        NbTabsetModule,
        NbCardModule,
        NbInputModule,
        NbLayoutModule,
        NbButtonModule,
        NbDatepickerModule,
        NbActionsModule,
        NbIconModule,
        NbThemeModule.forRoot(),
        NbEvaIconsModule,
      ],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;

    todoService.getAll.and.returnValue(mockTodos);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    component.ngOnInit();
    expect(todoService.getAll).toHaveBeenCalled();
    expect(component.todos).toEqual(mockTodos);
  });

  it('should mark a todo as done', () => {
    const todoToMarkDone = mockTodos[0];
    component.done(todoToMarkDone);

    const updatedTodos = component.todos;
    expect(updatedTodos[0].status).toEqual(TodoStatus.DONE);
    expect(todoService.updateAll).toHaveBeenCalledWith(updatedTodos);
  });

  it('should delete a todo', () => {
    const todoToDelete = mockTodos[0];
    component.delete(todoToDelete);

    const updatedTodos = component.todos;
    expect(updatedTodos.length).toBe(1);
    expect(updatedTodos.find(todo => todo.id === todoToDelete.id)).toBeUndefined();
    expect(todoService.updateAll).toHaveBeenCalledWith(updatedTodos);
  });
});
