import { InfoPaginacao } from './../../../interfaces/modulo/InfoPaginacao';
import { Component, OnInit } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { PaginationService, PaginationState } from 'src/app/services/pagination.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';

import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-modulos-page',
  templateUrl: './modulos-page.component.html',
  styleUrls: ['./modulos-page.component.css']
})
export class ModulosPageComponent implements OnInit {
  modulos: Modulo[] = [];
  pagination: PaginationState;
  isOpenDrawer: boolean = true;
  quantidadeItens!: number;
  infoModulos: InfoPaginacao = {totalPaginas: 1, totalRegistros: 1}

  constructor(
    private apiService: ApiAdmService,
    private paginationService: PaginationService,
    private router: Router
  ) {
    this.pagination = this.paginationService.createPaginationState();
    
  }

  ngOnInit(): void {
    
    this.apiService.valor$
    .subscribe(valor => {
      this.isOpenDrawer = valor
      console.log(this.isOpenDrawer)
      this.quantidadeItens = this.isOpenDrawer ? 3 : 4;

      if (this.pagination.currentPage > this.infoModulos.totalPaginas){
        console.log(this.infoModulos.totalPaginas)
        this.carregarModulosPaginados(this.infoModulos.totalPaginas, this.quantidadeItens)
      } else {
        this.carregarModulosPaginados(this.pagination.currentPage, this.quantidadeItens);
      }
    

  });


     
  }

  // Handler para mudanças de página
  onPageChange(page: number, quantidadeItens: number): void {
    this.carregarModulosPaginados(page, quantidadeItens);
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

  carregarModulosPaginados(page: number, quantidadeItens: number) {
    this.apiService.listarModulos(page, quantidadeItens).subscribe(
      (response) => {
        console.log(response)
        const totalPaginas = response.infoModulos.totalPaginas;
        if (page > totalPaginas && totalPaginas > 0) {
        this.pagination.currentPage = totalPaginas;
        this.carregarModulosPaginados(totalPaginas, quantidadeItens);
        return;
      }

        this.modulos = response.modulos;
        this.infoModulos = response.infoModulos
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
