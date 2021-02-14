import { TestBed } from '@angular/core/testing';

import { MqttConnectGuard } from './mqtt-connect.guard';

describe('MqttConnectGuard', () => {
  let guard: MqttConnectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MqttConnectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
