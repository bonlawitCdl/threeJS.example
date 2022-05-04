import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabHomeaComponent } from './lab-homea.component';

describe('LabHomeaComponent', () => {
  let component: LabHomeaComponent;
  let fixture: ComponentFixture<LabHomeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabHomeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabHomeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
