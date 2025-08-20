import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-meus-modulos',
  templateUrl: './meus-modulos.component.html',
  styleUrls: ['./meus-modulos.component.css']
})
export class MeusModulosComponent {
  modulos: Modulo[] = [];
  currentPage: number = 1;
  quantidade_pages = 1;
  totalModulos: number = 0; 

  constructor(
    private authService: AuthService,
    private apiService: ApiAdmService
  ) {}

  dadosUsuario(): User {
    return this.authService.getUsuarioDados();
  }

  ngOnInit(): void {
    this.carregarMeusModulosPaginados(this.dadosUsuario().id, this.currentPage)
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
        this.quantidade_pages = response.infoModulos.totalPaginas;
        this.totalModulos = response.infoModulos.totalRegistros;
        console.log(response);
      },
      (error) => {
        console.error('Erro ao carregar módulos:', error);
      }
    );
  }

  nextPage(){
    if (this.currentPage < this.quantidade_pages){
      this.currentPage += 1
      this.carregarMeusModulosPaginados(this.dadosUsuario().id, this.currentPage)
    }
  }

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage -= 1
      this.carregarMeusModulosPaginados(this.dadosUsuario().id, this.currentPage)
    }
  }
}
