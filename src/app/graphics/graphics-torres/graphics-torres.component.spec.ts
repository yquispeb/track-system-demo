import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsTorresComponent } from './graphics-torres.component';

describe('GraphicsTorresComponent', () => {
  let component: GraphicsTorresComponent;
  let fixture: ComponentFixture<GraphicsTorresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsTorresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsTorresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
