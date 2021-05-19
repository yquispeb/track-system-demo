import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTrazabilidadComponent } from './line-chart-trazabilidad.component';

describe('LineChartTrazabilidadComponent', () => {
  let component: LineChartTrazabilidadComponent;
  let fixture: ComponentFixture<LineChartTrazabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartTrazabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartTrazabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
