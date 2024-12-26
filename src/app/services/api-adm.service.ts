import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Modulo } from 'src/interfaces/topico/Modulo';
import { Topico } from 'src/interfaces/topico/Topico';
import { User } from 'src/interfaces/user';
import { UserUpdate } from 'src/interfaces/userDTO/userUpdate';

@Injectable({
  providedIn: 'root'
})
export class ApiAdmService {
  private baseUrl = environment.baseUrl;

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

  registerModuloTeste(modulo: Modulo) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('/api/modulo', modulo,{ headers });
  }

  listarUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ users: User[] }>(`${this.baseUrl}/api/listar-usuarios`, { headers }).pipe(
      map((response) => response.users) // Extraia apenas o array de usuários
    );
  }

  getUserById(id: number): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.baseUrl}/api/users/${id}`, { headers });
  }

  updateUser(idEditar: number, idAdm: number, senhaAdm: string, user: Partial<User>): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(`${this.baseUrl}/api/users/${idEditar}`, {
      idAdm,
      senhaAdm,
      ...user,
    }, { headers });
  }

  excluirUsuario(idAdm: number, senhaAdm: string, idExcluir: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/api/users`, {
      headers,
      body: { idAdm, senhaAdm, idExcluir },
    });
  }

  listarModulos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Modulo[]>(`${this.baseUrl}/api/modulos`, { headers });
  }
  excluirModulo(id: number, idAdm: number, senhaAdm: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set('idAdm', idAdm.toString())
      .set('senhaAdm', senhaAdm);

    return this.http.delete(`${this.baseUrl}/api/modulos/${id}`, { headers, params });
  }

  obterModuloPorId(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Modulo>(`${this.baseUrl}/api/modulo/${id}`, { headers });
  }


  obterTopicoCompleto(idTopico: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Topico[]>(`${this.baseUrl}/api/topicos/${idTopico}`,{ headers});
  }

  atualizarModulo(id: number, dadosAtualizados: Modulo) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/api/modulos/${id}`, dadosAtualizados,{ headers});
  }

  alterarStatusPublicacao(id: number, publicar: boolean): Observable<Modulo> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<Modulo>(`${this.baseUrl}/api/modulos/${id}/publicar`, { publicar },{ headers});
  }

  cadastrarTopico(dadosTopico: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/api/topicos`, dadosTopico,{ headers});
  }

}
