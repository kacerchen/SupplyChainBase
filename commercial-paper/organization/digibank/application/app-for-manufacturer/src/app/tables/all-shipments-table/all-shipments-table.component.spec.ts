import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShipmentsTableComponent } from './all-shipments-table.component';

describe('AllShipmentsTableComponent', () => {
  let component: AllShipmentsTableComponent;
  let fixture: ComponentFixture<AllShipmentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllShipmentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShipmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
