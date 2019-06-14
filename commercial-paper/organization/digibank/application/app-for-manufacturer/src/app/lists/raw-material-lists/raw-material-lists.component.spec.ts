import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialListsComponent } from './raw-material-lists.component';

describe('RawMaterialListsComponent', () => {
  let component: RawMaterialListsComponent;
  let fixture: ComponentFixture<RawMaterialListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
