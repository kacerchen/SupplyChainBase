import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductTableComponent } from './search-product-table.component';

describe('SearchProductTableComponent', () => {
  let component: SearchProductTableComponent;
  let fixture: ComponentFixture<SearchProductTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
