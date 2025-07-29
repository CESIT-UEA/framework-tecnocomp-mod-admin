import { TestBed } from '@angular/core/testing';

import { ReferenciaModuloService } from './referencia-modulo.service';

describe('ReferenciaModuloService', () => {
  let service: ReferenciaModuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenciaModuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
