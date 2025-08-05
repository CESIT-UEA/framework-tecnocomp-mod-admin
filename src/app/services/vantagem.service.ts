import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vantagem } from 'src/interfaces/modulo/vantagem.interface';

@Injectable({
  providedIn: 'root'
})
export class VantagemService {

private baseUrl = environment.baseUrl + '/api/';

  constructor(private http: HttpClient) {}

  listar(moduloId: number): Observable<Vantagem[]> {
    return this.http.get<Vantagem[]>(`${this.baseUrl}/vantagens/${moduloId}`);
  }

  criar(data: Partial<Vantagem>): Observable<Vantagem> {
    return this.http.post<Vantagem>(`${this.baseUrl}/vantagens`, data);
  }

  atualizar(id: number, data: Partial<Vantagem>): Observable<Vantagem> {
    return this.http.put<Vantagem>(`${this.baseUrl}/vantagens/${id}`, data);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/vantagens/${id}`);
  }
}
