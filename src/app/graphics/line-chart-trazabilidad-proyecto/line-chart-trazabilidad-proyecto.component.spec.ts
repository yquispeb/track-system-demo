import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTrazabilidadProyectoComponent } from './line-chart-trazabilidad-proyecto.component';

describe('LineChartTrazabilidadProyectoComponent', () => {
  let component: LineChartTrazabilidadProyectoComponent;
  let fixture: ComponentFixture<LineChartTrazabilidadProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartTrazabilidadProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartTrazabilidadProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
