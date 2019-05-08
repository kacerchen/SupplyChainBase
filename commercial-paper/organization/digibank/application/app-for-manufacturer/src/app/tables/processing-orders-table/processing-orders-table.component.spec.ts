import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingOrdersTableComponent } from './processing-orders-table.component';

describe('ProcessingOrdersTableComponent', () => {
  let component: ProcessingOrdersTableComponent;
  let fixture: ComponentFixture<ProcessingOrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingOrdersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
