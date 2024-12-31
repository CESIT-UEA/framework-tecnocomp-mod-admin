import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { Plataforma } from 'src/interfaces/Plataforma';
import { ConfirmacaoExclusaoComponent } from '../../confirmacao-exclusao/confirmacao-exclusao.component';

@Component({
  selector: 'app-cards-plataformas',
  templateUrl: './cards-plataformas.component.html',
  styleUrls: ['./cards-plataformas.component.css'],
})
export class CardsPlataformasComponent {
  @Input() plataforma!: Plataforma;
  @Output() excluirPlataforma = new EventEmitter<{
    idAdm: number;
    senhaAdm: string;
    idExcluir: number;
  }>();

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  abrirConfirmacaoExcluir() {
    const dialogRef = this.dialog.open(ConfirmacaoExclusaoComponent);
    dialogRef.afterClosed().subscribe((senhaAdm) => {
      if (senhaAdm) {
        if (this.plataforma.id != null) {
          this.excluirPlataforma.emit({
            idAdm: this.getUsuarioDados().id,
            senhaAdm: senhaAdm,
            idExcluir: this.plataforma.id,
          });
        }
      }
    });
  }

  getUsuarioDados() {
    return this.authService.getUsuarioDados();
  }
}
