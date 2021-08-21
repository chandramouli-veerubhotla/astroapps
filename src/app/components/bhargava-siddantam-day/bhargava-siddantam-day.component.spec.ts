import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhargavaSiddantamDayComponent } from './bhargava-siddantam-day.component';

describe('BhargavaSiddantamDayComponent', () => {
  let component: BhargavaSiddantamDayComponent;
  let fixture: ComponentFixture<BhargavaSiddantamDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhargavaSiddantamDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhargavaSiddantamDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
