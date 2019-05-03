import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempChangeComponent } from './temp-change.component';

describe('TempChangeComponent', () => {
  let component: TempChangeComponent;
  let fixture: ComponentFixture<TempChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
