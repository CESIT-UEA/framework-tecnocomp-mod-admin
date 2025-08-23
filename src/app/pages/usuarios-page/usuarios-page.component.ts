import { Component, OnInit } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.css']
})
export class UsuariosPageComponent implements OnInit {
  usuarios: User[] = [];
  currentPage: number = 1;
  quantidade_pages = 1;
  totalUsuarios: number = 0;

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

  constructor(private userService: ApiAdmService){}

  ngOnInit(): void {
    this.carregarUsuariosPaginados(this.currentPage)
  }

  excluirUsuario({ idAdm, senhaAdm, idExcluir }: { idAdm: number; senhaAdm: string; idExcluir: number }) {
    this.userService.excluirUsuario(idAdm, senhaAdm, idExcluir).subscribe(
      () => {
        alert('Usuário excluído com sucesso!');
        this.usuarios = this.usuarios.filter((user) => user.id !== idExcluir);
      },
      (error) => {
        console.log(error)
        if (error.status === 401) {
          alert('Senha de administrador incorreta.');
        } else if (error.status === 403) {
          alert('Você não tem permissão para realizar essa ação.');
        } else if (error.status === 404) {
          alert('Usuário não encontrado.');
        } else {
          alert('Erro ao excluir usuário.');
        }
      }
    );
  }

   nextPage(){
    if (this.currentPage < this.quantidade_pages){
      this.currentPage += 1
      this.carregarUsuariosPaginados(this.currentPage)
    }
  }

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage -= 1
      this.carregarUsuariosPaginados(this.currentPage)
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.quantidade_pages) {
      this.currentPage = page;
      this.carregarUsuariosPaginados(this.currentPage);
    }
  }

  carregarUsuariosPaginados(page: number){
    this.userService.listarUsers(page).subscribe(
      (response) => {
        this.usuarios = response.users;
        this.quantidade_pages = response.infoUsers.totalPaginas
        this.totalUsuarios = response.infoUsers.totalRegistros
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

}
