import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingStepperComponent } from './shipping-stepper.component';

describe('ShippingStepperComponent', () => {
  let component: ShippingStepperComponent;
  let fixture: ComponentFixture<ShippingStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
