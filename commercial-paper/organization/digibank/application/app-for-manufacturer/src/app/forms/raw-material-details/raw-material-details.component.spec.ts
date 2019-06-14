import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialDetailsComponent } from './raw-material-details.component';

describe('RawMaterialDetailsComponent', () => {
  let component: RawMaterialDetailsComponent;
  let fixture: ComponentFixture<RawMaterialDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
