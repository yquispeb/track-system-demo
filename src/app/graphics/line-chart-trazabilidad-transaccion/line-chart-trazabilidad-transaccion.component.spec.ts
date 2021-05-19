import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTrazabilidadTransaccionComponent } from './line-chart-trazabilidad-transaccion.component';

describe('LineChartTrazabilidadTransaccionComponent', () => {
  let component: LineChartTrazabilidadTransaccionComponent;
  let fixture: ComponentFixture<LineChartTrazabilidadTransaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartTrazabilidadTransaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartTrazabilidadTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
