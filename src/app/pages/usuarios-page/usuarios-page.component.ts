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
