import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsMgComponent } from './logistics-mg.component';

describe('LogisticsMgComponent', () => {
  let component: LogisticsMgComponent;
  let fixture: ComponentFixture<LogisticsMgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticsMgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
