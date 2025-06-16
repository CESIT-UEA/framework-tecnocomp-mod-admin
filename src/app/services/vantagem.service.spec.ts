import { TestBed } from '@angular/core/testing';

import { VantagemService } from './vantagem.service';

describe('VantagemService', () => {
  let service: VantagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VantagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
