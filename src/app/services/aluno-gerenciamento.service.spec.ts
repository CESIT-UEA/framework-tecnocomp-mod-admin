import { TestBed } from '@angular/core/testing';

import { AlunoGerenciamentoService } from './aluno-gerenciamento.service';

describe('AlunoGerenciamentoService', () => {
  let service: AlunoGerenciamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoGerenciamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
