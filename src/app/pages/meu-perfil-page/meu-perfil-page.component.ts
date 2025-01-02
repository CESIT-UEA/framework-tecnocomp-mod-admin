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

  constructor(
    private authService: AuthService,
    private apiService: ApiAdmService
  ) {}

  dadosUsuario(): User {
    return this.authService.getUsuarioDados();
  }

  ngOnInit(): void {
    this.apiService.listarModulosPeloIdUsuario(this.dadosUsuario().id).subscribe(
      (response) => {
        this.modulos = response;
        console.log(response);
      },
      (error) => {
        console.error('Erro ao carregar módulos:', error);
      }
    );

    this.apiService.listarPlataformasPeloIdUsuario(this.dadosUsuario().id).subscribe(
      (response) => {
        this.plataformas = response;
        console.log(response);
      },
      (error) => {
        console.error('Erro ao carregar módulos:', error);
      }
    );

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
}
