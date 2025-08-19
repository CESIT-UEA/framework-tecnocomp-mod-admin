import { ValidaLinkResponse } from 'src/interfaces/validaLinkResponse';

import { Location } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment, environmentFrontEnd } from 'src/environments/environment';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { Plataforma } from 'src/interfaces/Plataforma';
import { Topico } from 'src/interfaces/topico/Topico';
import { User } from 'src/interfaces/user';
import { UserUpdate } from 'src/interfaces/userDTO/userUpdate';
import { DadosResponse } from 'src/interfaces/DadosResponse'
import { InfoPaginacao } from 'src/interfaces/modulo/InfoPaginacao'

@Injectable({
  providedIn: 'root',
})
export class ApiAdmService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  registerUsuario(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  autoRegister(data: any): Observable<DadosResponse> {
    return this.http.post<DadosResponse>(`${this.baseUrl}/api/autoRegister`, data);
  }

  registerPlataforma(data: any) {
    return this.http.post(`${this.baseUrl}/api/plataforma`, data);
  }

  registerModulo(data: any) {
    return this.http.post(`${this.baseUrl}/api/modulo`, data);
  }

  registerModuloTeste(modulo: Modulo) {
    return this.http.post('/api/modulo', modulo);
  }

  listarUsers(page: number): Observable<{users: User[], infoUsers: InfoPaginacao}> {
    return this.http
      .get<{ users: User[], infoUsers: InfoPaginacao }>(`${this.baseUrl}/api/listar-usuarios?page=${page}`)
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users/${id}`);
  }

  updateUser(
    idEditar: number,
    idAdm: number,
    senhaAdm: string,
    user: Partial<User>
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/users/${idEditar}`, {
      idAdm,
      senhaAdm,
      ...user,
    });
  }

  excluirUsuario(
    idAdm: number,
    senhaAdm: string,
    idExcluir: number
  ): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/users`, {
      body: { idAdm, senhaAdm, idExcluir },
    });
  }

  listarModulos(page: number) {
    return this.http.get<{modulos: Modulo[], infoModulos: InfoPaginacao}>(`${this.baseUrl}/api/modulos?page=${page}`);
  }
  listarTemplates() {
    return this.http.get<Modulo[]>(`${this.baseUrl}/api/templates`);
  }
  excluirModulo(id: number, idAdm: number, senhaAdm: string) {
    const params = new HttpParams()
      .set('idAdm', idAdm.toString())
      .set('senhaAdm', senhaAdm);

    return this.http.delete(`${this.baseUrl}/api/modulos/${id}`, { params });
  }

  obterModuloPorId(id: number) {
    return this.http.get<Modulo>(`${this.baseUrl}/api/modulo/${id}`);
  }

  obterTopicoCompleto(idTopico: number) {
    return this.http.get<Topico[]>(`${this.baseUrl}/api/topicos/${idTopico}`);
  }

  atualizarModulo(id: number, dadosAtualizados: Modulo) {
    return this.http.put(`${this.baseUrl}/api/modulos/${id}`, dadosAtualizados);
  }

  alterarStatusPublicacao(id: number, publicar: boolean): Observable<Modulo> {
    return this.http.patch<Modulo>(
      `${this.baseUrl}/api/modulos/${id}/publicar`,
      { publicar }
    );
  }

  alterarTemplateModulo(id: number, template: boolean): Observable<Modulo> {
    return this.http.patch<Modulo>(
      `${this.baseUrl}/api/template/modulo/${id}`,
      { template }
    );
  }

  cadastrarTopico(dadosTopico: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/topicos`, dadosTopico);
  }

  editarTopico(id: number, dadosAtualizados: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/topico/${id}`, dadosAtualizados);
  }

  excluirTopico(idExcluir: number, idAdm: number, senhaAdm: string) {
    const params = new HttpParams()
      .set('idAdm', idAdm.toString())
      .set('senhaAdm', senhaAdm);

    return this.http.delete(`${this.baseUrl}/api/topico/${idExcluir}`, {
      params,
    });
  }

  obterTopicoPorId(id: number) {
    return this.http.get<Topico>(`${this.baseUrl}/api/topico/${id}`);
  }

  listarPlataformas(): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(`${this.baseUrl}/api/plataforma`);
  }

  excluirPlataforma(
    idAdm: number,
    senhaAdm: string,
    idExcluir: number
  ): Observable<void> {
    const params = new HttpParams()
      .set('idAdm', idAdm.toString())
      .set('senhaAdm', senhaAdm);

    return this.http.delete<void>(
      `${this.baseUrl}/api/plataforma/${idExcluir}`,
      { params }
    );
  }

  editarPlataforma(
    id: number,
    plataforma: Partial<Plataforma>
  ): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/api/plataforma/${id}`,
      plataforma
    );
  }

  obterPlataformaPorId(id: number): Observable<Plataforma> {
    return this.http.get<Plataforma>(`${this.baseUrl}/api/plataforma/${id}`);
  }

  updateSelf(
    userId: number,
    senhaAtual: string,
    dadosAtualizados: any
  ): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/users/${userId}/self`, {
      senhaAtual,
      ...dadosAtualizados,
    });
  }

  listarModulosPeloIdUsuario(id: number): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(`${this.baseUrl}/api/modulos/usuario/${id}`);
  }

  listarPlataformasPeloIdUsuario(id: number): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(
      `${this.baseUrl}/api/plataformas/usuario/${id}`
    );
  }

  message(msg: string) {
    return this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
    });
  }

  
  enviarEmailSenhaEsquecida(email: string): Observable<DadosResponse>{
    return this.http.post<DadosResponse>(`${this.baseUrl}/api/forgot_password`, {email, baseUrl: environmentFrontEnd.baseUrl})
  }

  validaLinkRedefinirSenha(email: string, token: string): Observable<ValidaLinkResponse>{
    return this.http.post<ValidaLinkResponse>(
      `${this.baseUrl}/api/valida_link`,
      {email, token, baseUrl: environmentFrontEnd.baseUrl})
  }

  resetPassword(email: string, token: string, novaSenha: string){
    return this.http.post(`${this.baseUrl}/api/reset_password`, {email, token, novaSenha})
  }

  confirmarAutoRegister(dados: { email: string, codigo: string }): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/valida_autoRegister`, dados)
  }


  clonarTemplate(id: number) {
    const params = new HttpParams().set('id', id.toString());

    return this.http.post(`${this.baseUrl}/api/templates/clonar/${id}`, params);
  }

  voltar(): void {
    this.location.back();
  }

}
