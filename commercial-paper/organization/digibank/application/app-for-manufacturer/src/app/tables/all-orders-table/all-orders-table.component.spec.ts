import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersTableComponent } from './all-orders-table.component';

describe('AllOrdersTableComponent', () => {
  let component: AllOrdersTableComponent;
  let fixture: ComponentFixture<AllOrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOrdersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
