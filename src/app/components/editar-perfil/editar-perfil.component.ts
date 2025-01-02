import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  usuario: any = { username: '', email: '' };
  senhaAtual: string = '';
  novaSenha: string = '';

  constructor(
    private authService: AuthService,
    private userService: ApiAdmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtém os dados do usuário logado
    this.usuario = this.authService.getUsuarioDados();
  }

  atualizarPerfil(): void {
    if (!this.senhaAtual) {
      alert('Você precisa informar sua senha atual para atualizar o perfil.');
      return;
    }

    const dadosAtualizados: any = {
      username: this.usuario.username,
      email: this.usuario.email,
    };

    // Adiciona a nova senha ao payload, se fornecida
    if (this.novaSenha) {
      dadosAtualizados.novaSenha = this.novaSenha;
    }

    this.userService.updateSelf(this.usuario.id, this.senhaAtual, dadosAtualizados).subscribe(
      (res) => {
        console.log('Resposta de sucesso:', res);
        if (this.novaSenha) {
          alert('Senha alterada com sucesso! Por favor, faça login novamente.');
          this.authService.logout();
        } else {
          alert(res.message || 'Perfil atualizado com sucesso!');
          this.authService.setUsuario({ ...this.usuario, ...dadosAtualizados });
          this.router.navigate(['/meu-perfil']);
        }
      },
      (error) => {
        console.log(error.status)
        console.error('Erro ao atualizar perfil:', error.message);
        alert(error.message || 'Erro ao atualizar o perfil.');
      }
    );
  }
}
