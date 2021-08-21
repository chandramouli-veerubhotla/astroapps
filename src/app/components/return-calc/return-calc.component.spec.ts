import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCalcComponent } from './return-calc.component';

describe('ReturnCalcComponent', () => {
  let component: ReturnCalcComponent;
  let fixture: ComponentFixture<ReturnCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
