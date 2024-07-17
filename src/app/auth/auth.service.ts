import { ApiAdmService } from './../services/api-adm.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  setUsuario(usuario: any): void {
    console.log("Informações usuario: ", usuario)
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuarioId(): number {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log(usuario)
    console.log(usuario.id)
    return usuario.id;
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
