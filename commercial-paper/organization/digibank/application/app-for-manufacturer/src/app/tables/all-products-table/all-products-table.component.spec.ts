import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsTableComponent } from './all-products-table.component';

describe('AllProductsTableComponent', () => {
  let component: AllProductsTableComponent;
  let fixture: ComponentFixture<AllProductsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
