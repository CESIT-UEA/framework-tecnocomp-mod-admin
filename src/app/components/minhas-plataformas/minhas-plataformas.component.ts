import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Plataforma } from 'src/interfaces/Plataforma';
import { User } from 'src/interfaces/user';
import { PaginationState, PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-minhas-plataformas',
  templateUrl: './minhas-plataformas.component.html',
  styleUrls: ['./minhas-plataformas.component.css']
})
export class MinhasPlataformasComponent {
  plataformas: Plataforma[] = [];
  pagination: PaginationState;
  totalPlataformas = 0;

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
    this.carregarMinhasPlataformasPaginadas(this.dadosUsuario().id, this.pagination.currentPage)
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

  carregarMinhasPlataformasPaginadas(id: number, page: number){
    this.apiService.listarPlataformasPeloIdUsuario(id, page).subscribe(
      (response) => {
        this.plataformas = response.plataformas;
        this.totalPlataformas = response.infoPlataforma.totalRegistros;
        this.paginationService.updatePaginationState(
          this.pagination, 
          response.infoPlataforma.totalPaginas, 
          response.infoPlataforma.totalRegistros
        );
        this.pagination.currentPage = page;
        console.log(response);
      },
      (error) => {
        console.error('Erro ao carregar plataformas:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.carregarMinhasPlataformasPaginadas(this.dadosUsuario().id, page);
  }
}
