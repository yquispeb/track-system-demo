import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsAplicacionComponent } from './graphics-aplicacion.component';

describe('GraphicsAplicacionComponent', () => {
  let component: GraphicsAplicacionComponent;
  let fixture: ComponentFixture<GraphicsAplicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsAplicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
