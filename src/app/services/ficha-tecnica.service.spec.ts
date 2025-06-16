import { TestBed } from '@angular/core/testing';

import { FichaTecnicaService } from './ficha-tecnica.service';

describe('FichaTecnicaService', () => {
  let service: FichaTecnicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaTecnicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
