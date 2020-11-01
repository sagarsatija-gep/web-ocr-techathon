import { TestBed } from '@angular/core/testing';

import { DetailsOcrService } from './details-ocr.service';

describe('DetailsOcrService', () => {
  let service: DetailsOcrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsOcrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
