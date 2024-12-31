import { ApiAdmService } from './../services/api-adm.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiAdmService, private router: Router) {}

  login(email: string, senha: string) {
    return this.apiService.login(email, senha);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setUsuario(usuario: User): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuarioId(): number {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(usuario)
    console.log(usuario.id)
    return usuario.id;
  }

  getUsuarioDados(): User{
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario;
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  validaToken(token:string){
    //Fazer função de validação do token
  }
}
