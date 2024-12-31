import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { ConfirmacaoExclusaoComponent } from '../../confirmacao-exclusao/confirmacao-exclusao.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cards-modulos',
  templateUrl: './cards-modulos.component.html',
  styleUrls: ['./cards-modulos.component.css'],
})
export class CardsModulosComponent {
  @Input() modulo!: Modulo;
  @Output() excluirModulo = new EventEmitter<{
    idAdm: number;
    senhaAdm: string;
    idExcluir: number;
  }>();

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  abrirConfirmacaoExcluir(): void {
    const dialogRef = this.dialog.open(ConfirmacaoExclusaoComponent);
    dialogRef.afterClosed().subscribe((senhaAdm) => {
      if (senhaAdm) {
        if (this.modulo.id != null) {
          this.excluirModulo.emit({
            idAdm: this.authService.getUsuarioDados().id,
            senhaAdm: senhaAdm,
            idExcluir: this.modulo.id,
          });
        }
      }
    });
  }

  verMais(): void {
    // Lógica para exibir mais detalhes do módulo
    console.log('Ver mais sobre o módulo:', this.modulo);
  }
}
