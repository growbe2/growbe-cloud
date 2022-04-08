import { TestBed } from '@angular/core/testing';

import { GrowbeImageConfigService } from './growbe-image-config.service';

describe('GrowbeImageConfigService', () => {
  let service: GrowbeImageConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowbeImageConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
