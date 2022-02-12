import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPlansComponent } from './floor-plans.component';

describe('FloorPlansComponent', () => {
  let component: FloorPlansComponent;
  let fixture: ComponentFixture<FloorPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
