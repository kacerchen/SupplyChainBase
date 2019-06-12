import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentShipDetailComponent } from './shipment-ship-detail.component';

describe('ShipmentShipDetailComponent', () => {
  let component: ShipmentShipDetailComponent;
  let fixture: ComponentFixture<ShipmentShipDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentShipDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentShipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
