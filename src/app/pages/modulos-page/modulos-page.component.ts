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
    }
    this.carregarModulosPaginados(this.currentPage)
  }

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage -= 1
      this.carregarModulosPaginados(this.currentPage)
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
