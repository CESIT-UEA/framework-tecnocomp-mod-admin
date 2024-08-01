import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiAdmService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  cadastrarLms(dados: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastro_lms`, dados);
  }

  criarModulo(dados: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/criar_modulo`, dados);
  }
}
