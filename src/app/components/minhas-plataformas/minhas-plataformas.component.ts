import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Plataforma } from 'src/interfaces/Plataforma';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-minhas-plataformas',
  templateUrl: './minhas-plataformas.component.html',
  styleUrls: ['./minhas-plataformas.component.css']
})
export class MinhasPlataformasComponent {
  plataformas: Plataforma[] = [];
  currentPagePlataforma: number = 1;
  quantidadePagesPlataformas = 1;
  totalPlataformas = 0;

  constructor(
    private authService: AuthService,
    private apiService: ApiAdmService
  ) {}

  dadosUsuario(): User {
    return this.authService.getUsuarioDados();
  }

  ngOnInit(): void {
    this.carregarMinhasPlataformasPaginadas(this.dadosUsuario().id, this.currentPagePlataforma)
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
        this.quantidadePagesPlataformas = response.infoPlataforma.totalPaginas;
        this.totalPlataformas = response.infoPlataforma.totalRegistros;
        console.log(response);
      },
      (error) => {
        console.error('Erro ao carregar plataformas:', error);
      }
    );
  }

  nextPagePlataforma(){
    if (this.currentPagePlataforma < this.quantidadePagesPlataformas){
      this.currentPagePlataforma += 1
      this.carregarMinhasPlataformasPaginadas(this.dadosUsuario().id, this.currentPagePlataforma)
    }
  }

  previousPagePlataforma(){
    if (this.currentPagePlataforma > 1) {
      this.currentPagePlataforma -= 1
      this.carregarMinhasPlataformasPaginadas(this.dadosUsuario().id, this.currentPagePlataforma)
    }
  }

}
