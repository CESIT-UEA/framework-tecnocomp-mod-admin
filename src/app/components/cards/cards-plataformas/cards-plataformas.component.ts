import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { Plataforma } from 'src/interfaces/Plataforma';
import { ConfirmacaoExclusaoComponent } from '../../confirmacao-exclusao/confirmacao-exclusao.component';
import { ConfirmacaoExclusaoProfessorComponent } from '../../confirmacao-exclusao-professor/confirmacao-exclusao-professor.component';

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
    if (this.authService.isAdmin()){
      const dialogRef = this.dialog.open(ConfirmacaoExclusaoComponent, {
          width: '484px',
          height: '219.952px',
          panelClass: 'cardExclusao',
          data: {
            titulo: "Plataforma",
          }
  });

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
  } else {
    const dialogRef = this.dialog.open(ConfirmacaoExclusaoProfessorComponent, {
          width: '484px',
          height: '190.952px',
          panelClass: 'cardExclusao',
          data: {
            titulo: "a plataforma",
            componente: this.plataforma.plataformaNome
          }
  });

    dialogRef.afterClosed().subscribe((senhaAdm) => {
      if (senhaAdm) {
        if (this.plataforma.id != null) {
          this.excluirPlataforma.emit({
            idAdm: this.getUsuarioDados().id,
            senhaAdm: "",
            idExcluir: this.plataforma.id,
          });
        }
      }
    });
  }

    }
    
  getUsuarioDados() {
    return this.authService.getUsuarioDados();
  }
}
