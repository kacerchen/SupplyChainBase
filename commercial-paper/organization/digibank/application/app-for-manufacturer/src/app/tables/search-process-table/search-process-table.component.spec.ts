import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProcessTableComponent } from './search-process-table.component';

describe('SearchProcessTableComponent', () => {
  let component: SearchProcessTableComponent;
  let fixture: ComponentFixture<SearchProcessTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProcessTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProcessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
