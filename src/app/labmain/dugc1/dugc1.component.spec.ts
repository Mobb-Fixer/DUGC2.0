import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dugc1Component } from './dugc1.component';

describe('Dugc1Component', () => {
  let component: Dugc1Component;
  let fixture: ComponentFixture<Dugc1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dugc1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dugc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
