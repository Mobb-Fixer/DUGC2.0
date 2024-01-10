import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabMainHomeComponent } from './lab-main-home.component';

describe('LabMainHomeComponent', () => {
  let component: LabMainHomeComponent;
  let fixture: ComponentFixture<LabMainHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabMainHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabMainHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
