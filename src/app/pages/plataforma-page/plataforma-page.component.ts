import { Component } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Plataforma } from 'src/interfaces/Plataforma';

@Component({
  selector: 'app-plataforma-page',
  templateUrl: './plataforma-page.component.html',
  styleUrls: ['./plataforma-page.component.css']
})
export class PlataformaPageComponent {
  plataformas: Plataforma[] = [];
  currentPage: number = 1;
  quantidade_pages = 1;
  totalPlataformas: number = 0; 


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
    this.carregarPlataformasPaginadas(this.currentPage)
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

  carregarPlataformasPaginadas(page: number){
    this.apiService.listarPlataformas(page).subscribe(
      (response) => {
        console.log(response)
        this.plataformas = response.plataformas;
        this.quantidade_pages = response.infoPlataformas.totalPaginas
        this.totalPlataformas = response.infoPlataformas.totalRegistros
        console.log(response)
      },
      (error) => {
        console.error('Erro ao carregar plataformas:', error);
      }
    );
  }

   nextPage(){
    if (this.currentPage < this.quantidade_pages){
      this.currentPage += 1
      this.carregarPlataformasPaginadas(this.currentPage)
    }
    
  }

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage -= 1
      this.carregarPlataformasPaginadas(this.currentPage)
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.quantidade_pages) {
      this.currentPage = page;
      this.carregarPlataformasPaginadas(this.currentPage);
    }
  }
}
