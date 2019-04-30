import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMgComponent } from './process-mg.component';

describe('ProcessMgComponent', () => {
  let component: ProcessMgComponent;
  let fixture: ComponentFixture<ProcessMgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessMgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
