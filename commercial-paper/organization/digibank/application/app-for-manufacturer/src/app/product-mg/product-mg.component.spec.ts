import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMgComponent } from './product-mg.component';

describe('ProductMgComponent', () => {
  let component: ProductMgComponent;
  let fixture: ComponentFixture<ProductMgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
