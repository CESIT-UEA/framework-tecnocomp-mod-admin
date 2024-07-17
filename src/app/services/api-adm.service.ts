import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiAdmService {
  private baseUrl = 'http://localhost:3101';

  constructor(private http: HttpClient,private router:Router) {}

  login(email: string, senha: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, senha });
  }

  registerUsuario(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/auth/register`, data, { headers });
  }

  registerPlataforma(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/api/plataforma`, data, { headers });
  }

  registerModulo(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/api/modulo`, data, { headers });
  }
}
