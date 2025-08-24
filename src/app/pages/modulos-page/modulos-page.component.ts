import { Component, OnInit } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { PaginationService, PaginationState } from 'src/app/services/pagination.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';

@Component({
  selector: 'app-modulos-page',
  templateUrl: './modulos-page.component.html',
  styleUrls: ['./modulos-page.component.css']
})
export class ModulosPageComponent implements OnInit {
  modulos: Modulo[] = [];
  pagination: PaginationState;

  constructor(
    private apiService: ApiAdmService,
    private paginationService: PaginationService
  ) {
    this.pagination = this.paginationService.createPaginationState();
  }

  ngOnInit(): void {
    this.carregarModulosPaginados(this.pagination.currentPage);
  }

  // Handler para mudanças de página
  onPageChange(page: number): void {
    this.carregarModulosPaginados(page);
  }

  excluirModulo({ idAdm, senhaAdm, idExcluir }: { idAdm: number; senhaAdm: string; idExcluir: number }) {
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

  carregarModulosPaginados(page: number) {
    this.apiService.listarModulos(page).subscribe(
      (response) => {
        this.modulos = response.modulos;
        this.paginationService.updatePaginationState(
          this.pagination,
          response.infoModulos.totalPaginas,
          response.infoModulos.totalRegistros
        );
      },
      (error) => {
        console.error('Erro ao carregar módulos:', error);
      }
    );
  }
}
