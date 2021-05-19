import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTrazabilidadComponent } from './registrar-trazabilidad.component';

describe('RegistrarTrazabilidadComponent', () => {
  let component: RegistrarTrazabilidadComponent;
  let fixture: ComponentFixture<RegistrarTrazabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarTrazabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarTrazabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
