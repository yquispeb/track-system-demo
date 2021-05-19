import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAplicacionesComponent } from './listar-aplicaciones.component';

describe('ListarAplicacionesComponent', () => {
  let component: ListarAplicacionesComponent;
  let fixture: ComponentFixture<ListarAplicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAplicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAplicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
