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
}
