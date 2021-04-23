import { TestBed } from '@angular/core/testing';
import { getTestModuleMetadata } from 'src/app/_spec/test.module.spec';

import { MqttConnectGuard } from './mqtt-connect.guard';

describe('MqttConnectGuard', () => {
    let guard: MqttConnectGuard;

    beforeEach(() => {
        TestBed.configureTestingModule(getTestModuleMetadata({}));
        guard = TestBed.inject(MqttConnectGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
