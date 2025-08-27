import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { User } from 'src/interfaces/user';
import { PaginationState, PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-meus-modulos',
  templateUrl: './meus-modulos.component.html',
  styleUrls: ['./meus-modulos.component.css']
})
export class MeusModulosComponent {
  modulos: Modulo[] = [];
  pagination: PaginationState;
  totalModulos: number = 0; 

  constructor(
    private authService: AuthService,
    private apiService: ApiAdmService,
    private paginationService: PaginationService
  ) {
    this.pagination = this.paginationService.createPaginationState();
  }

  dadosUsuario(): User {
    return this.authService.getUsuarioDados();
  }

  ngOnInit(): void {
    this.carregarMeusModulosPaginados(this.dadosUsuario().id, this.pagination.currentPage)
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

  carregarMeusModulosPaginados(id: number, page: number){
    this.apiService.listarModulosPeloIdUsuario(id, page).subscribe(
      (response) => {
        this.modulos = response.modulos;
        this.totalModulos = response.infoModulos.totalRegistros;
        this.paginationService.updatePaginationState(
          this.pagination, 
          response.infoModulos.totalPaginas, 
          response.infoModulos.totalRegistros
        );
        this.pagination.currentPage = page;
        console.log(response);
      },
      (error) => {
        console.error('Erro ao carregar módulos:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.carregarMeusModulosPaginados(this.dadosUsuario().id, page);
  }
}
