import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeJsMapComponent } from './three-js-map.component';

describe('ThreeJsMapComponent', () => {
  let component: ThreeJsMapComponent;
  let fixture: ComponentFixture<ThreeJsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeJsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeJsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
