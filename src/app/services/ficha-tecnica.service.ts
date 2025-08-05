import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Equipe } from 'src/interfaces/modulo/Equipe';
import { FichaTecnica } from 'src/interfaces/modulo/FichaTecnica';
import { Membro } from 'src/interfaces/modulo/Membro';

@Injectable({
  providedIn: 'root'
})
export class FichaTecnicaService {

private baseUrl = environment.baseUrl + '/api/'; // Ajuste conforme seu ambiente

  constructor(private http: HttpClient) {}

  // Ficha Técnica
  getFichaTecnicaByModulo(moduloId: number): Observable<FichaTecnica | string> {
    return this.http.get<FichaTecnica | string>(`${this.baseUrl}/ficha-tecnica/modulo/${moduloId}`);
  }

  criarFichaTecnica(moduloId: number): Observable<FichaTecnica> {
    return this.http.post<FichaTecnica>(`${this.baseUrl}/ficha-tecnica/modulo/${moduloId}`, {});
  }

  // Equipes
  getEquipes(fichaId: number): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.baseUrl}/equipes/ficha/${fichaId}`);
  }

  criarEquipe(data: Partial<Equipe>): Observable<Equipe> {
    return this.http.post<Equipe>(`${this.baseUrl}/equipe`, data);
  }

  atualizarEquipe(id: number, data: Partial<Equipe>): Observable<Equipe> {
    return this.http.put<Equipe>(`${this.baseUrl}/equipe/${id}`, data);
  }

  deletarEquipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/equipe/${id}`);
  }

  // Membros
  getMembros(equipeId: number): Observable<Membro[]> {
    return this.http.get<Membro[]>(`${this.baseUrl}/membros/equipe/${equipeId}`);
  }

  criarMembro(data: Partial<Membro>): Observable<Membro> {
    return this.http.post<Membro>(`${this.baseUrl}/membro`, data);
  }

  atualizarMembro(id: number, data: Partial<Membro>): Observable<Membro> {
    return this.http.put<Membro>(`${this.baseUrl}/membro/${id}`, data);
  }

  deletarMembro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/membro/${id}`);
  }
}
