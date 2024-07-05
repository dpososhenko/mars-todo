import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    component = new AppComponent();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid title', () => {
    expect(component.title).toEqual('mars-todo');
  });
});
