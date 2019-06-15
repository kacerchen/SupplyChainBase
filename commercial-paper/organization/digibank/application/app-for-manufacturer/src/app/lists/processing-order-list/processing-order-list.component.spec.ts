import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingOrderListComponent } from './processing-order-list.component';

describe('ProcessingOrderListComponent', () => {
  let component: ProcessingOrderListComponent;
  let fixture: ComponentFixture<ProcessingOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
