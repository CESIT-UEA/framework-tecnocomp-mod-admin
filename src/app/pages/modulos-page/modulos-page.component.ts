import { Component } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';

@Component({
  selector: 'app-modulos-page',
  templateUrl: './modulos-page.component.html',
  styleUrls: ['./modulos-page.component.css']
})
export class ModulosPageComponent {
  modulos: Modulo[] = [];
  currentPage: number = 1;
  quantidade_pages = 1;
  totalModulos: number = 0;
  
  // Array para os indicadores de página (máximo 3)
  get paginationPages(): number[] {
    const total = this.quantidade_pages;
    const current = this.currentPage;
    
    if (total <= 3) {
      // Se tem 3 ou menos páginas, mostra todas
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    // Se tem mais de 3 páginas, mostra 3 botões inteligentes
    if (current === 1) {
      // Página 1: mostra 1, 2, 3
      return [1, 2, 3];
    } else if (current === total) {
      // Última página: mostra total-2, total-1, total
      return [total - 2, total - 1, total];
    } else {
      // Página intermediária: mostra current-1, current, current+1
      return [current - 1, current, current + 1];
    }
  }

  // Mostra indicador de mais páginas à esquerda
  get shouldShowLeftIndicator(): boolean {
    return this.quantidade_pages > 3 && this.currentPage > 2;
  }

  // Mostra indicador de mais páginas à direita
  get shouldShowRightIndicator(): boolean {
    return this.quantidade_pages > 3 && this.currentPage < this.quantidade_pages - 1;
  } 

  constructor(private apiService: ApiAdmService) {}

  ngOnInit(): void {
    this.carregarModulosPaginados(this.currentPage)
  }

  excluirModulo({ idAdm, senhaAdm, idExcluir }: { idAdm: number; senhaAdm: string; idExcluir: number }) {
    this.apiService.excluirModulo(idExcluir,idAdm, senhaAdm ).subscribe(
      () => {
        alert('Modulo excluído com sucesso!');
        this.modulos = this.modulos.filter((modulo) => modulo.id !== idExcluir);
      },
      (error) => {
        console.log(error)
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

  nextPage(){
    if (this.currentPage < this.quantidade_pages){
      this.currentPage += 1
      this.carregarModulosPaginados(this.currentPage)
    }
  }

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage -= 1
      this.carregarModulosPaginados(this.currentPage)
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.quantidade_pages) {
      this.currentPage = page;
      this.carregarModulosPaginados(this.currentPage);
    }
  }

  carregarModulosPaginados(page: number){
    this.apiService.listarModulos(page).subscribe(
      (response) => {
        this.modulos = response.modulos;
        this.quantidade_pages = response.infoModulos.totalPaginas
        this.totalModulos = response.infoModulos.totalRegistros
      },
      (error) => {
        console.error('Erro ao carregar módulos:', error);
      }
    );
  }

}
