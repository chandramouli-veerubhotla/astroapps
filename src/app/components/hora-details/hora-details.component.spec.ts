import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraDetailsComponent } from './hora-details.component';

describe('HoraDetailsComponent', () => {
  let component: HoraDetailsComponent;
  let fixture: ComponentFixture<HoraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
