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
  constructor(private userService: ApiAdmService){}

  ngOnInit(): void {
    this.userService.listarUsers().subscribe(
      (response) => {
        this.usuarios = response;
        console.log(response)
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
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


}
