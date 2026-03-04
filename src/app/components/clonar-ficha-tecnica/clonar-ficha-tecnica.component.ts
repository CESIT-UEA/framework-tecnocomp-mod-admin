import { ConfirmarClonagemFichaComponent } from './../../confirmar-clonagem-ficha/confirmar-clonagem-ficha.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { PaginationService, PaginationState } from 'src/app/services/pagination.service';
import { InfoPaginacao } from 'src/interfaces/modulo/InfoPaginacao';
import { Modulo } from 'src/interfaces/modulo/Modulo';

@Component({
  selector: 'app-clonar-ficha-tecnica',
  templateUrl: './clonar-ficha-tecnica.component.html',
  styleUrls: ['./clonar-ficha-tecnica.component.css']
})
export class ClonarFichaTecnicaComponent implements OnInit {
    modulos: Modulo[] = [];
    pagination: PaginationState;
    totalModulos!: number;
    quantidadeItens: number = 4;
    infoModulos: InfoPaginacao = {totalPaginas: 1, totalRegistros: 1}
    constructor(
      private apiService: ApiAdmService, 
      private paginationService: PaginationService,
      private authService: AuthService
    ){
      this.pagination = this.paginationService.createPaginationState();

    }

    ngOnInit(): void {
      if (this.authService.isAdmin()){
        this.carregarModulosPaginados(this.infoModulos.totalPaginas, this.quantidadeItens)
      } else {
        this.carregarMeusModulosPaginados(this.authService.getUsuarioId(), this.pagination.currentPage)
      }
        
    }


    // Handler para mudanças de página
  onPageChange(page: number, quantidadeItens: number): void {
    this.carregarModulosPaginados(page, quantidadeItens);
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
