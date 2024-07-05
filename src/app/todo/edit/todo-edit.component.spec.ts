import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TodoEditComponent } from './todo-edit.component';
import { TodoService } from '../todo.service';
import { ITodo, TodoStatus } from '../todo.interfaces';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbTabsetModule, NbThemeModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

describe('TodoEditComponent', () => {
  let component: TodoEditComponent;
  let fixture: ComponentFixture<TodoEditComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  const mockTodo: ITodo = {
    title: 'Test Title',
    description: 'Test Description',
    dueDate: new Date(),
    status: TodoStatus.IN_PROGRESS,
    id: '1234',
  };

  beforeEach(() => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['getById', 'update']);
    const activatedRouteStub = {
      snapshot: {
        params: {
          todoId: '1234',
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [TodoEditComponent],
      imports: [
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        NbTabsetModule,
        NbCardModule,
        NbInputModule,
        NbLayoutModule,
        NbButtonModule,
        NbDatepickerModule.forRoot(),
        NbActionsModule,
        NbIconModule,
        NbThemeModule.forRoot(),
        NbEvaIconsModule,
      ],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoEditComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;

    todoService.getById.and.returnValue(mockTodo);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.todoForm).toBeDefined();
    expect(component.todoForm.controls['title']).toBeDefined();
    expect(component.todoForm.controls['description']).toBeDefined();
    expect(component.todoForm.controls['dueDate']).toBeDefined();
    expect(component.todoForm.controls['status']).toBeDefined();
    expect(component.todoForm.controls['id']).toBeDefined();
  });

  it('should set form values on ngOnInit', () => {
    component.ngOnInit();
    expect(todoService.getById).toHaveBeenCalledWith('1234');
    expect(component.todoForm.value).toEqual({
      title: 'Test Title',
      description: 'Test Description',
      dueDate: new Date(mockTodo.dueDate),
      status: 'IN_PROGRESS',
      id: '1234',
    });
  });

  it('should call update on TodoService when update is called', () => {
    component.todoForm.setValue({
      title: 'Updated Title',
      description: 'Updated Description',
      dueDate: new Date(),
      status: 'COMPLETED',
      id: '1234',
    });

    component.update();

    expect(todoService.update).toHaveBeenCalledWith(component.todoForm.value);
    expect(component.todoForm.pristine).toBeTrue();
  });
});
