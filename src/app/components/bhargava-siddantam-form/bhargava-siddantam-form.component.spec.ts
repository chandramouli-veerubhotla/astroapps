import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhargavaSiddantamFormComponent } from './bhargava-siddantam-form.component';

describe('BhargavaSiddantamFormComponent', () => {
  let component: BhargavaSiddantamFormComponent;
  let fixture: ComponentFixture<BhargavaSiddantamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhargavaSiddantamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhargavaSiddantamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
