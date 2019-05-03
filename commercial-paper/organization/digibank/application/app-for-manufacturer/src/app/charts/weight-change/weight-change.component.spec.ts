import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightChangeComponent } from './weight-change.component';

describe('WeightChangeComponent', () => {
  let component: WeightChangeComponent;
  let fixture: ComponentFixture<WeightChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
