import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalProductListComponent } from './final-product-list.component';

describe('FinalProductListComponent', () => {
  let component: FinalProductListComponent;
  let fixture: ComponentFixture<FinalProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
