import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentProductDetailComponent } from './shipment-product-detail.component';

describe('ShipmentProductDetailComponent', () => {
  let component: ShipmentProductDetailComponent;
  let fixture: ComponentFixture<ShipmentProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
