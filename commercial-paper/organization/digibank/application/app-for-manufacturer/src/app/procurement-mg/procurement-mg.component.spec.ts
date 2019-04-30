import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementMgComponent } from './procurement-mg.component';

describe('ProcurementMgComponent', () => {
  let component: ProcurementMgComponent;
  let fixture: ComponentFixture<ProcurementMgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementMgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
