import { TestBed } from '@angular/core/testing';

import { DownloadNoticeMinorServiceService } from './download-notice-minor-service.service';

describe('DownloadNoticeMinorServiceService', () => {
  let service: DownloadNoticeMinorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadNoticeMinorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
