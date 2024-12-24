import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/interfaces/user';
import { ConfirmacaoExclusaoComponent } from '../../confirmacao-exclusao/confirmacao-exclusao.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.css'],
})
export class CardsUsuariosComponent {
  @Input() user!: User;
  @Output() excluirUsuario = new EventEmitter<{ idAdm: number; senhaAdm: string; idExcluir: number }>();

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  abrirConfirmacaoExcluir() {
    const dialogRef = this.dialog.open(ConfirmacaoExclusaoComponent);
    dialogRef.afterClosed().subscribe((senhaAdm) => {

      if (senhaAdm) {
        this.excluirUsuario.emit({idAdm: this.getUsuarioDados().id , senhaAdm: senhaAdm , idExcluir: this.user.id});
      }
    });
  }

  getUsuarioDados(): User {
    return this.authService.getUsuarioDados();
  }
}
