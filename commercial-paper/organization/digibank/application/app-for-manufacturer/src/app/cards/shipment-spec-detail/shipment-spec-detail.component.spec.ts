import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentSpecDetailComponent } from './shipment-spec-detail.component';

describe('ShipmentSpecDetailComponent', () => {
  let component: ShipmentSpecDetailComponent;
  let fixture: ComponentFixture<ShipmentSpecDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentSpecDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentSpecDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
