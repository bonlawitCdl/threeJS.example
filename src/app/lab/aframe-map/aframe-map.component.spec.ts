import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AframeMapComponent } from './aframe-map.component';

describe('AframeMapComponent', () => {
  let component: AframeMapComponent;
  let fixture: ComponentFixture<AframeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AframeMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AframeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
