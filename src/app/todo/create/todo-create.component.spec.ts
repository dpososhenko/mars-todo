import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TodoCreateComponent } from './todo-create.component';
import { TodoService } from '../todo.service';
import { TodoStatus } from '../todo.interfaces';
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

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['create']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'routerState']);

    TestBed.configureTestingModule({
      declarations: [TodoCreateComponent],
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
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

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
  });

  it('should call create on TodoService when save is called', () => {
    component.todoForm.setValue({
      title: 'Test Title',
      description: 'Test Description',
      dueDate: new Date(),
    });

    spyOn(self.crypto, 'randomUUID').and.returnValue('1111-1111-1111-1111-1111');

    component.save();

    expect(todoService.create).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
      dueDate: component.todoForm.value.dueDate,
      status: TodoStatus.IN_PROGRESS,
      id: '1111-1111-1111-1111-1111',
    });
  });

  it('should navigate after save', () => {
    component.save();
    expect(router.navigate).toHaveBeenCalledWith(['..']);
  });
});
