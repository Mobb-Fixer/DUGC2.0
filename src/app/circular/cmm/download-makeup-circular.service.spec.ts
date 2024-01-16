import { TestBed } from '@angular/core/testing';

import { DownloadMakeupCircularService } from './download-makeup-circular.service';

describe('DownloadMakeupCircularService', () => {
  let service: DownloadMakeupCircularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadMakeupCircularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
