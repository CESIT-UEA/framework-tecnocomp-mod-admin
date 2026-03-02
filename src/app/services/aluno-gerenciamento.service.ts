import { InfoPaginacao } from './../../interfaces/modulo/InfoPaginacao';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlunoModulo } from 'src/interfaces/modulo/aluno-modulo.interface';

@Injectable({
  providedIn: 'root',
})
export class AlunoGerenciamentoService {
  private apiUrl = environment.baseUrl + '/api/';

  constructor(private http: HttpClient) {}

  /**
   * Busca os alunos de um módulo, com filtros opcionais
   */
  getAlunosPorModulo(
    moduloId: number,
    page: number,
    filtros?: {
      nome?: string;
      email?: string;
      ativo?: boolean;
      progressoMin?: number;
      notaMin?: number;
    }
    
  ): Observable<{alunos: AlunoModulo[], infoAlunos: InfoPaginacao}> {
    let params = new HttpParams();

    if (filtros) {
      if (filtros.nome) params = params.set('nome', filtros.nome);
      if (filtros.email) params = params.set('email', filtros.email);
      if (filtros.ativo !== undefined)
        params = params.set('ativo', filtros.ativo.toString());
      if (filtros.progressoMin !== undefined)
        params = params.set('progressoMin', filtros.progressoMin.toString());
      if (filtros.notaMin !== undefined)
        params = params.set('notaMin', filtros.notaMin.toString());
    }

    return this.http.get<{alunos: AlunoModulo[], infoAlunos: InfoPaginacao}>(
      `${this.apiUrl}modulos/${moduloId}/alunos-progresso?page=${page}`,
      { params }
    );
  }

  /**
   * Atualiza os dados de um aluno no módulo
   */
  atualizarAluno(
    id: number,
    dados: Partial<AlunoModulo>
  ): Observable<AlunoModulo> {
    return this.http.put<AlunoModulo>(
      `${this.apiUrl}modulos/alunos/${id}`,
      dados
    );
  }

  /**
   * Deleta um aluno do módulo
   */
  deletarAluno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}alunos/${id}`);
  }
}
