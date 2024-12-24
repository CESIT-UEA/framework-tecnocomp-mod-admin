import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-exclusao',
  templateUrl: './confirmacao-exclusao.component.html',
  styleUrls: ['./confirmacao-exclusao.component.css']
})
export class ConfirmacaoExclusaoComponent {
  senhaAdm: string = '';

  constructor(public dialogRef: MatDialogRef<ConfirmacaoExclusaoComponent>) {}

  onConfirmar(): void {
    this.dialogRef.close(this.senhaAdm);
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
