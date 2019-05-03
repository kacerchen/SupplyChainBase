import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestProcessTableComponent } from './latest-process-table.component';

describe('LatestProcessTableComponent', () => {
  let component: LatestProcessTableComponent;
  let fixture: ComponentFixture<LatestProcessTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestProcessTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestProcessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
