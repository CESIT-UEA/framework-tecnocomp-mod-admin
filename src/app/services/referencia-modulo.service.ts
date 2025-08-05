import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReferenciaModulo } from 'src/interfaces/modulo/referencia-modulo.interface';

@Injectable({
  providedIn: 'root',
})
export class ReferenciaModuloService {
  private apiUrl = environment.baseUrl + '/api/referencias-modulo';

  constructor(private http: HttpClient) {}

  getReferenciasByModulo(moduloId: number): Observable<ReferenciaModulo[]> {
    return this.http.get<ReferenciaModulo[]>(
      `${this.apiUrl}/modulo/${moduloId}`
    );
  }

  criarReferencia(
    referencia: Omit<ReferenciaModulo, 'id'>
  ): Observable<ReferenciaModulo> {
    return this.http.post<ReferenciaModulo>(this.apiUrl, referencia);
  }

  atualizarReferencia(
    id: number,
    referencia: Partial<ReferenciaModulo>
  ): Observable<ReferenciaModulo> {
    return this.http.put<ReferenciaModulo>(`${this.apiUrl}/${id}`, referencia);
  }

  deletarReferencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
