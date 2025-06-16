import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmar-remocao',
  templateUrl: './dialog-confirmar-remocao.component.html',
  styleUrls: ['./dialog-confirmar-remocao.component.css']
})
export class DialogConfirmarRemocaoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmarRemocaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensagem: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
