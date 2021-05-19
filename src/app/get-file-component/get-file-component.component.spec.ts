import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFileComponentComponent } from './get-file-component.component';

describe('GetFileComponentComponent', () => {
  let component: GetFileComponentComponent;
  let fixture: ComponentFixture<GetFileComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFileComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
