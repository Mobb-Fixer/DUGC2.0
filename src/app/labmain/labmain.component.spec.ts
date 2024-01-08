import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabmainComponent } from './labmain.component';

describe('LabmainComponent', () => {
  let component: LabmainComponent;
  let fixture: ComponentFixture<LabmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
