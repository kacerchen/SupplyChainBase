import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHistoryTableComponent } from './product-history-table.component';

describe('ProductHistoryTableComponent', () => {
  let component: ProductHistoryTableComponent;
  let fixture: ComponentFixture<ProductHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
