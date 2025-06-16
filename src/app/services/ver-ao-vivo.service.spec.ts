import { TestBed } from '@angular/core/testing';

import { VerAoVivoService } from './ver-ao-vivo.service';

describe('VerAoVivoService', () => {
  let service: VerAoVivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerAoVivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
