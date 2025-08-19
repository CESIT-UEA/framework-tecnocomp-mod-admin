import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { Plataforma } from 'src/interfaces/Plataforma';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-meu-perfil-page',
  templateUrl: './meu-perfil-page.component.html',
  styleUrls: ['./meu-perfil-page.component.css'],
})
export class MeuPerfilPageComponent implements OnInit {
  modulos: Modulo[] = [];
  plataformas: Plataforma[] = [];
  currentPageModulo: number = 1;
  quantidadePagesModulos = 1;
  totalModulos: number = 0; 

  currentPagePlataforma: number = 1;
  quantidadePagesPlataformas = 1;
  totalPlataformas = 0;


  constructor(
    private authService: AuthService,
    private apiService: ApiAdmService
  ) {}

  dadosUsuario(): User {
    return this.authService.getUsuarioDados();
  }

  ngOnInit(): void {
    this.carregarMeusModulosPaginados(this.dadosUsuario().id, this.currentPageModulo)
    this.carregarMinhasPlataformasPaginadas(this.dadosUsuario().id, this.currentPagePlataforma )

  }

  excluirModulo({
    idAdm,
    senhaAdm,
    idExcluir,
  }: {
    idAdm: number;
    senhaAdm: string;
    idExcluir: number;
  }) {
    this.apiService.excluirModulo(idExcluir, idAdm, senhaAdm).subscribe(
      () => {
        alert('Modulo excluído com sucesso!');
        this.modulos = this.modulos.filter((modulo) => modulo.id !== idExcluir);
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Senha de administrador incorreta.');
        } else if (error.status === 403) {
          alert('Você não tem permissão para realizar essa ação.');
        } else if (error.status === 404) {
          alert('Modulo não encontrado.');
        } else {
          alert('Erro ao excluir modulo.');
        }
      }
    );
  }

  excluirPlataforma({ idAdm, senhaAdm, idExcluir }: { idAdm: number; senhaAdm: string; idExcluir: number }) {
    this.apiService.excluirPlataforma(idAdm, senhaAdm, idExcluir).subscribe(
      () => {
        alert('Plataforma excluída com sucesso!');
        this.plataformas = this.plataformas.filter((plataforma) => plataforma.id !== idExcluir);
      },
      (error) => {
        console.error('Erro ao excluir plataforma:', error);
        if (error.status === 401) {
          alert('Senha de administrador incorreta.');
        } else if (error.status === 403) {
          alert('Você não tem permissão para realizar essa ação.');
        } else if (error.status === 404) {
          alert('Plataforma não encontrada.');
        } else {
          alert('Erro ao excluir plataforma.');
        }
      }
    );
  }

  carregarMeusModulosPaginados(id: number, page: number){
    this.apiService.listarModulosPeloIdUsuario(id, page).subscribe(
      (response) => {
        
        this.modulos = response.modulos;
        this.quantidadePagesModulos = response.infoModulos.totalPaginas;
        this.totalModulos = response.infoModulos.totalRegistros;
      },
      (error) => {
        console.error('Erro ao carregar módulos:', error);
      }
    );
  }

  carregarMinhasPlataformasPaginadas(id: number, page: number){
    this.apiService.listarPlataformasPeloIdUsuario(id, page).subscribe(
      (response) => {
        console.log(response)
        this.plataformas = response.plataformas;
        this.quantidadePagesPlataformas = response.infoPlataforma.totalPaginas;
        this.totalPlataformas = response.infoPlataforma.totalRegistros;
      },
      (error) => {
        console.error('Erro ao carregar plataformas:', error);
      }
    );
  }

  nextPageModulo(){
    if (this.currentPageModulo < this.quantidadePagesModulos){
      this.currentPageModulo += 1
      this.carregarMeusModulosPaginados(this.dadosUsuario().id, this.currentPageModulo)
    }
  }

  previousPageModulo(){
    if (this.currentPageModulo > 1) {
      this.currentPageModulo -= 1
      this.carregarMeusModulosPaginados(this.dadosUsuario().id, this.currentPageModulo)
    }
  }

  nextPagePlataforma(){
    if (this.currentPagePlataforma < this.quantidadePagesPlataformas){
      this.currentPagePlataforma += 1
      this.carregarMinhasPlataformasPaginadas(this.dadosUsuario().id, this.currentPagePlataforma)
    }
  }

  previousPagePlataforma(){
    if (this.currentPagePlataforma > 1) {
      this.currentPagePlataforma -= 1
      this.carregarMinhasPlataformasPaginadas(this.dadosUsuario().id, this.currentPagePlataforma)
    }
  }
}
