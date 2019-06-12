import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeStatComponent } from './type-stat.component';

describe('TypeStatComponent', () => {
  let component: TypeStatComponent;
  let fixture: ComponentFixture<TypeStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
