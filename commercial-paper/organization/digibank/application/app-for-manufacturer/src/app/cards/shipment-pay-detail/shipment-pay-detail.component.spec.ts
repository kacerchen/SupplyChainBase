import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentPayDetailComponent } from './shipment-pay-detail.component';

describe('ShipmentPayDetailComponent', () => {
  let component: ShipmentPayDetailComponent;
  let fixture: ComponentFixture<ShipmentPayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentPayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentPayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
