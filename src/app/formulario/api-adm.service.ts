import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAdmService {
  private baseUrl = 'http://localhost:3101';

  constructor(private http: HttpClient) {}

  cadastrarLms(dados: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastro_lms`, dados);
  }

  criarModulo(dados: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/criar_modulo`, dados);
  }
}
