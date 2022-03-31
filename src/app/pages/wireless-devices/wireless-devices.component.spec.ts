import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirelessDevicesComponent } from './wireless-devices.component';

describe('WirelessDevicesComponent', () => {
  let component: WirelessDevicesComponent;
  let fixture: ComponentFixture<WirelessDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WirelessDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WirelessDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
