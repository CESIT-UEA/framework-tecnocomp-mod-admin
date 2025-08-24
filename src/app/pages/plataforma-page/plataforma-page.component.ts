import { Component, OnInit } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { PaginationService, PaginationState } from 'src/app/services/pagination.service';
import { Plataforma } from 'src/interfaces/Plataforma';

@Component({
  selector: 'app-plataforma-page',
  templateUrl: './plataforma-page.component.html',
  styleUrls: ['./plataforma-page.component.css']
})
export class PlataformaPageComponent implements OnInit {
  plataformas: Plataforma[] = [];
  pagination: PaginationState;

  constructor(
    private apiService: ApiAdmService,
    private paginationService: PaginationService
  ) {
    this.pagination = this.paginationService.createPaginationState();
  }

  ngOnInit(): void {
    this.carregarPlataformasPaginadas(this.pagination.currentPage);
  }

  // Handler para mudanças de página
  onPageChange(page: number): void {
    this.carregarPlataformasPaginadas(page);
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

  carregarPlataformasPaginadas(page: number) {
    this.apiService.listarPlataformas(page).subscribe(
      (response) => {
        console.log(response);
        this.plataformas = response.plataformas;
        this.paginationService.updatePaginationState(
          this.pagination,
          response.infoPlataformas.totalPaginas,
          response.infoPlataformas.totalRegistros
        );
        console.log(response);
      },
      (error) => {
        console.error('Erro ao carregar plataformas:', error);
      }
    );
  }
}
