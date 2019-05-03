import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProcessesTableComponent } from './all-processes-table.component';

describe('AllProcessesTableComponent', () => {
  let component: AllProcessesTableComponent;
  let fixture: ComponentFixture<AllProcessesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProcessesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProcessesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
