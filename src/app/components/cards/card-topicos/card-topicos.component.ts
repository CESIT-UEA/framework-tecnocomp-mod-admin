import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Topico } from 'src/interfaces/topico/Topico';
import { ConfirmacaoExclusaoComponent } from '../../confirmacao-exclusao/confirmacao-exclusao.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-card-topicos',
  templateUrl: './card-topicos.component.html',
  styleUrls: ['./card-topicos.component.css']
})
export class CardTopicosComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input() topico!: Topico;
  @Input() idModulo!: number;
  @Input() indice!:number

  @Output() excluirTopico = new EventEmitter<{
    idAdm: number;
    senhaAdm: string;
    idExcluir: number;
  }>();
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  abrirConfirmacaoExcluir(): void {
    const dialogRef = this.dialog.open(ConfirmacaoExclusaoComponent);
    dialogRef.afterClosed().subscribe((senhaAdm) => {
      if (senhaAdm) {
        if (this.topico.id != null) {
          this.excluirTopico.emit({
            idAdm: this.authService.getUsuarioDados().id,
            senhaAdm: senhaAdm,
            idExcluir: this.topico.id,
          });
        }
      }
    });
  }

}
