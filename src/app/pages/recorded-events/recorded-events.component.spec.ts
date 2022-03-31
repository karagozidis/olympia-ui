import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordedEventsComponent } from './recorded-events.component';

describe('RecordedEventsComponent', () => {
  let component: RecordedEventsComponent;
  let fixture: ComponentFixture<RecordedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordedEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
